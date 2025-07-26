# 🔧 Fix GitHub Pages 404 Error

## Issue
The URL https://shreyo-ghosh.github.io/my-portfolio/ returns a 404 error because **GitHub Pages is not enabled** for this repository.

## ✅ Solution: Enable GitHub Pages

### Step 1: Go to Repository Settings
1. Visit: https://github.com/shreyo-ghosh/my-portfolio
2. Click the **"Settings"** tab (top right of the repository)

### Step 2: Enable GitHub Pages
1. Scroll down to **"Pages"** in the left sidebar
2. Under **"Source"**, select **"Deploy from a branch"**
3. Choose **"gh-pages"** as the branch
4. Select **"/ (root)"** as the folder
5. Click **"Save"**

### Step 3: Wait for Deployment
- GitHub will show: "Your site is ready to be published at https://shreyo-ghosh.github.io/my-portfolio/"
- Initial deployment may take 5-10 minutes
- Once ready, the message changes to: "Your site is live at https://shreyo-ghosh.github.io/my-portfolio/"

## 🔍 Verification

After enabling, verify the deployment:

1. **Check the URL**: https://shreyo-ghosh.github.io/my-portfolio/
2. **GitHub Pages Status**: Repository Settings → Pages should show "Your site is live"
3. **Branch Status**: The `gh-pages` branch should exist with the built files

## 🚀 Alternative: Quick Re-enable

If Pages was previously enabled but not working:

1. Go to Settings → Pages
2. Change source to "None" and save
3. Wait 1 minute
4. Change back to "Deploy from a branch" → "gh-pages" → "/ (root)"
5. Save and wait for deployment

## 📋 What's Already Set Up

✅ **gh-pages branch exists** with deployed files  
✅ **package.json** has correct homepage URL  
✅ **vite.config.js** has correct base path `/my-portfolio/`  
✅ **Build works locally** (tested)  
✅ **All assets are properly deployed**

## 🔧 If Still Not Working

### Option 1: Manual Re-deployment
```bash
npm run deploy
```

### Option 2: Check Branch Protection
- Go to Settings → Branches
- Ensure `gh-pages` branch is not protected

### Option 3: Repository Visibility
- Ensure repository is **Public** (Pages requires public repo for free accounts)

## 📞 Expected Result

Once enabled, you should see:
- **URL**: https://shreyo-ghosh.github.io/my-portfolio/
- **Status**: 200 OK (not 404)
- **Content**: Full IT Services Portfolio with all 8 service categories

## ⚠️ Common Issues

1. **Still 404 after enabling**: Wait 10 minutes for DNS propagation
2. **Page shows old content**: Clear browser cache (Ctrl+F5)
3. **CSS not loading**: Check if Pages source is set to `gh-pages` branch, not `main`

---

**The portfolio is correctly built and deployed to the `gh-pages` branch. The only missing step is enabling GitHub Pages in the repository settings.**