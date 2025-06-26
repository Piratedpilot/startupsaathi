# StartupSaathi - AI-Powered Startup Validator for India 🇮🇳

StartupSaathi is an intelligent platform that helps Indian entrepreneurs validate their startup ideas using AI-powered analysis tailored specifically for the Indian market.

## Features

- 🇮🇳 **India-Focused Analysis** - Market validation considering Indian demographics, regulations, and consumer behavior
- 🤖 **AI-Powered Insights** - Comprehensive analysis using advanced AI models
- 📊 **Detailed Reports** - Get scores for market size, competition, feasibility, and more
- 💰 **Financial Projections** - Revenue models and funding requirements for Indian market
- 🎯 **Risk Assessment** - Identify and mitigate India-specific business risks
- 📈 **Validation History** - Track and compare multiple idea validations

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/Piratedpilot/startupsaathi.git
cd startupsaathi
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your keys to `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

4. Set up the database
- Go to your Supabase dashboard
- Run the SQL script from `scripts/create-validations-table.sql`

5. Start the development server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## Project Structure

\`\`\`
startupsaathi/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth.tsx          # Authentication
│   ├── dashboard.tsx     # User dashboard
│   ├── idea-validator.tsx # Validation form
│   ├── landing-page.tsx  # Landing page
│   └── validation-history.tsx # History view
├── lib/                  # Utility functions
│   └── supabase.ts      # Supabase client
└── scripts/             # Database scripts
    └── create-validations-table.sql
\`\`\`

## Features in Detail

### Market Analysis
- Total Addressable Market (TAM) for India
- Serviceable Addressable Market (SAM)
- Serviceable Obtainable Market (SOM)
- Regional market insights

### Competition Analysis
- Local and international competitors
- Competitive advantages
- Market positioning strategies

### Financial Modeling
- Revenue model recommendations
- Pricing strategies for Indian market
- Funding requirements and sources
- Unit economics analysis

### Risk Assessment
- Regulatory compliance requirements
- Market entry barriers
- Operational challenges
- Mitigation strategies

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@startupsaathi.com or join our community discussions.

## Roadmap

- [ ] Multi-language support (Hindi, Tamil, Bengali)
- [ ] Integration with Indian startup databases
- [ ] Mentor matching system
- [ ] Funding opportunity alerts
- [ ] Mobile app development

---

**StartupSaathi** - Empowering the next generation of Indian entrepreneurs 🚀
