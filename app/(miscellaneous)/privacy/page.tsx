import React from "react"
import Link from "next/link"

const Page: React.FC = () => {
  return (
    <>
      <div className="w-full space-y-6 py-6 xl:space-y-16">
        <div className="container space-y-2 p-12 md:p-40">
          <div className="w-full space-y-6 py-6">
            <div className="container px-4 md:px-6">
              <div className="mx-auto">
                <div>
                  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Privacy Policy
                  </h1>
                  <p className="pt-10">
                    Your privacy is important to us. It is LinkChop&quot;s policy to respect your
                    privacy regarding any information we may collect from you across our website,{" "}
                    <Link className="underline" href="/">
                      https://linkchop.com
                    </Link>
                    , and other sites we own and operate.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    1. Information we collect
                  </h3>
                  <p className="pt-4">
                    When you visit our website, we may collect information about you in a few
                    different ways. We collect both personal information and non-personal
                    information.
                  </p>
                  <h4 className="scroll-m-20 pt-4 text-xl font-semibold tracking-tight">
                    Personal information
                  </h4>
                  <p className="pt-4">
                    We may ask you for personal information, such as your name, email address, and
                    other contact details when you sign up for an account or fill out a form on our
                    website.
                  </p>
                  <h4 className="scroll-m-20 pt-4 text-xl font-semibold tracking-tight">
                    Non-personal information
                  </h4>
                  <p className="pt-4">
                    We may also collect non-personal information about you when you visit our
                    website, such as the type of browser you are using, the website you visited
                    before you came to our website, the pages on our website that you visit, and the
                    time spent on those pages.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    2. How we use your information
                  </h3>
                  <p className="pt-4">
                    We may use the information we collect from you to personalize your experience
                    and to allow us to deliver the type of content and product offerings in which
                    you are most interested.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    3. How we protect your information
                  </h3>
                  <p className="pt-4">
                    We take the security of your personal information very seriously. We have
                    implemented a variety of security measures to maintain the safety of your
                    personal information when you enter, submit, or access your personal
                    information.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    4. Third-party services
                  </h3>
                  <p className="pt-4">
                    We may use third-party services to help us operate our website or administer
                    activities on our behalf, such as sending out newsletters or surveys. We may
                    share your information with these third parties for those limited purposes
                    provided that you have given us your permission.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    5. Your choices regarding your information
                  </h3>
                  <p className="pt-4">
                    If you would like to review, correct, update, or delete the personal information
                    that you have provided to us, please contact us at colin@linkchop.com.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    6. Changes to our Privacy Policy
                  </h3>
                  <p className="pt-4">
                    We may update our Privacy Policy from time to time. We will notify you of any
                    changes by posting the new Privacy Policy on this page. You are advised to
                    review this Privacy Policy periodically for any changes.
                  </p>
                </div>
                <div className="pt-10">
                  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    7. Contacting us
                  </h3>
                  <p className="pt-4">
                    If you have any questions about our Privacy Policy, the practices of this site,
                    or your dealings with this site, please contact us at colin@linkchop.com.
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
