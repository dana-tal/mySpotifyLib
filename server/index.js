
import express from 'express';
import cors from 'cors';
import session from 'express-session';

import dotenv from 'dotenv';
dotenv.config();


import authRouter from './routers/authRouter.js';

 const PORT = process.env.PORT || 3000;

 const app = express();

 app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } 
}));
 
 app.use( cors());
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
 