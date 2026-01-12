import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Have questions? We are here to help 24/7!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-card rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-secondary to-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Email</h3>
              <p className="text-muted-foreground">support@luckylotus.com</p>
            </div>

            {/* Phone */}
            <div className="bg-card rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-accent to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Phone</h3>
              <p className="text-muted-foreground">+1 (800) 123-4567</p>
            </div>

            {/* Address */}
            <div className="bg-card rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Address</h3>
              <p className="text-muted-foreground">123 Casino Lane, Las Vegas, NV</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-card-foreground">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-card-foreground font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-card-foreground font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-card-foreground font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-card-foreground font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-accent text-white hover:opacity-90 font-bold py-3 text-lg"
              >
                SEND MESSAGE
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-card-foreground">What are your support hours?</h3>
              <p className="text-muted-foreground">
                We provide 24/7 customer support to assist you with any questions or concerns.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-card-foreground">How long does it take to get a response?</h3>
              <p className="text-muted-foreground">
                We typically respond to inquiries within 24 hours during business days.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-card-foreground">Can I report a technical issue?</h3>
              <p className="text-muted-foreground">
                Yes! Please describe the issue in detail and include screenshots if possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
