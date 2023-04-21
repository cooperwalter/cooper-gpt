import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Message, CompletionResponse } from './types';
import axios, { AxiosRequestConfig } from 'axios';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
const PORT = 8000;

const BASE_URL = 'https://api.openai.com/v1';

app.post('/completions', async (req, res) => {
  const message: Message = {
    role: 'user',
    content: req.body.message,
  };
  try {
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
    const body = {
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      messages: [message],
    };
    const response = await axios.post(`${BASE_URL}/chat/completions`, body, options);
    const data: CompletionResponse = response.data as CompletionResponse;
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
