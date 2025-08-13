// Vercel Serverless Function placeholder for inquiries
// Stores in-memory per lambda (ephemeral). For real persistence use a DB.

let inquiries: any[] = [];

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const id = inquiries.length + 1;
    const createdAt = new Date().toISOString();
    const body = req.body || {};
    const inquiry = { id, createdAt, ...body };
    inquiries.push(inquiry);
    res.status(200).json(inquiry);
    return;
  }

  if (req.method === 'GET') {
    const propertyId = req.query?.propertyId ? parseInt(req.query.propertyId) : undefined;
    const results = propertyId ? inquiries.filter(i => i.propertyId === propertyId) : inquiries;
    res.status(200).json(results);
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}