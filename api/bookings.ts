// Vercel Serverless Function placeholder for bookings
// Stores in-memory per lambda (ephemeral). For real persistence use a DB.

let bookings: any[] = [];

export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const id = bookings.length + 1;
    const createdAt = new Date().toISOString();
    const body = req.body || {};
    const booking = { id, createdAt, ...body };
    bookings.push(booking);
    res.status(201).json(booking);
    return;
  }

  if (req.method === 'GET') {
    const propertyId = req.query?.propertyId ? parseInt(req.query.propertyId) : undefined;
    const results = propertyId ? bookings.filter(i => i.propertyId === propertyId) : bookings;
    res.status(200).json(results);
    return;
  }

  if (req.method === 'PUT') {
    const id = req.query?.id ? parseInt(req.query.id) : undefined;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Booking not found' });
    bookings[idx] = { ...bookings[idx], ...req.body };
    res.status(200).json(bookings[idx]);
    return;
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}