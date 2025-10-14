"use client"



export default function PrivacyPolicy() {
  return (
    <div>
    
    <main className="min-h-screen flex flex-col items-center px-6 py-20 bg-white text-black-900 mt-16">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Privacy Policy for Sofa Society
        </h1>

        <p className="mb-6 leading-relaxed">
          At Sofa Society, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect, use, disclose,
          and safeguard your data when you interact with our website, services, and
          products. By using our platform, you consent to the practices described in this
          policy.
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="font-semibold mb-2">1. Information We Collect:</h2>
            <p className="mb-2">We may collect personal information you provide directly to us, such as:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Name, email address, and contact details when you sign up for an account.</li>
              <li>Billing and shipping addresses when you make a purchase.</li>
              <li>Payment information (credit/debit card details) for completing transactions securely.</li>
              <li>Personal preferences and fashion interests you share with us.</li>
            </ul>
            <p className="mt-3">Additionally, we may automatically collect certain information when you access
            or use our website, including:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>IP address, browser type, operating system, and device information.</li>
              <li>Usage data, such as pages visited, time spent on our platform, and referring website.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">2. How We Use Your Information:</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Providing and managing your account, purchases, and orders.</li>
              <li>Customizing your shopping experience and suggesting relevant products.</li>
              <li>Sending you updates, newsletters, and marketing communications (you can opt-out anytime).</li>
              <li>Analyzing user behavior to improve our website and services.</li>
              <li>Complying with legal obligations and enforcing our Terms of Service.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">3. Cookies and Similar Technologies:</h2>
            <p>
              We use cookies and similar technologies to collect information about your
              browsing activity on our website. These technologies help us analyze usage
              patterns and enhance user experience. You can manage your cookie preferences
              through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">4. Data Sharing and Disclosure:</h2>
            <p className="mb-2">We may share your personal information with third parties under certain circumstances, including:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Service providers who assist us in operating our business and delivering services.</li>
              <li>Legal authorities or government agencies as required by law.</li>
            </ul>
            <p className="mt-2">We do not sell or rent your personal information to third parties for their marketing purposes.</p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">5. Data Security:</h2>
            <p>
              We implement reasonable security measures to protect your personal
              information from unauthorized access, alteration, or disclosure. However, no
              method of transmission over the internet or electronic storage is completely
              secure.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">6. Your Choices:</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Review and update your personal information in your account settings.</li>
              <li>Opt-out of receiving marketing communications.</li>
              <li>Delete your account (subject to applicable laws and regulations).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-2">7. Children's Privacy:</h2>
            <p>
              Our services are not intended for individuals under the age of 16. If we become
              aware that we have collected personal information from children without parental
              consent, we will take prompt action to delete such data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">8. Changes to this Privacy Policy:</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for other operational, legal, or regulatory reasons. We will notify you
              of any material changes via email or by prominently posting a notice on our
              website.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">9. Contact Us:</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or
              how we handle your personal information, please contact us at:
            </p>
            <p className="mt-2">Email: <a href="mailto:privacy@sofasociety.com" className="underline">privacy@sofasociety.com</a></p>
            <p>Address: Skärgårdsvägen 12, 124 55 Stockholm</p>
          </div>
        </section>
      </div>
    </main>
    
    </div>
  )
}