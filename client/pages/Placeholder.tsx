import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center glass-effect border-border/50">
        <CardHeader>
          <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">
            This page is coming soon! Continue prompting to help us build out
            the specific features and content you'd like to see here.
          </p>
          <Link to="/">
            <Button className="gradient-primary hover:opacity-90 transition-opacity">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
