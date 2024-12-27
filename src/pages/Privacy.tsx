import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          ← Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <h2>1. Information We Collect</h2>
          <p>When you use Reviewdle, we collect:</p>
          <ul>
            <li>Information you provide when creating an account (email, name)</li>
            <li>Game statistics and progress</li>
            <li>Usage data to improve the game experience</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Manage your account and provide the game service</li>
            <li>Track game progress and statistics</li>
            <li>Improve the game experience</li>
            <li>Send important updates about the service</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We do not sell your personal information. We may share basic game statistics in an anonymized format.</p>

          <h2>4. Data Security</h2>
          <p>We implement appropriate security measures to protect your information using industry standards.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your account</li>
            <li>Opt-out of non-essential communications</li>
          </ul>

          <h2>6. Contact Us</h2>
          <p>For privacy-related questions, please contact us at privacy@reviewdle.com</p>

          <h2>7. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

          <p className="text-sm text-muted-foreground mt-8">Last updated: March 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;