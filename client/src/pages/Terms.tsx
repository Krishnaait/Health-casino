export default function Terms() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-purple-900 to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card rounded-xl p-8 shadow-lg text-card-foreground">
            <h2 className="text-3xl font-bold mb-6">Terms & Conditions</h2>
            <p className="text-muted-foreground mb-6">
              Last Updated: January 2026
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">1. Agreement to Terms</h3>
            <p className="text-muted-foreground mb-6">
              By accessing and using Lucky Lotus, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">2. Use License</h3>
            <p className="text-muted-foreground mb-6">
              Permission is granted to temporarily download one copy of the materials (information or software) on Lucky Lotus for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Lucky Lotus</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4 mt-8">3. Disclaimer</h3>
            <p className="text-muted-foreground mb-6">
              The materials on Lucky Lotus are provided on an "as is" basis. Lucky Lotus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">4. Limitations</h3>
            <p className="text-muted-foreground mb-6">
              In no event shall Lucky Lotus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Lucky Lotus.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">5. Accuracy of Materials</h3>
            <p className="text-muted-foreground mb-6">
              The materials appearing on Lucky Lotus could include technical, typographical, or photographic errors. Lucky Lotus does not warrant that any of the materials on its website are accurate, complete, or current. Lucky Lotus may make changes to the materials contained on its website at any time without notice.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">6. Links</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Lucky Lotus of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">7. Modifications</h3>
            <p className="text-muted-foreground mb-6">
              Lucky Lotus may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h3 className="text-2xl font-bold mb-4 mt-8">8. Governing Law</h3>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Lucky Lotus operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
