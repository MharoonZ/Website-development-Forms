# Deploying ARBA Website on Render

This guide will walk you through deploying your ARBA website on Render.com.

## Prerequisites

1. A [Render.com](https://render.com) account (free tier works)
2. Your website files ready (index.html, styles.css, script.js, etc.)
3. Your Formspree and Google Sheets URLs configured

## Method 1: Deploy via Render Dashboard (Recommended for First Time)

### Step 1: Prepare Your Files

1. Make sure all your files are in a folder (or Git repository)
2. Ensure `index.html` is in the root directory
3. Update `script.js` with your actual Formspree IDs and Google Sheets URL

### Step 2: Create a New Static Site on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** button
3. Select **"Static Site"**

### Step 3: Connect Your Repository

**Option A: Connect GitHub/GitLab/Bitbucket**
- Click **"Connect account"** and authorize Render
- Select your repository
- Render will auto-detect it's a static site

**Option B: Deploy from Public Git Repository**
- Paste your repository URL
- Render will clone and deploy

**Option C: Manual Deploy (No Git)**
- Use the "Manual Deploy" option
- You'll need to upload files via Render CLI (see Method 2)

### Step 4: Configure Your Static Site

Fill in the following settings:

- **Name**: `arba-alliance` (or your preferred name)
- **Branch**: `main` (or `master`, depending on your repo)
- **Root Directory**: Leave empty (or `./` if files are in a subfolder)
- **Build Command**: Leave empty (static site, no build needed)
- **Publish Directory**: Leave empty (or `./` if files are in root)

### Step 5: Add Custom Domain (Optional)

1. After deployment, go to your service settings
2. Click **"Custom Domains"**
3. Add `arba-alliance.org`
4. Follow Render's DNS instructions to point your domain

### Step 6: Environment Variables (If Needed)

If you want to use environment variables instead of hardcoding in `script.js`:

1. Go to **Environment** tab
2. Add variables (though for static sites, you'll still need to inject them at build time)

**Note**: For static sites, environment variables aren't directly available. You'll need to use a build step or keep configuration in `script.js`.

### Step 7: Deploy

1. Click **"Create Static Site"**
2. Render will deploy your site
3. You'll get a URL like: `https://arba-alliance.onrender.com`
4. Wait 1-2 minutes for deployment to complete

## Method 2: Deploy via Render CLI

### Step 1: Install Render CLI

```bash
# Windows (PowerShell)
iwr https://render.com/install | iex

# Or download from: https://github.com/renderinc/cli
```

### Step 2: Login to Render

```bash
render login
```

### Step 3: Initialize Render in Your Project

```bash
cd C:\Users\Admin\Desktop\ARBA
render init
```

### Step 4: Deploy

```bash
render deploy
```

## Method 3: Using render.yaml (Automated)

I've created a `render.yaml` file for you. If you push to Git:

1. Connect your Git repository to Render
2. Render will automatically detect `render.yaml`
3. It will deploy according to the configuration

## Post-Deployment Checklist

- [ ] Test the membership form (should submit to Formspree + Google Sheets)
- [ ] Test the contact form (should submit to Formspree only)
- [ ] Verify HTTPS is enabled (Render provides this automatically)
- [ ] Test on mobile devices
- [ ] Check that animations work
- [ ] Verify all links work
- [ ] Test the 1-pager download link (if PDF is uploaded)

## Custom Domain Setup

1. In Render dashboard, go to your static site
2. Click **"Settings"** → **"Custom Domains"**
3. Add `arba-alliance.org`
4. Render will provide DNS records:
   - **CNAME**: `arba-alliance.org` → `your-site.onrender.com`
   - Or **A Record**: Use Render's IP addresses
5. Update your domain's DNS settings at your registrar
6. Wait for DNS propagation (can take up to 48 hours, usually faster)

## Important Notes

1. **Free Tier**: Render's free tier spins down after 15 minutes of inactivity. First request may take 30-60 seconds. For production, consider paid tier.

2. **HTTPS**: Render provides free SSL certificates automatically for custom domains.

3. **File Size**: Make sure your assets (especially PDF) aren't too large. Render has limits on static site size.

4. **Formspree CORS**: Formspree works fine with Render. No CORS issues.

5. **Google Sheets**: Your Google Apps Script URL will work from any domain, including Render.

## Troubleshooting

### Site Not Loading
- Check Render dashboard for deployment logs
- Verify `index.html` is in the root directory
- Check that all file paths are correct (case-sensitive on Linux)

### Forms Not Working
- Open browser console (F12) and check for errors
- Verify Formspree IDs are correct in `script.js`
- Check that HTTPS is enabled (required for Formspree)

### 404 Errors
- Ensure all file paths are relative (not absolute)
- Check that `assets/` folder and files are uploaded

### Slow Loading
- Free tier has cold starts (first request after inactivity)
- Consider upgrading to paid tier for production

## Support

- Render Docs: [render.com/docs](https://render.com/docs)
- Render Support: [render.com/support](https://render.com/support)
- Render Community: [community.render.com](https://community.render.com)

