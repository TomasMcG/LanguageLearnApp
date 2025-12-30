import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import wordsRouter from './api/words';



dotenv.config();
const app = express() 
const port = process.env.port || 3000;

app.use(cors());




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.arguments(express.json())
app.user('api/words',wordsRouter);