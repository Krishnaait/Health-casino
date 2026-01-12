export default function Disclaimer() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Disclaimer</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-xl p-8 shadow-lg text-card-foreground">
            <h2 className="text-3xl font-bold mb-6">Important Disclaimer</h2>

            <h3 className="text-2xl font-bold mb-4 mt-8">No Real Money Gambling</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus is a SOCIAL CASINO platform designed for entertainment purposes only. This platform does NOT offer real money gambling and does NOT provide an opportunity to win real money or real prizes. All gameplay is conducted using virtual coins and credits that have no real-world monetary value.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Age Restriction</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus is intended for those 21 years of age and older. By using this platform, you confirm that you are at least 21 years old and meet all legal requirements to use this service in your jurisdiction.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Entertainment Only</h3>
            <p className="text-muted-foreground mb-6">
              The games and content provided on Lucky Lotus are for entertainment purposes only. They are not designed to be used as a method of gambling or earning real income. Any resemblance to real gambling is purely coincidental and unintentional.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">No Guarantees</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus makes no guarantees regarding:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 ml-4">
              <li>The accuracy or reliability of game outcomes</li>
              <li>The availability or continuity of service</li>
              <li>The security of personal information</li>
              <li>Any specific results or winnings</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">Responsible Gaming</h3>
            <p className="text-muted-foreground mb-6">
              We encourage all users to play responsibly. If you feel that your gaming habits are becoming problematic, please seek help from a professional organization dedicated to gambling addiction support. Lucky Lotus is not responsible for any negative consequences resulting from excessive gaming.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Limitation of Liability</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the platform, including but not limited to damages for loss of data, loss of profits, or business interruption.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Changes to Disclaimer</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus reserves the right to modify this disclaimer at any time. Your continued use of the platform following the posting of revised terms means that you accept and agree to the changes.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">Contact for Concerns</h3>
            <p className="text-muted-foreground">
              If you have any concerns or questions about this disclaimer, please contact us at: support@luckylotus.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
