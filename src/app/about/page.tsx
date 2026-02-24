import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-5xl py-12 px-4 sm:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl">
            About Veritas Vista
          </h1>
          <p className="mt-4 text-xl text-foreground/80">
            A tradition of excellence, a future of innovation.
          </p>
        </div>

        <div className="mt-12">
            <div data-ai-hint="campus aerial" className="relative w-full aspect-video sm:aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
                <Image 
                    src="https://picsum.photos/seed/about-hero/1200/600"
                    alt="Aerial view of Veritas Vista campus"
                    fill
                    className="object-cover"
                />
            </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
                <h2 className="text-3xl font-bold font-headline text-primary">Our Mission</h2>
                <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
                    Our mission is to cultivate a diverse community of lifelong learners who are prepared to lead with integrity, think critically, and contribute meaningfully to a global society. We are committed to providing a rigorous academic program within a supportive environment that fosters intellectual curiosity, creativity, and personal growth.
                </p>
            </div>
            <div>
                <h2 className="text-3xl font-bold font-headline text-primary">Our History</h2>
                <p className="mt-4 text-lg text-foreground/80 leading-relaxed">
                    Founded in 1924, Veritas Vista has a long and proud history of academic achievement and community service. What began as a small schoolhouse has grown into a leading institution, consistently recognized for its innovative teaching methods and the success of its graduates. Through the decades, we have remained true to our founding principles of truth, vision, and virtue.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
