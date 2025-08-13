
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import dotenv from 'dotenv';
dotenv.config();


import authRouter from './routers/authRouter.js';

const isProd = process.env.NODE_ENV === 'production';

 const PORT = process.env.PORT || 3000;

 const app = express();

 /*
app.use(cors({
  origin: isProd ? 'https://your-production-client-url.com' : 'http://localhost:5173',
  credentials: true,
}));
*/

app.use(cors({
  origin: process.env.CLIENT_SIDE_URL,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,               // true on production ,false in dev
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
  }
}));

 

 app.use(express.json());

 app.get("/", (req, res) => {
  res.send("API is running");
});
app.use('/auth', authRouter);

// Catch-all 404 middleware 
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, ()=>{
   console.log(`Listening on port: ${PORT}`) ;
  
})
 