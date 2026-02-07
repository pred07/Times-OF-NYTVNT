# 🌐 Deploy as news.nytvnt.vercel.app

## Step-by-Step Guide

### Option 1: Deploy as Separate Project (Recommended)

This will create `news.nytvnt.vercel.app` as a subdomain of your existing `nytvnt.vercel.app`.

#### Step 1: Initialize Git Repository
```bash
cd c:\Users\groot\Music\times-of-nytvnt
git init
git add .
git commit -m "Times of NYTVNT - News aggregator app"
```

#### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `times-of-nytvnt` (or `nytvnt-news`)
3. Click "Create repository"

#### Step 3: Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/times-of-nytvnt.git
git branch -M main
git push -u origin main
```

#### Step 4: Deploy to Vercel
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your new GitHub repository
4. **Project Name**: `nytvnt-news` (or any name)
5. **Framework Preset**: Vite
6. Click **"Deploy"**

#### Step 5: Add Subdomain
After deployment:
1. Go to your project settings on Vercel
2. Click **"Domains"** tab
3. Click **"Add"**
4. Enter: `news.nytvnt.vercel.app`
5. Click **"Add"**
6. Vercel will automatically configure it!

**Done! Your news app will be live at `news.nytvnt.vercel.app`** 🎉

---

### Option 2: Using Vercel CLI (Faster)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
cd c:\Users\groot\Music\times-of-nytvnt
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `nytvnt-news`
- **Directory?** → `./`
- **Override settings?** → No

#### Step 4: Add Subdomain
```bash
vercel domains add news.nytvnt.vercel.app nytvnt-news
```

**Done!** 🎉

---

### Option 3: Monorepo Approach (Advanced)

If you want to keep everything in one repository:

#### Step 1: Update Your Main Project Structure
```
nytvnt/
├── main-app/          # Your existing nytvnt.vercel.app
├── news-app/          # This news app
└── vercel.json        # Configuration
```

#### Step 2: Create vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "news-app/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/news/(.*)",
      "dest": "/news-app/$1"
    }
  ]
}
```

---

## 🎯 Recommended Approach

**Use Option 1** (Separate Project) - It's the cleanest and easiest:

### Quick Commands:
```bash
# 1. Initialize git
git init
git add .
git commit -m "News aggregator app"

# 2. Create GitHub repo at https://github.com/new
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/times-of-nytvnt.git
git branch -M main
git push -u origin main

# 3. Go to vercel.com/dashboard
# - Click "Add New" → "Project"
# - Import your repository
# - Deploy

# 4. After deployment, add domain:
# - Go to Project Settings → Domains
# - Add: news.nytvnt.vercel.app
# - Done!
```

---

## 🔧 Vercel Configuration

### Automatic Settings (Vercel detects these)
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables (if needed)
In Vercel dashboard → Settings → Environment Variables:
```
VITE_APP_TITLE=Times of NYTVNT
VITE_APP_DESCRIPTION=Cyber Intelligence Network
VITE_RSS2JSON_API=https://api.rss2json.com/v1/api.json
```

---

## 📱 After Deployment

Your news app will be accessible at:
- **Production**: `news.nytvnt.vercel.app`
- **Auto-generated**: `nytvnt-news.vercel.app` (also works)

### Features You'll Get:
- ✅ HTTPS automatic
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Preview deployments for branches
- ✅ Analytics
- ✅ Custom domain support

---

## 🎨 Linking from Main Site

On your main `nytvnt.vercel.app`, add a link:

```html
<a href="https://news.nytvnt.vercel.app">Latest News</a>
```

Or create a navigation menu:
```javascript
const navigation = [
  { name: 'Home', href: 'https://nytvnt.vercel.app' },
  { name: 'News', href: 'https://news.nytvnt.vercel.app' },
  // ... other links
];
```

---

## 🚀 Complete Deployment Checklist

- [ ] Initialize git repository
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Import to Vercel
- [ ] Deploy project
- [ ] Add subdomain `news.nytvnt.vercel.app`
- [ ] Test the live site
- [ ] Test on mobile
- [ ] Link from main site

---

## 💡 Pro Tips

### 1. Custom Domain (Optional)
If you have a custom domain like `nytvnt.com`:
- Add `news.nytvnt.com` in Vercel domains
- Update DNS records as instructed by Vercel

### 2. Auto-Deploy
Every time you push to GitHub:
```bash
git add .
git commit -m "Update news app"
git push
```
Vercel will automatically rebuild and deploy!

### 3. Preview Deployments
Create a branch for testing:
```bash
git checkout -b feature/new-design
git push origin feature/new-design
```
Vercel creates a preview URL automatically!

---

## 🎉 Summary

**Easiest Way:**
1. Push this project to GitHub
2. Import to Vercel
3. Add domain `news.nytvnt.vercel.app`
4. Done! ✨

**Your news app will be live at**: `news.nytvnt.vercel.app`

---

Need help with any step? Let me know! 🚀
