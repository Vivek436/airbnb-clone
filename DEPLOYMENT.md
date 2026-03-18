# Airbnb Clone - Deployment Guide

This guide will help you deploy your Airbnb clone to production.

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Render/Railway account (for backend)
- Vercel/Netlify account (for frontend)

---

## Part 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and login
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Save this connection string for later

---

## Part 2: Setup Cloudinary (Image Storage)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Go to Dashboard
4. Copy these values:
   - Cloud Name
   - API Key
   - API Secret
5. Save these for later

---

## Part 3: Deploy Backend (Render)

### Option A: Using Render (Recommended - Free)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com/)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: airbnb-clone-backend
     - **Root Directory**: backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`
     - **Plan**: Free

3. **Add Environment Variables**
   Click "Environment" and add:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_random_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```

4. Click "Create Web Service"
5. Wait for deployment (5-10 minutes)
6. Copy your backend URL (e.g., `https://airbnb-clone-backend.onrender.com`)

### Option B: Using Railway

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables (same as above)
6. Deploy

---

## Part 4: Deploy Frontend (Vercel)

1. **Update Frontend Configuration**
   
   Edit `frontend/src/Context/AuthContext.jsx`:
   ```javascript
   const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"
   ```

2. **Create `.env` file in frontend folder**
   ```
   VITE_SERVER_URL=https://your-backend-url.onrender.com
   ```

3. **Create `vercel.json` in frontend folder**
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

4. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Sign up/Login with GitHub
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist
   
5. **Add Environment Variable**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_SERVER_URL` = `https://your-backend-url.onrender.com`

6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. Your site will be live at `https://your-project.vercel.app`

### Alternative: Deploy Frontend on Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select repository
5. Configure:
   - **Base directory**: frontend
   - **Build command**: `npm run build`
   - **Publish directory**: frontend/dist
6. Add environment variable: `VITE_SERVER_URL`
7. Deploy

---

## Part 5: Update Backend CORS

After deploying frontend, update backend environment variables:

1. Go to your Render/Railway dashboard
2. Update `CLIENT_URL` to your Vercel URL
3. Redeploy backend

---

## Part 6: Testing

1. Visit your frontend URL
2. Test all features:
   - ✅ User registration/login
   - ✅ Create listing
   - ✅ Search and filters
   - ✅ Booking
   - ✅ Wishlist
   - ✅ Host dashboard

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check logs in Render/Railway dashboard
- Verify all environment variables are set
- Check MongoDB connection string

**Problem**: CORS errors
- Verify `CLIENT_URL` in backend env variables
- Check frontend URL is correct

### Frontend Issues

**Problem**: API calls failing
- Check `VITE_SERVER_URL` is correct
- Verify backend is running
- Check browser console for errors

**Problem**: Images not uploading
- Verify Cloudinary credentials
- Check file size limits

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/airbnb
JWT_SECRET=your_super_secret_key_min_32_characters
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env)
```
VITE_SERVER_URL=https://your-backend.onrender.com
```

---

## Free Tier Limits

### Render (Backend)
- ✅ Free tier available
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ✅ 750 hours/month free

### Vercel (Frontend)
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domains

### MongoDB Atlas
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Perfect for small projects

### Cloudinary
- ✅ 25 GB storage
- ✅ 25 GB bandwidth/month
- ✅ 25,000 transformations/month

---

## Post-Deployment Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] MongoDB connected
- [ ] Cloudinary working
- [ ] User registration works
- [ ] Login works
- [ ] Create listing works
- [ ] Image upload works
- [ ] Booking works
- [ ] Search works
- [ ] Wishlist works
- [ ] All pages accessible

---

## Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Backend (Render)
1. Upgrade to paid plan ($7/month)
2. Add custom domain in settings

---

## Monitoring

### Backend Logs
- Render: Dashboard → Logs
- Railway: Dashboard → Deployments → Logs

### Frontend Logs
- Vercel: Dashboard → Deployments → Function Logs

---

## Support

If you face any issues:
1. Check logs in respective dashboards
2. Verify all environment variables
3. Test API endpoints using Postman
4. Check browser console for frontend errors

---

## Congratulations! 🎉

Your Airbnb clone is now live and accessible worldwide!

**Share your project:**
- Add to portfolio
- Share on LinkedIn
- Add to GitHub README
- Share with friends

---

## Next Steps (Optional Improvements)

1. Add custom domain
2. Setup email notifications (SendGrid/Mailgun)
3. Add payment gateway (Stripe/Razorpay)
4. Setup monitoring (Sentry)
5. Add analytics (Google Analytics)
6. Setup CI/CD pipeline
7. Add automated tests
8. Setup staging environment

---

**Made with ❤️ by [Your Name]**
