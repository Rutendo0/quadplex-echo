import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InquiryFormProps {
  propertyName?: string;
  propertyId?: number;
}

export const InquiryForm = ({ propertyName = "this property", propertyId }: InquiryFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Placeholder submission – wire to Supabase or email later
      await new Promise((r) => setTimeout(r, 600));
      toast("Inquiry sent", {
        description: `We received your interest in ${propertyName}. We'll get back to you shortly.`,
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast("Something went wrong", { description: "Please try again in a moment." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your full name" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder={`I'm interested in ${propertyName}...`} rows={4} />
      </div>
      <Button type="submit" variant="hero" disabled={submitting} className="w-full">
        {submitting ? "Sending..." : "Send Inquiry"}
      </Button>
      <p className="text-xs text-muted-foreground">This is a placeholder form. Submissions are not stored yet.</p>
    </form>
  );
};

export default InquiryForm;
