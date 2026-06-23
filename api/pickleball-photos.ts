import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  // Set headers for CORS and JSON response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  const url = process.env.SUPABASE_URL || 'https://dnqtrirprghssnznyho.supabase.co';
  // Fall back to ANON key or SERVICE ROLE key based on what's configured
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(200).json({ 
      configured: false, 
      photos: [], 
      message: "Supabase environment variables not defined on the Vercel hosting platform." 
    });
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false }
    });

    let folderToUse = 'Pickleball';
    let { data: files, error } = await supabase.storage.from('gallery-photos').list('Pickleball', {
      limit: 60,
      sortBy: { column: 'name', order: 'asc' }
    });

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
        console.log('⚠️ No files in "pickleball" either. Listing root of "gallery-photos" bucket...');
        const rootResult = await supabase.storage.from('gallery-photos').list('', {
          limit: 60,
          sortBy: { column: 'name', order: 'asc' }
        });
        if (!rootResult.error && rootResult.data && rootResult.data.length > 0) {
          const filesInRoot = rootResult.data.filter((f: any) => f.id && f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.'));
          if (filesInRoot.length > 0) {
            files = filesInRoot;
            folderToUse = '';
          }
        }
      }
    }

    if (!files || files.length === 0) {
      return res.status(200).json({ 
        configured: true, 
        photos: [], 
        message: "No photos found in folders 'Pickleball', 'pickleball', or root of bucket 'gallery-photos'." 
      });
    }

    const photos = files
      .filter((f: any) => f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.') && f.id)
      .map((f: any, index: number) => {
        const filePath = folderToUse ? `${folderToUse}/${f.name}` : f.name;
        const { data: { publicUrl } } = supabase.storage.from('gallery-photos').getPublicUrl(filePath);
        return {
          id: `supabase-${index}`,
          album: 'Pickleball',
          url: publicUrl,
          title: '', 
          desc: '',  
          isSupabase: true
        };
      });

    return res.status(200).json({ configured: true, photos });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
