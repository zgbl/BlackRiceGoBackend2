// pages/api/register.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import Cors from 'cors';
// 初始化 CORS 中间件
const cors = Cors({
    origin: '*', // 临时允许所有来源
    methods: ['GET', 'POST'],
  });
  
// 中间件处理函数
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }

export default async function handler(req, res) {
  await dbConnect();
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    // 处理 GET 请求
    return res.status(200).json({
      message: "This is the GET endpoint for /register. Use this to check if the route is accessible.",
      hint: "Try sending a POST request with valid registration data.",
      examplePostBody: {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123"
      },
      availableRoutes: [
        { method: "GET", path: "/api/register", description: "This endpoint for testing purposes" },
        { method: "POST", path: "/api/register", description: "Register a new user" },
      ]
    });
  }

  if (req.method === 'POST') {
    // 处理 POST 请求（注册逻辑）
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
  

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });
      return res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  } 

  // 对其他 HTTP 方法返回 405 错误
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
