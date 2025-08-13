// Vercel Serverless Function for property structure
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ASHUMI_PROPERTIES = {
  residential: {
    'single-storey': ['4-bed'],
    'double-storey-duplex': ['3-bed', '4-bed'],
    'single-storey-duplex': ['3-bed'],
    'apartment-blocks': ['ground-floor-studio']
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  res.status(200).json(ASHUMI_PROPERTIES);
}