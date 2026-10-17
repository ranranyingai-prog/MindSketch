import type { CardData } from '../types/card';
import { ZHIKA_CARD_STYLES } from '../data/styles';

export interface ImageGenConfig {
  provider: 'siliconflow' | 'openai' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export async function generateAIInfographicImage(
  data: CardData,
  styleId: string,
  config: ImageGenConfig
): Promise<string> {
  const selectedStyle = ZHIKA_CARD_STYLES.find(s => s.id === styleId) || ZHIKA_CARD_STYLES[0];

  const fullPrompt = `High quality, high density knowledge card infographic image. Title: "${data.bookTitle}" by ${data.author || 'Author'}. Category tag: "${data.category || 'Knowledge'}". Core quote: "${data.quote || ''}". Key takeaway points: ${data.keyPoints.map((t, idx) => `${idx + 1}. ${t.title}: ${t.desc}`).join('; ')}. Action guide: "${data.actionTip || ''}". Brand: "${data.creatorName || 'HandDrawn Card'}". Visual style: ${selectedStyle.prompt}. High visual density, beautiful hand-drawn layout, sharp typography, no watermarks, professional graphics. Aspect ratio 3:4.`;

  const apiKey = config.apiKey || (typeof window !== 'undefined' ? localStorage.getItem('IMAGE_GEN_API_KEY') : '') || '';
  const provider = config.provider || 'siliconflow';

  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  if (provider === 'siliconflow') {
    const endpoint = config.baseUrl || 'https://api.siliconflow.cn/v1/images/generations';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.model || 'black-forest-labs/FLUX.1-schnell',
        prompt: fullPrompt,
        image_size: '768x1024',
        num_inference_steps: 20
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`SiliconFlow API Error (${response.status}): ${errText}`);
    }

    const resJson = await response.json();
    if (resJson.images && resJson.images[0] && resJson.images[0].url) {
      return resJson.images[0].url;
    } else if (resJson.data && resJson.data[0] && resJson.data[0].url) {
      return resJson.data[0].url;
    }
    throw new Error('Invalid response structure from image generation API.');
  } else if (provider === 'openai') {
    const endpoint = config.baseUrl || 'https://api.openai.com/v1/images/generations';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: config.model || 'dall-e-3',
        prompt: fullPrompt,
        n: 1,
        size: '1024x1792',
        quality: 'hd'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API Error (${response.status}): ${errText}`);
    }

    const resJson = await response.json();
    if (resJson.data && resJson.data[0] && resJson.data[0].url) {
      return resJson.data[0].url;
    }
    throw new Error('Invalid response structure from OpenAI DALL-E API.');
  }

  throw new Error(`Unsupported provider: ${provider}`);
}
