import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Image, AlertTriangle, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">AI Image Detector</h3>
            </div>
            <p className="text-gray-300">
              Your AI-powered companion for image verification. 
              Upload any photo and instantly detect if it was generated by AI, with detailed analysis to help identify synthetic media.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Image className="h-4 w-4 text-gray-400" />
                <Link to="/" className="text-gray-300 hover:text-white">
                  Image Detector
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-gray-400" />
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About AI Detection
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support Our Project</h3>
            <p className="text-gray-300 mb-4">
              Help us maintain and improve our free AI image detector for the digital media verification community.
            </p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-image-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Buy us a coffee
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p className="mb-2">&copy; {new Date().getFullYear()} AI Image Detector. Helping verify authentic media in a synthetic world.</p>
            <p className="text-sm">
              For informational purposes only. Use AI detection results as a guide, not definitive proof.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}