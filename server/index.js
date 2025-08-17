
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import path from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();


import authRouter from './routers/authRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';

console.log("is prod:");
console.log(isProd);

 const PORT = process.env.PORT || 3000;

 const app = express();

 if (isProd) {
  app.set('trust proxy', 1);
}

 /*
app.use(cors({
  origin: isProd ? 'https://your-production-client-url.com' : 'http://localhost:5173',
  credentials: true,
}));
*/

const corsConfig = {
  origin: process.env.CLIENT_SIDE_URL,
  credentials: true,
}

console.log("corsConfig:");
console.log(corsConfig);

app.use(cors(corsConfig));

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProd,               // true on production ,false in dev
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
     domain: isProd ? '.onrender.com' : undefined  // <-- allow cross-subdomain cookies
  }
};

console.log("sessionConfig");
console.log(sessionConfig);

app.use(session(sessionConfig));

 

 app.use(express.json());

 app.get("/api", (req, res) => {
  res.send("API is running");
});
app.use('/auth', authRouter);


app.use('/api', (req, res, next) => {
  res.status(404).json({ error: 'API route not found' });
});

// Path to client build
const clientBuildPath = path.join(__dirname, '../spotifyClient/dist');


// Serve React static files
app.use(express.static(clientBuildPath));



// React router
 app.get(/.*/, (req, res) => {
   res.sendFile(path.join(clientBuildPath, 'index.html'));
 });




app.listen(PORT, ()=>{
   console.log(`Listening on port: ${PORT}`) ;
  
})
 