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
    
    // Querying 'Pickleball' folder path inside 'gallery-photos' bucket
    const { data: files, error } = await supabase.storage.from('gallery-photos').list('Pickleball', {
      limit: 60,
      sortBy: { column: 'name', order: 'asc' }
    });

    if (error) {
      console.warn('⚠️ Could not list files from Supabase bucket "gallery-photos" folder "Pickleball":', error.message);
      return res.json({ configured: true, error: error.message, photos: [] });
    }

    if (!files || files.length === 0) {
      return res.json({ configured: true, photos: [], message: "No photos found in folder 'Pickleball'" });
    }

    const photos = files
      .filter(f => f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.') && f.metadata)
      .map((f, index) => {
        // Construct path relative to bucket root: "Pickleball/filename.jpg"
        const filePath = `Pickleball/${f.name}`;
        const { data: { publicUrl } } = supabase.storage.from('gallery-photos').getPublicUrl(filePath);
        return {
          id: `supabase-${index}`,
          album: 'Pickleball',
          url: publicUrl,
          title: f.name.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          desc: 'Live action image from the organizers\' official Supabase media folder.',
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
