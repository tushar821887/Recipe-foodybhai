import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-[var(--background)] min-h-screen py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
        
        <div class="prose prose-lg max-w-none font-sans text-gray-700">
          <p class="text-sm text-gray-500 mb-8 text-center">Last Updated: July 3, 2026</p>

          <p>Welcome to Foody Bhai Recipes. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit recipes.foodybhai.in.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
          <p>Since we operate a static website with no user authentication or databases, we do not collect personal data such as names, emails, or phone numbers directly through forms. However, certain technical data is collected automatically when you visit:</p>
          <ul>
            <li>IP addresses (anonymized where possible)</li>
            <li>Browser type and version</li>
            <li>Time zone setting and location</li>
            <li>Operating system and platform</li>
          </ul>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">2. Cookies Policy</h2>
          <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">3. Google AdSense Policy</h2>
          <p>We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
          <p>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline">Google's Ads Settings</a>.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">4. Google Analytics</h2>
          <p>We use Google Analytics to analyze website traffic. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website. Google's privacy policy is available at: <a href="https://policies.google.com/privacy" target="_blank" class="text-[var(--primary)] hover:underline">policies.google.com/privacy</a>.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">5. Third-Party Services & Links</h2>
          <p>Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">6. Data Security</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">7. Children's Privacy</h2>
          <p>Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">8. Changes to Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

          <h2 class="text-2xl font-serif font-bold text-gray-900 mt-10 mb-4">9. Contact Information</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p class="font-medium">phone: 8218870579 </p>
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 text-center">
          <a routerLink="/" class="text-[var(--primary)] font-ui font-medium hover:underline">&larr; Back to Home</a>
        </div>
      </div>
    </div>
  `
})
export class PrivacyPolicyComponent {}
