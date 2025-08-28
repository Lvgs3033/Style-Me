# Style Me - AI-Powered Personal Style Analysis Platform

A comprehensive web application that uses artificial intelligence to provide personalized style recommendations including color analysis, body type assessment, jewelry suggestions, makeup guidance, and natural beauty remedies.

## 🌟 Features

### Core Analysis Tools
- **AI Color Analysis**: Determines skin tone, undertones, and seasonal color palette using Google's Gemini AI
- **Body Type Analysis**: Provides personalized clothing recommendations based on body shape
- **Jewelry Recommendations**: Suggests metals, gemstones, and jewelry styles that complement your skin tone
- **Makeup Guidance**: Offers foundation matching, lip colors, eyeshadow palettes, and complete makeup tutorials
- **Natural Beauty Remedies**: Comprehensive database of 100+ natural beauty treatments and skincare solutions

### Advanced Features
- **Group Photo Detection**: Automatically detects and requests solo photos for accurate analysis
- **Image Compression**: Optimizes uploaded photos to reduce API token usage while maintaining quality
- **Demo Mode**: Provides realistic sample results when API services are unavailable
- **Multi-page Navigation**: Dedicated pages for each analysis type with seamless user flow
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** with App Router for modern React development
- **TypeScript** for type-safe development
- **Tailwind CSS v4** for responsive styling and design system
- **shadcn/ui** component library for consistent UI elements
- **Lucide React** for beautiful icons and visual elements

### Backend & AI
- **Google Gemini AI API** for intelligent image analysis and recommendations
- **Next.js API Routes** for serverless backend functionality
- **Image Processing** with HTML5 Canvas for compression and optimization

### UI/UX Features
- **Animated Components** with smooth transitions and hover effects
- **Gradient Backgrounds** and modern visual design
- **Progress Tracking** for analysis processes
- **Interactive Color Swatches** with visual feedback
- **Tabbed Interface** for organized content presentation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/style-me.git
   cd style-me
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage Guide

### Color Analysis
1. Upload a clear, well-lit photo of your face
2. Wait for AI analysis (20-30 seconds)
3. Receive personalized recommendations for:
   - Skin tone and undertone identification
   - Seasonal color palette
   - Best and worst colors for your complexion
   - Clothing color recommendations

### Body Type Analysis
1. Navigate to the Body Type Analysis page
2. Upload a full-body or upper-body photo
3. Get recommendations for:
   - Clothing styles that flatter your figure
   - Specific garment types (jeans, tops, dresses)
   - Fabric and fit suggestions

### Jewelry & Makeup Guidance
- Access through dedicated pages or after color analysis
- Receive specific recommendations for metals, gemstones, and makeup shades
- Learn application techniques and styling tips

### Natural Beauty Remedies
- Browse 100+ natural beauty treatments
- Search by concern (acne, dark circles, hair care, etc.)
- Get step-by-step instructions for DIY treatments

## 🎨 Project Structure

\`\`\`
style-me/
├── app/
│   ├── api/
│   │   ├── analyze-color/
│   │   ├── analyze-body-type/
│   │   └── analyze-makeup/
│   ├── body-type-analysis/
│   ├── makeup-guidance/
│   ├── beauty-remedies/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
├── lib/
│   └── utils.ts
├── public/
└── README.md
\`\`\`

## 🔧 API Integration

The application integrates with Google's Gemini AI API for intelligent image analysis. The system includes:

- **Retry Logic**: Automatic retries with exponential backoff
- **Error Handling**: Graceful fallback to demo mode
- **Rate Limiting**: Optimized requests to stay within API quotas
- **Image Optimization**: Automatic compression to reduce token usage

## 🎯 Key Features Implementation

### Intelligent Image Analysis
- Detects group photos and requests solo images
- Analyzes skin tone, undertones, and body type
- Provides confidence levels for recommendations

### User Experience
- Welcome popup with animated introduction
- Progress tracking during analysis
- Smooth animations and transitions
- Mobile-responsive design

### Content Management
- Comprehensive beauty remedies database
- Searchable and filterable content
- Category-based organization
- Professional styling tips and guidelines

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** with automatic builds and previews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent image analysis
- shadcn/ui for beautiful component library
- Tailwind CSS for responsive design system
- Next.js team for the amazing framework

---

**Style Me** - Transform your style with AI-powered analysis! 💄✨👗
