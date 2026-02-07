# Times of NYTVNT 📰

A premium cybersecurity news aggregator website built with React, Vite, and Tailwind CSS.

## Features ✨

- **Real-time News Aggregation** - Fetches latest cybersecurity news from multiple RSS feeds
- **Smart Categorization** - Automatically categorizes news into:
  - Threats & Attacks
  - Malware
  - Privacy & Compliance
  - Security Updates
  - AI & Technology
  - Cyber Intelligence
- **Advanced Search** - Search across all news articles
- **Category Filtering** - Filter news by category
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark Theme** - Premium dark UI with neon accents
- **Live Updates** - Fetches from 5 major cybersecurity news sources

## News Sources 📡

- The Hacker News
- Bleeping Computer
- Krebs on Security
- Dark Reading
- SecurityWeek

## Installation 🚀

1. Navigate to the project directory:
```bash
cd times-of-nytvnt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## Build for Production 📦

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Technology Stack 💻

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **RSS2JSON API** - RSS feed parsing

## Project Structure 📁

```
times-of-nytvnt/
├── src/
│   ├── utils/
│   │   └── newsService.js    # News fetching logic
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Features in Detail 🔍

### News Fetching
- Uses RSS2JSON API to convert RSS feeds to JSON
- Fetches from multiple sources simultaneously
- Sorts by publication date (newest first)
- Extracts images from content when available

### Categorization
- Intelligent keyword-based categorization
- Each category has unique icon and color
- Easy to filter and browse

### Search
- Real-time search across titles and descriptions
- Case-insensitive matching
- Instant results

### UI/UX
- Glassmorphism effects
- Smooth animations with Framer Motion
- Hover effects and transitions
- Mobile-responsive grid layout
- Custom scrollbar styling

## Customization 🎨

### Adding New RSS Feeds

Edit `src/utils/newsService.js`:

```javascript
export const RSS_FEEDS = [
    { key: "Source Name", url: "https://example.com/feed/" },
    // Add more feeds here
];
```

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#00ff9d',    // Change primary color
  secondary: '#0066ff',  // Change secondary color
  // ...
}
```

## License 📄

MIT License - feel free to use this project for your own purposes.

## Credits 👏

Built with ❤️ for the NYTVNT ecosystem.

---

**Times of NYTVNT** - Stay informed. Stay secure. 🛡️
