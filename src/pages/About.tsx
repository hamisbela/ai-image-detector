import React from 'react';
import { Shield } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
          <p>
            Welcome to AI Image Detector, your trusted resource for AI-powered image verification.
            We're passionate about digital authenticity and helping journalists, content moderators, and digital citizens identify
            artificially generated images through advanced technology that analyzes visual characteristics that distinguish 
            AI-created content from authentic photography.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make AI image detection accessible to everyone by providing a free, easy-to-use
            tool. In an era of increasingly sophisticated AI image generation, we aim to help professionals and concerned citizens 
            quickly identify potentially misleading synthetic media, understand the telltale signs of AI generation, and promote 
            media literacy in our digital landscape.
            Our tool is designed to support truth and transparency by reducing the spread of synthetic media presented as authentic 
            and helping more people understand the evolving capabilities of generative AI.
          </p>

          <h2>Why Choose Our Tool?</h2>
          <ul>
            <li>Advanced AI detection algorithms trained on diverse datasets</li>
            <li>Detailed analysis reports with confidence ratings</li>
            <li>Technical breakdown of detection factors</li>
            <li>Educational insights about AI generation markers</li>
            <li>Regular updates to detect the latest AI generation techniques</li>
            <li>Completely free to use</li>
            <li>No registration required</li>
            <li>Privacy-focused approach</li>
            <li>User-friendly interface for non-technical users</li>
          </ul>

          <h2>Support Our Project</h2>
          <p>
            We're committed to keeping this AI image detector tool free and accessible to everyone.
            If you find our tool useful, consider supporting us by buying us a coffee.
            Your support helps us maintain and improve the service, ensuring it remains available to all
            who need to verify digital content in an increasingly synthetic media landscape.
          </p>

          <div className="mt-8 text-center">
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-image-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
            >
              Support Our Work
            </a>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
              <Shield className="h-5 w-5 text-emerald-600 mr-2" />
              Important Disclaimer
            </h3>
            <p className="text-gray-700">
              While our AI image detection tool uses sophisticated algorithms to analyze images, it's important to understand that no detection system is 100% accurate. Technology is evolving rapidly on both sides - both generation and detection. 
            </p>
            <p className="text-gray-700 mt-2">
              Our tool should be used as one piece of evidence in a broader verification process, not as definitive proof of an image's authenticity or synthetic nature. We encourage critical thinking and multiple verification methods when the authenticity of an image is crucial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}