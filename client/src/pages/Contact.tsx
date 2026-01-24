import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="text-gray-200 mt-2">Get in Touch with Our Support Team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions or feedback? We'd love to hear from you! Our support team is here to help.
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  Send us an email and we'll respond as soon as possible.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <strong>Email Support:</strong><br />
                    <a href="mailto:Support@pureplayfantasy.com" className="text-accent hover:underline">
                      Support@pureplayfantasy.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Company Information</h3>
                <div className="space-y-3 text-muted-foreground text-sm">
                  <p>
                    <strong>CC INNOVATIONS (OPC) PRIVATE LIMITED</strong><br />
                    C/O N K SHARMA SEC 9 TYPE<br />
                    BT QR NO 463. HEC<br />
                    Dhurwa, Ranchi<br />
                    Ranchi, Jharkhand 834004<br />
                    India
                  </p>
                  <p>
                    <strong>CIN:</strong> U78100JH2023OPC021360<br />
                    <strong>PAN:</strong> AALCC3673P<br />
                    <strong>Email:</strong> Support@pureplayfantasy.com
                  </p>
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24-48 business hours. Thank you for your patience!
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-accent to-cyan-400 hover:from-accent/90 hover:to-cyan-400/90 text-white font-semibold py-2 rounded-lg transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
