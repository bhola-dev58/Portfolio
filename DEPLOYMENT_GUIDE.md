# 🚀 CI/CD & Deployment Guide

To automate your deployment (CI/CD) and get your portfolio live, I recommend using **Vercel**. It is the industry standard for React/Vite apps.

## ✅ What I have setup for you:
1.  **`vercel.json`**: Added configuration to handle routing (so refreshing pages doesn't give 404 errors).
2.  **`.github/workflows/ci.yml`**: Added a "Continuous Integration" script. Every time you push code to GitHub, this script automatically runs to check if your code builds correctly.

---

## 🌍 Step-by-Step Deployment (The "CD" Part)

### Option 1: Vercel (Recommended & Easiest)
This is the best method. It connects to your GitHub and automatically deploys whenever you push changes.

1.  **Push your latest changes** to GitHub:
    ```bash
    git add .
    git commit -m "Setup CI/CD config"
    git push origin main
    ```

2.  **Go to [Vercel.com](https://vercel.com/)** and Sign Up / Login (Login with GitHub is easiest).

3.  Click **"Add New..."** -> **"Project"**.

4.  **Import Git Repository**:
    *   Find your repository: `bhola-dev58/Portfolio`
    *   Click **Import**.

5.  **Configure Project**:
    *   **Framework Preset**: It should auto-detect **Vite**. If not, select **Vite**.
    *   **Root Directory**: Leave as `./`.
    *   **Environment Variables** (Crucial!):
        *   Copy the values from your local `.env` file (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
        *   Add them one by one in the Vercel dashboard.

6.  Click **Deploy**.
    *   Wait ~1 minute. You will get a live URL (e.g., `portfolio-bhola.vercel.app`).
    *   **Done!** Your site is live. 🚀

### Automation Check
*   Try making a small change in your code and push it (`git push`).
*   Go to Vercel Dashboard -> Deployments. You will see it **automatically** building and deploying your new version. That is CI/CD!

---

### Option 2: Netlify (Alternative)
Similar to Vercel.
1.  Go to Netlify.com -> "Add new site" -> "Import an existing project".
2.  Connect GitHub -> Pick Repository.
3.  Build Command: `npm run build`
4.  Publish Directory: `dist`
5.  Add Environment Variables in "Site Settings".
6.  Deploy.

---

### Option 3: GitHub Pages (Free but harder)
If you specifically want a `github.io` domain:
1.  You need a different GitHub Action configuration.
2.  Let me know if you prefer this, but Vercel is generally faster and better for React apps.
