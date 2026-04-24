import { broadcastNotification } from '../src/lib/server/push';

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, message } = req.body;
  
  if (!title || !message) {
    return res.status(400).json({ error: 'Missing title or message' });
  }

  const result = await broadcastNotification(title, message);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
}
