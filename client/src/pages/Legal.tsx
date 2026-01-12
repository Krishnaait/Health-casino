export default function Legal() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Legal Information</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-xl p-8 shadow-lg text-card-foreground">
            <h2 className="text-3xl font-bold mb-6">Legal Notice</h2>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus is a social casino platform designed for entertainment purposes only. This platform does not offer real money gambling or an opportunity to win real money or real prizes.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Age Requirement</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus is intended for those 21 years of age and older. By accessing and using this platform, you confirm that you are at least 21 years old.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Responsible Gaming</h3>
            <p className="text-muted-foreground mb-6">
              We are committed to promoting responsible gaming. If you or someone you know is struggling with gaming habits, please seek help from a professional organization dedicated to gambling addiction support.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Disclaimer</h3>
            <p className="text-muted-foreground mb-6">
              The information provided on this platform is for entertainment purposes only. We do not guarantee the accuracy, completeness, or reliability of any content. Use of this platform is at your own risk.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Intellectual Property</h3>
            <p className="text-muted-foreground mb-6">
              All content on Lucky Lotus, including but not limited to text, graphics, logos, images, and software, is the property of Lucky Lotus or its content suppliers and is protected by international copyright laws.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Limitation of Liability</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the platform or services.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Changes to Terms</h3>
            <p className="text-muted-foreground">
              Lucky Lotus reserves the right to modify these legal terms at any time. Your continued use of the platform following the posting of revised terms means that you accept and agree to the changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
