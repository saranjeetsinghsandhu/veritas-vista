
'use server';

import { aiCampusNavigatorChatbot, AICampusNavigatorChatbotInput, AICampusNavigatorChatbotOutput } from '@/ai/flows/ai-campus-navigator-chatbot';

type ChatbotResponse = {
  success: true;
  data: AICampusNavigatorChatbotOutput;
} | {
  success: false;
  error: string;
}

export async function getChatbotResponse(input: AICampusNavigatorChatbotInput): Promise<ChatbotResponse> {
  try {
    const response = await aiCampusNavigatorChatbot(input);
    return { success: true, data: response };
  } catch (error) {
    console.error('AI Chatbot Error:', error);
    return { success: false, error: 'Sorry, I am unable to answer at this moment. Please try again later.' };
  }
}
