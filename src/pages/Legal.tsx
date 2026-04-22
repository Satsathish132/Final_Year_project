import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Cookie, ArrowUp } from 'lucide-react';

const Legal = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('privacy');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && ['privacy', 'terms', 'cookies'].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveSection(sectionId);
      setIsAnimating(false);
    }, 150);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    { id: 'privacy', title: 'Privacy Policy', icon: Shield },
    { id: 'terms', title: 'Terms and Conditions', icon: FileText },
    { id: 'cookies', title: 'Cookie Policy', icon: Cookie },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Legal Information</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Important information about how we protect your privacy, our terms of service, and cookie usage.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => handleSectionChange(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="h-4 w-4" />
              {section.title}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Privacy Policy */}
          {activeSection === 'privacy' && (
            <Card className={`transition-all duration-300 ease-out ${
              isAnimating ? 'transform -translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Shield className="h-6 w-6 text-primary" />
                  Privacy Policy – Pathlytics
                </CardTitle>
                <p className="text-muted-foreground">Last Updated: April 14, 2026</p>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-lg mb-6">Welcome to Pathlytics. Your privacy is important to us.</p>

                <h3 className="text-xl font-semibold mb-4">1. Information We Collect</h3>
                <p className="mb-4">We may collect:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Personal Information (name, email, login details)</li>
                  <li>Career preferences and interests</li>
                  <li>Usage data (pages visited, interactions)</li>
                  <li>Chatbot inputs (via Groq API)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">2. How We Use Your Information</h3>
                <p className="mb-4">We use your data to:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Provide career recommendations and roadmaps</li>
                  <li>Improve our AI chatbot and user experience</li>
                  <li>Deliver job-related insights powered by Microsoft Azure services</li>
                  <li>Communicate updates and support</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">3. Third-Party Services</h3>
                <p className="mb-4">We use:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Microsoft Azure for hosting, analytics, and data processing</li>
                  <li>Groq API for chatbot functionality</li>
                </ul>
                <p className="mb-6">These services may process your data according to their own privacy policies.</p>

                <h3 className="text-xl font-semibold mb-4">4. Data Security</h3>
                <p className="mb-6">We implement industry-standard security measures via Azure to protect your data.</p>

                <h3 className="text-xl font-semibold mb-4">5. Data Retention</h3>
                <p className="mb-6">We retain your data only as long as necessary for service functionality or legal obligations.</p>

                <h3 className="text-xl font-semibold mb-4">6. Your Rights</h3>
                <p className="mb-4">You may:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Request access to your data</li>
                  <li>Request deletion or correction</li>
                  <li>Opt out of communications</li>
                </ul>
                <p className="mb-6">Contact: pathlytics@gmail.com</p>

                <h3 className="text-xl font-semibold mb-4">7. Children's Privacy</h3>
                <p className="mb-6">Pathlytics is not intended for users under 13.</p>

                <h3 className="text-xl font-semibold mb-4">8. Changes to Policy</h3>
                <p>We may update this policy periodically.</p>
              </CardContent>
            </Card>
          )}

          {/* Terms and Conditions */}
          {activeSection === 'terms' && (
            <Card className={`transition-all duration-300 ease-out ${
              isAnimating ? 'transform -translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="h-6 w-6 text-primary" />
                  Terms and Conditions – Pathlytics
                </CardTitle>
                <p className="text-muted-foreground">Last Updated: April 14, 2026</p>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-lg mb-6">By using Pathlytics, you agree to the following terms:</p>

                <h3 className="text-xl font-semibold mb-4">1. Use of Service</h3>
                <p className="mb-4">Pathlytics provides:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Career recommendations</li>
                  <li>Learning roadmaps</li>
                  <li>Job insights</li>
                  <li>AI chatbot assistance</li>
                </ul>
                <p className="mb-6">These are for informational purposes only and do not guarantee employment.</p>

                <h3 className="text-xl font-semibold mb-4">2. User Responsibilities</h3>
                <p className="mb-4">You agree:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>To provide accurate information</li>
                  <li>Not to misuse or abuse the platform</li>
                  <li>Not to attempt unauthorized access</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">3. AI Disclaimer</h3>
                <p className="mb-4">Our chatbot (powered by Groq API) may:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Generate automated responses</li>
                  <li>Provide suggestions that may not always be accurate</li>
                </ul>
                <p className="mb-6">Always verify important career or job decisions independently.</p>

                <h3 className="text-xl font-semibold mb-4">4. Intellectual Property</h3>
                <p className="mb-6">All content, branding, and features belong to Pathlytics unless stated otherwise.</p>

                <h3 className="text-xl font-semibold mb-4">5. Limitation of Liability</h3>
                <p className="mb-4">Pathlytics is not responsible for:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Career outcomes</li>
                  <li>Job placements</li>
                  <li>Decisions made based on recommendations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">6. Termination</h3>
                <p className="mb-6">We may suspend or terminate access for misuse.</p>

                <h3 className="text-xl font-semibold mb-4">7. Changes to Terms</h3>
                <p>Terms may be updated at any time.</p>
              </CardContent>
            </Card>
          )}

          {/* Cookie Policy */}
          {activeSection === 'cookies' && (
            <Card className={`transition-all duration-300 ease-out ${
              isAnimating ? 'transform -translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Cookie className="h-6 w-6 text-primary" />
                  Cookie Policy – Pathlytics
                </CardTitle>
                <p className="text-muted-foreground">Last Updated: April 14, 2026</p>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <h3 className="text-xl font-semibold mb-4">1. What Are Cookies?</h3>
                <p className="mb-6">Cookies are small files stored on your device to improve your experience.</p>

                <h3 className="text-xl font-semibold mb-4">2. How We Use Cookies</h3>
                <p className="mb-4">We use cookies to:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Remember user preferences</li>
                  <li>Analyze website performance</li>
                  <li>Improve recommendations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">3. Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Essential Cookies</strong> – Required for login and core functionality</li>
                  <li><strong>Analytics Cookies</strong> – Track usage (via Azure tools)</li>
                  <li><strong>Functional Cookies</strong> – Enhance personalization</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">4. Third-Party Cookies</h3>
                <p className="mb-4">We may use cookies from:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Microsoft Azure services</li>
                  <li>Other analytics tools</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">5. Managing Cookies</h3>
                <p className="mb-4">You can:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Disable cookies in browser settings</li>
                  <li>Delete existing cookies anytime</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">6. Consent</h3>
                <p>By using Pathlytics, you agree to our use of cookies.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8">
        </div>
      </div>
    </Layout>
  );
};

export default Legal;