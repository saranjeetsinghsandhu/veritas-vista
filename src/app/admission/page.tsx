import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const admissionSteps = [
  {
    title: "Submit Your Application",
    description: "Complete our online application form with your personal details, academic history, and essays.",
  },
  {
    title: "Provide Supporting Documents",
    description: "Upload your transcripts, letters of recommendation, and any required standardized test scores.",
  },
  {
    title: "Application Review",
    description: "Our admissions committee will carefully review your application and supporting materials.",
  },
  {
    title: "Receive Admission Decision",
    description: "You will be notified of your admission status via the student portal and email.",
  },
];

export default function AdmissionPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary tracking-tight sm:text-5xl">Admissions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Begin your journey at Veritas Vista. We are excited to learn more about you and what you can bring to our community.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold font-headline text-primary text-center">Application Process</h2>
        <div className="mt-10 grid gap-8 grid-cols-1 md:grid-cols-2">
          {admissionSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                  <span className="font-headline">{step.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold font-headline text-primary">Ready to Apply?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Our application for the next academic year is now open.
        </p>
        <Button size="lg" className="mt-8">
          Start Your Application
        </Button>
      </div>
    </div>
  );
}
