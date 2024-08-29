import Cors from 'cors';
//import initMiddleware from '../../lib/init-middleware';

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', 'http://weiqi.blackrice.pro');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Respond to preflight request
    return;
  }

  return await fn(req, res);
};

/*export default function handler(req, res) {
    if (req.method === 'GET') {
      req.logout((err) => {
        if (err) {
          console.error('Logout error:', err);
          return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
      });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } */
  
    async function handler(req, res) {
      console.log('Received request:', req.method, req.url);
      console.log('Request headers:', req.headers);
    
      if (req.method === 'GET') {
        // 清除 session cookie
        res.setHeader('Set-Cookie', [
          'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=None; Secure'
        ]);
        console.log('Set-Cookie header:', res.getHeader('Set-Cookie'));
        res.status(200).json({ message: 'Logged out successfully' });
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    
      console.log('Response headers:', res.getHeaders());
    }
    
    export default allowCors(handler);