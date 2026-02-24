'use server';
/**
 * @fileOverview An AI Campus Navigator chatbot.
 *
 * - aiCampusNavigatorChatbot - A function that handles answering questions about campus life, admissions, and general school inquiries.
 * - AICampusNavigatorChatbotInput - The input type for the aiCampusNavigatorChatbot function.
 * - AICampusNavigatorChatbotOutput - The return type for the aiCampusNavigatorChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICampusNavigatorChatbotInputSchema = z.object({
  question: z.string().describe('The question asked by a prospective student or parent about campus life, admissions, or general school inquiries.')
});
export type AICampusNavigatorChatbotInput = z.infer<typeof AICampusNavigatorChatbotInputSchema>;

const AICampusNavigatorChatbotOutputSchema = z.object({
  answer: z.string().describe('A helpful and informative answer to the user\'s question.')
});
export type AICampusNavigatorChatbotOutput = z.infer<typeof AICampusNavigatorChatbotOutputSchema>;

export async function aiCampusNavigatorChatbot(input: AICampusNavigatorChatbotInput): Promise<AICampusNavigatorChatbotOutput> {
  return aiCampusNavigatorChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCampusNavigatorChatbotPrompt',
  input: {schema: AICampusNavigatorChatbotInputSchema},
  output: {schema: AICampusNavigatorChatbotOutputSchema},
  prompt: `You are an AI Campus Navigator, a helpful assistant for prospective students and parents. Your goal is to provide concise, accurate, and informative answers to questions about campus life, admissions processes, and general school inquiries.

Please answer the following question:
Question: {{{question}}}`
});

const aiCampusNavigatorChatbotFlow = ai.defineFlow(
  {
    name: 'aiCampusNavigatorChatbotFlow',
    inputSchema: AICampusNavigatorChatbotInputSchema,
    outputSchema: AICampusNavigatorChatbotOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
