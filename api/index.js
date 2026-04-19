import handler from '../dist/server/index.js';

export default async function (req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('Nitro Bridge Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error (Nitro Bridge)');
  }
}
