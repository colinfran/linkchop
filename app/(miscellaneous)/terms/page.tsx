import React from "react"

const Page: React.FC = async () => {
  return (
    <>
      <div className="w-full space-y-6 py-6 xl:space-y-16">
        <div className="container space-y-2 p-12 md:p-40">
          <div className="w-full space-y-6 py-6">
            <div className="container px-4 md:px-6">
              <div className="prose prose-gray mx-auto max-w-none">
                <div>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Terms of Service
                  </h1>
                  <p className="pt-10">Last updated: January 1, 2023</p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Introduction
                  </h3>
                  <p>
                    {`Welcome to LinkChop. These Terms of Service ("Terms") govern your access to and
                    use of our website and services, including link shortening, redirecting, and
                    analytics features.`}
                  </p>
                  <p>
                    By creating an account, accessing, or using LinkChop, you agree to these Terms.
                    If you do not agree, do not use the service.
                  </p>
                  <p>
                    You are responsible for your account and all activity conducted through it,
                    including all links you create, share, or manage.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Acceptable Use
                  </h3>
                  <p>
                    You may not use LinkChop for illegal, harmful, abusive, or deceptive activity.
                    This includes, but is not limited to, using LinkChop to distribute, promote, or
                    facilitate:
                  </p>
                  <ul>
                    <li>Pornographic or sexually explicit content.</li>
                    <li>Gambling, betting, or wagering services where prohibited by law.</li>
                    <li>Fraud, scams, phishing, impersonation, or other deceptive conduct.</li>
                    <li>Malware, spyware, ransomware, viruses, or any malicious code.</li>
                    <li>Harassment, threats, hate speech, exploitation, or violent content.</li>
                    <li>
                      Sale or promotion of illegal goods, controlled substances, or other unlawful
                      services.
                    </li>
                    <li>
                      Any activity that violates applicable law, infringes rights, or creates a
                      safety risk to others.
                    </li>
                  </ul>
                  <p>
                    We may monitor, remove, disable, or block links and accounts at our sole
                    discretion for violations of these Terms, with or without prior notice.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Service Availability
                  </h3>
                  <p>
                    LinkChop makes every effort to ensure that the service is available at all
                    times. However, we do not guarantee that the service will be uninterrupted or
                    error-free.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Intellectual Property
                  </h3>
                  <p>
                    The content of this website is the property of LinkChop and is protected by
                    copyright laws.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Payment and Subscription
                  </h3>
                  <p>
                    LinkChop offers free and paid plans. Paid plans may include additional features
                    such as custom short URLs and advanced analytics. Subscription fees, billing
                    cycles, and renewal terms are presented at checkout and may change in the
                    future.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Termination
                  </h3>
                  <p>
                    We may suspend or terminate access to LinkChop at any time if you violate these
                    Terms or if your use creates legal, security, or operational risk.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Governing Law
                  </h3>
                  <p>
                    These Terms are governed by applicable laws of the United States and applicable
                    state law, without regard to conflict of law principles.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight">
                    Disclaimer
                  </h3>
                  <p>
                    {`LinkChop is provided on an "as is" and "as available" basis. To the maximum
                    extent permitted by law, we disclaim all warranties, express or implied,
                    including warranties of merchantability, fitness for a particular purpose, and
                    non-infringement. We are not liable for indirect, incidental, consequential,
                    special, exemplary, or punitive damages arising from your use of the service.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
