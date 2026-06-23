import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { getSupabaseClient } from './server/db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ------------------- API ENDPOINTS -------------------

// 1. List live pickleball photos from Supabase bucket
app.get('/api/pickleball-photos', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.json({ configured: false, photos: [] });
    }
    
    // Querying 'Pickleball' folder path inside 'gallery-photos' bucket (robust options)
    let folderToUse = 'Pickleball';
    let { data: files, error } = await supabase.storage.from('gallery-photos').list('Pickleball', {
      limit: 60,
      sortBy: { column: 'name', order: 'asc' }
    });

    // Check if empty, failed, or only contains placeholder
    const isEmpty = !files || files.length === 0 || (files.length === 1 && files[0].name === '.emptyFolderPlaceholder');

    if (error || isEmpty) {
      console.log('⚠️ No files in "Pickleball" (titlecase) folder. Trying "pickleball" (lowercase)...');
      const fallbackResult = await supabase.storage.from('gallery-photos').list('pickleball', {
        limit: 60,
        sortBy: { column: 'name', order: 'asc' }
      });
      
      const isFallbackEmpty = !fallbackResult.data || fallbackResult.data.length === 0 || 
                              (fallbackResult.data.length === 1 && fallbackResult.data[0].name === '.emptyFolderPlaceholder');
      
      if (!fallbackResult.error && !isFallbackEmpty) {
        files = fallbackResult.data;
        folderToUse = 'pickleball';
      } else {
        // Fallback to bucket root if folder doesn't exist
        console.log('⚠️ No files in "pickleball" either. Listing root of "gallery-photos" bucket...');
        const rootResult = await supabase.storage.from('gallery-photos').list('', {
          limit: 60,
          sortBy: { column: 'name', order: 'asc' }
        });
        if (!rootResult.error && rootResult.data && rootResult.data.length > 0) {
          // Keep only files (not directories or placeholders) at the root level
          const filesInRoot = rootResult.data.filter(f => f.id && f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.'));
          if (filesInRoot.length > 0) {
            files = filesInRoot;
            folderToUse = '';
          }
        }
      }
    }

    if (!files || files.length === 0) {
      return res.json({ configured: true, photos: [], message: "No photos found in folder 'Pickleball', 'pickleball', or root." });
    }

    const photos = files
      .filter(f => f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.') && f.id)
      .map((f, index) => {
        // Construct path relative to bucket root is "Pickleball/filename.jpg" or "filename.jpg"
        const filePath = folderToUse ? `${folderToUse}/${f.name}` : f.name;
        const { data: { publicUrl } } = supabase.storage.from('gallery-photos').getPublicUrl(filePath);
        return {
          id: `supabase-${index}`,
          album: 'Pickleball',
          url: publicUrl,
          title: '', // Hide filename completely
          desc: '',  // Remove default description/alt-text
          isSupabase: true
        };
      });

    res.json({ configured: true, photos });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- VITE SETUP AND SERVER START -------------------

async function start() {
  const isProductionMode = process.env.NODE_ENV === 'production' || 
                           (typeof __filename !== 'undefined' && __filename.includes('dist')) || 
                           !fs.existsSync(path.resolve(process.cwd(), 'server.ts'));

  if (!isProductionMode) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    console.log('📦 Running in Production Mode');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SLCC GAH 2026 Admin and Registration Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
