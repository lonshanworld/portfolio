# DualPersona Portfolio

A dual-view portfolio website for a Senior Software Engineer that switches between a high-end modern aesthetic and a raw, retro 90s HTML style. Features a Gemini-powered AI assistant and a contact form for visitors to reach out.

## Features

- 🎨 **Dual View Mode**: Toggle between Modern (cyberpunk-inspired) and Retro (90s HTML) designs
- 🤖 **AI Assistant**: Gemini-powered chatbot to answer questions about experience and skills
- 📧 **Contact Form**: Allows visitors to send messages directly
- 🎮 **Project Showcases**: Interactive previews for web, mobile, and game projects
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then add your API keys:
   - **GEMINI_API_KEY**: Get your free key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **WEB3FORMS_ACCESS_KEY**: Get your free key from [Web3Forms](https://web3forms.com)

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Tech Stack

- **Frontend**: React 19.2, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React
- **AI**: Google Gemini 2.5 Flash API
- **Email**: Web3Forms API

## Contact Form

The contact form validates:
- **Email**: Required field (must be valid email format)
- **Subject or Message**: At least one must be provided

Messages are sent via Web3Forms API to your configured email address.

## Project Structure

```
├── components/
│   ├── ContactForm.tsx      # Email contact form component
│   ├── GamePreview.tsx      # Game project preview iframe
│   ├── ModernView.tsx       # Modern cyberpunk view
│   ├── RetroView.tsx        # Retro 90s HTML view
│   └── SitePreview.tsx      # Website project preview iframe
├── services/
│   └── geminiService.ts     # Gemini AI integration
├── App.tsx                  # Main app component with view toggle
├── constants.ts             # Portfolio data (experiences, projects, skills)
├── types.ts                 # TypeScript interfaces
└── vite.config.ts          # Vite configuration

```

## Customization

Update your personal information in `constants.ts`:
- `PERSONAL_INFO`: Name, title, contact details
- `EXPERIENCES`: Work history
- `PROJECTS`: Portfolio projects
- `SKILLS`: Technical skills

## License

© 2026 Lon Shan. All rights reserved.
