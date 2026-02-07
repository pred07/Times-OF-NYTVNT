// RSS Feed sources for cybersecurity news
export const RSS_FEEDS = [
    { key: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
    { key: "Bleeping Computer", url: "https://www.bleepingcomputer.com/feed/" },
    { key: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
    { key: "Dark Reading", url: "https://www.darkreading.com/rss.xml" },
    { key: "SecurityWeek", url: "https://www.securityweek.com/feed/" }
];

// Use rss2json service for client-side RSS parsing
const RSS2JSON_API = import.meta.env.VITE_RSS2JSON_API || "https://api.rss2json.com/v1/api.json";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let newsCache = null;
let cacheTimestamp = null;

/**
 * Fetch news from all RSS feeds
 * @returns {Promise<Array>} Array of news items
 */
export const fetchAllNews = async () => {
    try {
        // Return cached data if still valid
        if (newsCache && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
            console.log('Returning cached news data');
            return newsCache;
        }

        const allNews = [];

        for (const feed of RSS_FEEDS) {
            try {
                const response = await fetchWithRetry(`${RSS2JSON_API}?rss_url=${encodeURIComponent(feed.url)}`, 2);
                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    data.items.forEach(item => {
                        allNews.push({
                            id: `${feed.key}-${item.pubDate}`,
                            title: item.title,
                            link: item.link,
                            date: new Date(item.pubDate),
                            source: feed.key,
                            snippet: stripHtml(item.description || item.content || ''),
                            fullContent: item.description || item.content || '',
                            category: categorizeNews(item.title, item.description),
                            image: extractImage(item.description || item.content)
                        });
                    });
                }
            } catch (err) {
                console.error(`Failed to fetch ${feed.key}:`, err);
            }
        }

        // Sort by date (newest first)
        const sortedNews = allNews.sort((a, b) => b.date - a.date);

        // Update cache
        newsCache = sortedNews;
        cacheTimestamp = Date.now();

        return sortedNews;
    } catch (err) {
        console.error('Error fetching news:', err);
        // Return cached data if available, even if expired
        return newsCache || [];
    }
};

/**
 * Fetch with retry logic
 */
const fetchWithRetry = async (url, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;
        } catch (err) {
            if (i === retries) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
};


/**
 * Strip HTML tags from text
 */
const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
};

/**
 * Extract first image from HTML content
 */
const extractImage = (html) => {
    if (!html) return null;
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = html.match(imgRegex);
    return match ? match[1] : null;
};

/**
 * Categorize news based on keywords
 */
const categorizeNews = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    if (text.match(/breach|hack|attack|exploit|vulnerability|cve/)) {
        return 'Threats & Attacks';
    } else if (text.match(/malware|ransomware|trojan|virus/)) {
        return 'Malware';
    } else if (text.match(/privacy|data|gdpr|compliance/)) {
        return 'Privacy & Compliance';
    } else if (text.match(/patch|update|fix|security/)) {
        return 'Security Updates';
    } else if (text.match(/ai|artificial intelligence|machine learning/)) {
        return 'AI & Technology';
    } else {
        return 'Cyber Intelligence';
    }
};

/**
 * Format time ago
 */
export const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mins ago";
    return "just now";
};
