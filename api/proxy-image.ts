import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Only allow proxying from thecatapi.com
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid url' });
  }

  if (!parsed.hostname.endsWith('thecatapi.com')) {
    return res.status(403).json({ error: 'URL not allowed' });
  }

  const imageRes = await fetch(url);
  if (!imageRes.ok) {
    return res.status(502).json({ error: 'Failed to fetch image' });
  }

  const contentType = imageRes.headers.get('content-type') ?? 'image/jpeg';
  const buffer = await imageRes.arrayBuffer();

  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(Buffer.from(buffer));
}
