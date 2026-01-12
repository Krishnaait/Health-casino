export default function Privacy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-xl p-8 shadow-lg text-card-foreground">
            <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
            <p className="text-muted-foreground mb-6">
              Last Updated: January 2026
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Introduction</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus ("we", "us", "our", or "Company") operates the Lucky Lotus website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Information Collection and Use</h3>
            <p className="text-muted-foreground mb-6">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: Email address, First name and last name, Phone number, Address, State, Province, ZIP/Postal code, City, Cookies and Usage Data.</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address, browser type, browser version, the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">Security of Data</h3>
            <p className="text-muted-foreground mb-6">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Changes to This Privacy Policy</h3>
            <p className="text-muted-foreground mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at: privacy@luckylotus.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
