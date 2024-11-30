import React from "react";

const TransPrivacyNotice = () => {
  return (
    <div className="container">
      <h1>Privacy Notice</h1>
      <p>Last updated: 9/25/24</p>

      <h2>1. Information We Collect</h2>
      <p>
        TransTracker collects the following types of information:
        <ul>
          <li>Personal Data: Name, email address, and any other information you voluntarily provide.</li>
          <li>Usage Data: Information such as IP addresses, device type, and operating system.</li>
          <li>Location Data: Collected in real-time for providing location-based services, not stored, and deleted immediately after use.</li>
        </ul>
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>
        We use your data to provide services, including location data for tracking, and to improve the app.
      </p>

      <h2>3. Location Data Usage and Deletion</h2>
      <p>
        TransTracker accesses your location to provide certain functionalities. Location data is:
        <ul>
          <li>Used in real-time to assist with transit tracking.</li>
          <li>Not stored by the app or on our servers.</li>
          <li>Immediately deleted after the functionality is completed.</li>
        </ul>
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        We do not share your data, except when required by law or legal process.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We take reasonable steps to secure your personal data, including location data. However, no system is entirely secure.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        Personal Data is retained as long as necessary for outlined purposes or by law. Location Data is not retained.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal data and can opt-out of location data collection by disabling location services.
      </p>

      <h2>8. Changes to This Privacy Notice</h2>
      <p>
        We may update this Privacy Notice from time to time. Continued use of the app constitutes acceptance of any changes.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions, contact us at Support@CarboCredit.org.
      </p>
    </div>
  );
};

export default TransPrivacyNotice;
