import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = import.meta.env.VITE_VERCEL_TOKEN_GPT;

const useGPTChat = () => {
  return useMutation({
    mutationFn: async (message: any) => {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0]?.message?.content || 'Erro ao obter resposta';
    }
  });
};

export default useGPTChat;
