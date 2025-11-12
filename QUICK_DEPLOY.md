# Quick Deploy to Render - 5 Minutes

## Fastest Method (GitHub + Render)

### 1. Push to GitHub (2 min)
```bash
# If you don't have git initialized
git init
git add .
git commit -m "Initial ARBA website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/arba-alliance.git
git push -u origin main
```

### 2. Deploy on Render (3 min)
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository
4. Settings:
   - **Name**: `arba-alliance`
   - **Build Command**: (leave empty)
   - **Publish Directory**: (leave empty)
5. Click **"Create Static Site"**
6. Done! Your site is live at `https://arba-alliance.onrender.com`

### 3. Add Custom Domain (Optional)
1. In Render dashboard → Your site → **Settings** → **Custom Domains**
2. Add `arba-alliance.org`
3. Follow DNS instructions

## Important Before Deploying

✅ Update `script.js` with your actual IDs:
- `formspreeMembershipId`: Your Formspree membership form ID
- `googleSheetsUrl`: Your Google Apps Script URL
- `formspreeContactId`: Already set to `movyvqdv` ✓

✅ Upload your 1-pager PDF to `assets/ARBA-1Pager.pdf` (or update the link)

## That's It!

Your site will be live in ~2 minutes. For detailed instructions, see `RENDER_DEPLOYMENT.md`.

