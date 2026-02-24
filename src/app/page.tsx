import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle } from 'lucide-react';
import Chatbot from '@/app/components/chatbot';

export default function Home() {
  const campusVideo = PlaceHolderImages.find((img) => img.id === 'campus-video-1');
  const studentLifeVideo = PlaceHolderImages.find((img) => img.id === 'student-life-video-1');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-secondary text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">
            Welcome to Veritas Vista
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground max-w-3xl mx-auto">
            Fostering a community of learners, thinkers, and leaders for a brighter tomorrow.
          </p>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary text-center">
              Experience Campus Life
            </h2>
            <p className="mt-8 text-base sm:text-lg text-foreground/80 leading-relaxed">
              At Veritas Vista, campus life is a vibrant tapestry of academic pursuits, artistic expression, and athletic endeavors. Our sprawling grounds provide a picturesque backdrop for learning and growth, with state-of-the-art facilities designed to support every student's journey. From the hushed halls of our extensive library to the energetic hum of our innovation labs, there's a space for every passion. Students form lifelong friendships in our collaborative common areas, find inspiration in our serene gardens, and challenge themselves in our modern sports complexes. We believe in a holistic education, where intellectual development is complemented by personal well-being and a strong sense of community.
            </p>
          </div>
        </div>
      </section>

      {/* Video Showcases */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary text-center mb-12">
            Campus Showcases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {campusVideo && (
              <Card className="overflow-hidden group">
                <CardHeader>
                  <CardTitle className="font-headline">A Tour of Our Campus</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="#" className="relative block">
                    <Image
                      src={campusVideo.imageUrl}
                      alt={campusVideo.description}
                      data-ai-hint={campusVideo.imageHint}
                      width={1280}
                      height={720}
                      className="rounded-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                </CardContent>
              </Card>
            )}
            {studentLifeVideo && (
              <Card className="overflow-hidden group">
                <CardHeader>
                  <CardTitle className="font-headline">A Day in the Life</CardTitle>
                </CardHeader>
                <CardContent>
                   <a href="#" className="relative block">
                    <Image
                      src={studentLifeVideo.imageUrl}
                      alt={studentLifeVideo.description}
                      data-ai-hint={studentLifeVideo.imageHint}
                      width={1280}
                      height={720}
                      className="rounded-lg object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
                    />
                     <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* AI Campus Navigator Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Chatbot />
          </div>
        </div>
      </section>
    </div>
  );
}
