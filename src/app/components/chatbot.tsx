'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getChatbotResponse } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


const formSchema = z.object({
  question: z.string().min(1, 'Please enter a question.'),
});

type FormValues = z.infer<typeof formSchema>;

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to bottom. The underlying Radix component doesn't expose a simple imperative handle for this.
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: data.question }]);
    reset();

    const result = await getChatbotResponse({ question: data.question });

    if (result.success) {
      setMessages((prev) => [...prev, { role: 'assistant', content: result.data.answer }]);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
       setMessages((prev) => prev.slice(0, prev.length -1)); // remove user question if AI fails
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
          <Bot />
          AI Campus Navigator
        </CardTitle>
        <CardDescription>Ask me anything about Veritas Vista!</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
                 <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback><Bot size={16}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[85%]">
                        <p className="text-sm">Hello! I can help with questions about campus life, admissions, and more. How can I assist you today?</p>
                    </div>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback><Bot size={16}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-[85%]',
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={16} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback><Bot size={16}/></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
          <div className="flex-grow">
            <Input
              {...register('question')}
              placeholder="e.g., What are the admission requirements?"
              autoComplete="off"
              disabled={isLoading}
            />
            {errors.question && <p className="text-xs text-destructive mt-1">{errors.question.message}</p>}
          </div>
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
