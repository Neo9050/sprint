import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import connectToDatabase from './db.js';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { register } from './controllers/authController.js';
import { createPost } from './controllers/postController.js';
import { verifyToken } from './middleware/verifyToken.js';
import upload from './middleware/upload.js';

//config 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '25mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



app.post('/auth/register/pic', upload.single('picture'), register);
app.post('/post', upload.single('picture'), createPost);
// app.post('/post', verifyToken, upload.single('picture'), createPost);

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/user', userRoutes);


connectToDatabase()
  .then(() => {
    // Start your server here
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
