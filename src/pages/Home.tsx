import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Shield, Image, Loader2 } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';
import SupportBlock from '../components/SupportBlock';

// Default image path
const DEFAULT_IMAGE = "/default-ai-image.jpg"; // We're reusing the existing image

// Default analysis for the burger image
const DEFAULT_ANALYSIS = `## AI Image Detection Analysis

### Overall Assessment
🔍 **Verdict: AI-Generated Image (98.7% confidence)**

This appears to be an AI-generated image of a hamburger, not an authentic photograph.

### Technical Analysis

1. **Unnatural Perfection:**
   - Suspiciously perfect symmetry in the bun shape and overall burger structure
   - Unnaturally even distribution of sesame seeds on the bun
   - Overly uniform lettuce edges lacking the natural irregularities of real lettuce
   - Mathematically perfect layering of ingredients that doesn't occur naturally

2. **Texture Anomalies:**
   - Artificially smooth textures in the meat patty lacking authentic beef grain patterns
   - Tomato slices show repetitive texture patterns typical of AI rendering
   - Bun texture has that characteristic AI "painted" quality without true bread porosity
   - Pickles display unnatural translucency and edge definition

3. **Lighting Inconsistencies:**
   - Multiple light sources creating physically impossible highlight patterns
   - Lack of proper subsurface scattering in the tomato slices
   - Shadows don't properly align with a single consistent light source
   - Overly uniform ambient occlusion between ingredients

4. **Compositional Red Flags:**
   - Unrealistic "floating" appearance of some ingredients
   - Background blur has artificial bokeh characteristics
   - French fries in background show repetitive patterns
   - Wooden board texture has telltale AI-generated wood grain patterns

5. **Technical Artifacts:**
   - Subtle but noticeable inconsistencies at texture boundaries
   - Lack of natural lens distortion or camera artifacts
   - Overly clean image without natural photographic noise
   - Detail consistency regardless of depth - AI tends to render all areas with equal sharpness

### Additional Observations
- The image has that characteristic "too perfect to be real" quality common in AI food renderings
- The Grok watermark appears to be added to an already AI-generated image
- Colors have the typical AI-enhanced vibrancy that exceeds natural food photography
- The lighting suggests multiple, inconsistent light sources - a common AI rendering mistake
- Edges of ingredients are too defined and lack the natural softness of real food photography

### Conclusion
This image displays multiple hallmarks of AI generation. The combination of perfect symmetry, texture inconsistencies, lighting anomalies, and lack of natural photographic characteristics strongly indicates this is an AI-generated burger image, not an authentic photograph.`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load default image and analysis without API call
    const loadDefaultContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(DEFAULT_IMAGE);
        if (!response.ok) {
          throw new Error('Failed to load default image');
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setImage(base64data);
          setAnalysis(DEFAULT_ANALYSIS);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load default image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Error loading default image:', err);
        setError('Failed to load default image');
        setLoading(false);
      }
    };

    loadDefaultContent();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setError(null);
      handleAnalyze(base64String);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);

    // Reset the file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleAnalyze = async (imageData: string) => {
    setLoading(true);
    setError(null);
    try {
      // Using the default prompt from gemini.ts which now focuses on AI detection
      const result = await analyzeImage(imageData);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatAnalysis = (text: string) => {
    // Convert markdown to formatted components
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // H2 headers (##)
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-emerald-800 mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      }
      
      // H3 headers (###)
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-emerald-700 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // Bold with emoji verdict
      if (line.includes('**Verdict:')) {
        const [prefix, content] = line.split('**Verdict:');
        const verdictContent = content.split('**')[0];
        const remainder = content.split('**')[1] || '';
        
        // Change text color based on verdict
        const isReal = verdictContent.toLowerCase().includes('real');
        const textColorClass = isReal ? 'text-emerald-600' : 'text-red-600';
        
        return (
          <p key={index} className="text-lg font-bold mb-4">
            {prefix}<span className={`${textColorClass} font-bold`}>Verdict: {verdictContent}</span>{remainder}
          </p>
        );
      }
      
      // Numbered list items with bold headings
      if (/^\d+\.\s\*\*[^*]+\*\*/.test(line)) {
        const number = line.match(/^\d+/)?.[0];
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1];
        const content = line.replace(/^\d+\.\s\*\*[^*]+\*\*:\s*/, '');
        
        return (
          <div key={index} className="mb-4">
            <p className="font-semibold text-gray-900">
              {number}. <span className="font-bold">{title}:</span> {content}
            </p>
          </div>
        );
      }
      
      // Standard bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <div key={index} className="flex gap-2 ml-4 mb-2">
            <span className="text-emerald-500">•</span>
            <span className="text-gray-700">{line.substring(2)}</span>
          </div>
        );
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular text
      return (
        <p key={index} className="mb-3 text-gray-700">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Free AI Image Detector</h1>
          <p className="text-base sm:text-lg text-gray-600">Upload any photo and instantly verify if it's AI-generated or authentic</p>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-12 border border-gray-200">
          <div className="flex flex-col items-center justify-center mb-6">
            <label 
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <Upload className="h-5 w-5" />
              Upload Image to Analyze
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 20MB)</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {loading && !image && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          )}

          {image && (
            <div className="mb-6">
              <div className="relative rounded-lg mb-4 overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={image}
                  alt="Image to analyze"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnalyze(image)}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="-ml-1 mr-2 h-5 w-5" />
                      Detect AI Generation
                    </>
                  )}
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Another Image
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-7 w-7 text-emerald-600 mr-2" />
                Analysis Results
              </h2>
              <div className="text-gray-700">
                {formatAnalysis(analysis)}
              </div>
            </div>
          )}
        </div>

        <SupportBlock />

        <div className="prose max-w-none my-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Free AI Image Detector: Verify Photo Authenticity Instantly</h2>
          
          <p>Welcome to our cutting-edge <strong>free AI image detector</strong> tool, designed to help you identify AI-generated images with exceptional accuracy. In today's digital landscape, distinguishing between authentic photographs and AI-created content has become increasingly challenging – our <strong>free AI photo detector</strong> is here to help.</p>

          <h3>How Our AI Image Detector Works</h3>
          <p>Our sophisticated <strong>free AI image detector</strong> uses advanced artificial intelligence to analyze uploaded images for telltale signs of AI generation. Simply upload any photo, and our tool will provide a comprehensive analysis of its authenticity. Whether you're a journalist verifying sources, a content moderator, or simply curious if an image is real, our <strong>free AI photo detector</strong> gives you the insights you need.</p>

          <h3>Why Choose Our Free AI Image Detector</h3>
          <ul>
            <li>Advanced AI detection technology that identifies even sophisticated AI-generated images</li>
            <li>Detailed analysis reports explaining the reasoning behind each verification</li>
            <li>Fast processing with instant results for any image you upload</li>
            <li>User-friendly interface with no technical knowledge required</li>
            <li>100% free to use with no hidden costs or subscriptions</li>
            <li>Privacy-focused approach that doesn't store your uploaded images</li>
            <li>Regular updates to keep pace with evolving AI image generation techniques</li>
          </ul>

          <h3>When to Use Our Free AI Photo Detector:</h3>
          <ul>
            <li>Journalists and fact-checkers verifying the authenticity of news images</li>
            <li>Content moderators screening user-submitted photos</li>
            <li>Photographers identifying AI-generated work posing as authentic photography</li>
            <li>Educational institutions teaching digital literacy</li>
            <li>Social media users verifying questionable viral images</li>
            <li>Anyone concerned about the authenticity of digital images they encounter</li>
          </ul>

          <p>Try our <strong>free AI image detector</strong> today and gain confidence in determining which photos are authentic and which have been created by artificial intelligence. No registration required – simply upload an image and let our <strong>free AI photo detector</strong> analyze it instantly!</p>
        </div>

        <SupportBlock />
      </div>
    </div>
  );
}