import React from "react";
interface PrivacyProps {
  onBack?: () => void;
}
const Privacy: React.FC = () => {

  return (
    <>

      <div className="relative shadow-2xl flex flex-col w-full max-w-[800px] min-h-[640px]">

        <article className="p-6 md:p-10 overflow-y-auto space-y-6 text-gray-800">

          <div className="maincontent max-w-2xl mx-auto space-y-6">
            <h1 className="max-w-m text-4xl font-semibold">Privacy Statement</h1>

            <h3 className="max-w-m text-2xl font-condensed-light leading-normal" style={{ marginBottom: '20px' }}>
              At JamMasterTuning, your privacy is important to us. The purpose of this privacy
              statement is to let you know how we collect, use and disclose Personal Information, and
              to inform you of your rights with respect to such Personal Information. This Privacy
              Statement is effective as of the effective date of your subscription to the Services.
            </h3>

            <h2>About JamMasterTuning</h2>
            <p>
              JamMasterTuning is a music‑focused application designed to help musicians tune their instruments, explore presets, and access practice tools. The app provides interactive tuning features, sound references, and simple utilities that support players of all skill levels. JamMasterTuning does not aggregate business data or connect to enterprise systems; instead, it focuses solely on delivering a smooth, helpful musical experience for its users.
            </p>

            <h2>APPLICABILITY OF PRIVACY STATEMENT</h2>
            <p>
              This Privacy Statement relates to &#34;Personal Information&#34;, meaning information about an
              identifiable individual, whether, for example, that individual is our Customer, or our
              Customer&apos;s provisioned user or an individual whose information is part of Processed Data,
              as these terms are defined below. Whether a person is &#34;identifiable&#34; means that they can
              be identified by the information itself or by that information combined with other
              information reasonably available.
            </p>

            <p>
              This Privacy Statement applies to Personal Information collected or managed by JamMasterTuning
              through the use of the Services, data source integrations, and our websites. This Privacy
              Statement is also intended to explain how we use information which is not identifiable
              (and thus not Personal Information) that is collected via our websites and the Services.
            </p>

            <p>&#34;Customer&#34; refers to the customers of JamMasterTuning and their provisioned users.</p>

            <p>&#34;Customer Information&#34; refers to information about our Customers and their provisioned users.</p>

            <p>
              &#34;Processed Data&#34; refers to information that is processed by JamMasterTuning on behalf of our
              Customers through their use of the Services.
            </p>

            <p>
              JamMasterTuning does not have a direct relationship with many of the individuals whose Personal
              Information is included in Processed Data. This privacy statement is intended to provide
              information about how all Personal Information is collected, used, disclosed, processed
              and protected by JamMasterTuning.
            </p>

            <h2>DATA SOURCE INTEGRATIONS</h2>
            <p>
              The Service provides Customers and their provisioned users the ability to easily connect
              to a wide variety of data sources using data source integrations. Some of these third
              party data source integration providers have terms and conditions particular to their data
              sources and, by making use of the data source integrations offered by JamMasterTuning, you
              acknowledge and agree that your use of the Services may be subject to terms and
              conditions of those third party providers.
            </p>

            <p>
              For example, by making use of Google data source integrations, such as Google Analytics,
              Google Ads, Google Drive, Google Sheets, Gmail, Google Search, Google My Business, Google
              BigQuery, Google Calendar, or YouTube, you acknowledge and agree that your use of those
              Google services is governed by the terms outlined in the Google Privacy Policy.
            </p>

            <p>
              Also, in addition to the normal JamMasterTuning procedure for deleting Processed Data stored within
              the Service, Customers can revoke access to their Google data via the Google security
              settings page at{' '}
              <a href="https://security.google.com/settings/security/permissions">
                https://security.google.com/settings/security/permissions
              </a>.
            </p>

            <h2>CLASSIFICATION OF INFORMATION</h2>
            <p>
              When the Service is used by our Customers, we classify the Personal Information we
              collect, use and disclose into two main categories: The first is Personal Information
              included in Customer Information, and the second is Personal Information that is included
              in Processed Data. It is important to note that not all Customer Information or Processed
              Data is Personal Information, either because it relates to a company or a business, or it
              is not identifiable.
            </p>

            <h2>PROCESSED DATA</h2>
            <p>
              JamMasterTuning does not control what information a Customer chooses to include in Processed Data.
              Because we are unable to determine whether it is Personal Information or other
              information, we treat it as though it may be Personal Information but our Customers are
              entirely responsible for any Personal Information they choose to include in Processed
              Data. All Customers and their provisioned users should understand that data in JamMasterTuning can
              be exported, shared or displayed by a Customer or provisioned user. Customers and
              provisioned users are solely responsible for the use of such exported, shared or displayed
              data and for protecting it appropriately.
            </p>

            <h2>WHAT INFORMATION</h2>
            <p>
              From our Customers, we only collect Customer Information that is necessary to establish
              and maintain the provision of the Services to them, as well as to understand and improve
              the usage and performance of the Services. When our Customers are corporations, as opposed
              to individuals, this information is not &#34;Personal Information&#34;. This Customer Information
              includes:
            </p>
            <ul>
              <li>Customer name</li>
              <li>Contact information, including postal and email addresses</li>
              <li>Billing address</li>
              <li>Billing details (as necessary for our internal accounting purposes and for processing payments through our contracted processing service)</li>
              <li>Login information for provisioned users, such as usernames and encrypted passwords</li>
              <li>Information about how the Customer and its provisioned users use the Service, including information about the Customer, location information, usage patterns and intended use of the Services.</li>
              <li>Information provided by the Customer and its provisioned users in connection with any support given by the JamMasterTuning team related to the Services.
                Login information for third party integrations to JamMasterTuning, such as usernames and encrypted passwords</li>
            </ul>
            <p>
              In connection with our marketing, sales and Customer support functions, we may collect
              publicly-available information about our Customers and provisioned users, which is used
              for the purposes set out in this Privacy Statement.
            </p>

            <h2>PURPOSES FOR COLLECTION</h2>
            <p>We process Customer Information:</p>
            <ul>
              <li><strong>Name and Contact information:</strong> To identify account owners and to contact you for both support and marketing purposes</li>
              <li><strong>Billing address and details:</strong> For invoicing and payment purposes</li>
              <li><strong>Login information:</strong> For authentication purposes for the software, and to identify the user for usage analytics</li>
              <li><strong>Information about how the Customer and its provisioned users use the Services:</strong> To understand the usage patterns for the Services in order to improve the Services</li>
              <li><strong>Information provided by the Customer and its provisioned users in connection with any support given by the JamMasterTuning team related to the Services:</strong> To resolve problems raised by the Customer or to improve the service based on Customer feedback</li>
              <li><strong>Login information for third party integrations to JamMasterTuning, such as usernames and encrypted passwords:</strong> To connect to 3rd party services on behalf of the Customer in order to provide the Services</li>
            </ul>
            <p>
              As stated in more detail in our Terms of Service, Processed Data is only processed by
              JamMasterTuning on behalf of our Customers to provide them with the Services. Individual provisioned
              users whose Personal Information is contained in Processed Data should refer to the
              Customer&lsquo;s privacy policy for an understanding of how Personal Information is collected,
              used, disclosed and otherwise processed by the Customer by use of the Services.
            </p>
            <p>
              In accordance with our Terms of Service, JamMasterTuning may use de-identified and/or aggregate
              information derived from Personal Information, for any purposes, including:
            </p>
            <ul>
              <li>Analytics to understand how our Customers and their provisioned users make use of the Services and our website and to make targeted offerings of certain Services to our Customers and provisioned users;</li>
              <li>Information used to determine how to make improvements to the Services and to develop new features, capabilities and ways of presenting data; and</li>
              <li>For commercial purposes, either for JamMasterTuning or for others.</li>
            </ul>
            <p>
              We will take industry standard steps so that this de-identified and/or aggregate
              information cannot be connected to any particular individual.
            </p>

            <h2>DISCLOSURE OF PERSONAL INFORMATION</h2>
            <p>
              JamMasterTuning may share Personal Information with people within the company who have a &#34;need to
              know&#34; the information for business or legal reasons, for example, in order to carry out an
              administrative function, such as processing an invoice or supporting questions that you
              have submitted to JamMasterTuning.
            </p>
            <p>We may share Personal Information with third parties, including:</p>
            <ul>
              <li>government and regulatory authorities, for example to respond to a legal request or comply with a legal obligation, in which case we will make reasonable efforts to give the relevant individual notice of the disclosure, provided we are able to identify the individual and are lawfully able to do so;</li>
              <li>for the purposes of seeking legal or other professional advice;</li>
              <li>suppliers of IT services and third party service providers engaged by JamMasterTuning as further detailed in this Privacy Statement and our Terms of Service; and
                in the event that we sell, buy or merge any business or assets, including to the prospective seller or buyer of such business or assets and their respective professional advisers.</li>
            </ul>
            <p style={{ paddingBottom: "25px" }}>
              We may also share anonymous or de-identified information with other third parties in
              connection with the purposes outlined in this Privacy Statement.
            </p>

          </div>

        </article>
      </div>

    </>
  );
}
export default Privacy;