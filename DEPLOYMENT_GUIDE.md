# 🚀 Deployment Guide for bhola-yadav.com.np

Required Steps to get your site live on **bhola-yadav.com.np**:

## Phase 1: Deploy Code to Vercel
1.  **Push code to GitHub** (You have already done this ✅).
2.  **Login to [Vercel](https://vercel.com)** (Use GitHub login).
3.  **Click "Add New..." -> "Project"**.
4.  Select your repo: `bhola-dev58/Portfolio`.
5.  **Environment Variables**:
    *   Copy the values from `.env` on your computer (Supabase URL & Key).
    *   Paste them into the Vercel "Environment Variables" section.
6.  Click **Deploy**.

## Phase 2: Connect Your Domain (bhola-yadav.com.np)
Since you are using a `.com.np` domain (likely registered via Mercantile/register.com.np), the **Nameserver Method** is the only one that works reliably.

1.  In your **Vercel Project Dashboard**, go to **Settings** -> **Domains**.
2.  Enter `bhola-yadav.com.np` and click **Add**.
3.  Select the option that says **"Nameservers"** (Recommended).
4.  Vercel will show you two nameservers:
    *   `ns1.vercel-dns.com`
    *   `ns2.vercel-dns.com`

## Phase 3: Update Domain Registrar (Mercantile / register.com.np)
1.  Login to the portal where you bought/registered `bhola-yadav.com.np` (usually [register.com.np](https://register.com.np)).
2.  Find the **"Edit Nameservers"** or **"Update DNS"** section.
3.  **Replace** the existing nameservers with the Vercel ones:
    *   **Primary Name Server**: `ns1.vercel-dns.com`
    *   **Secondary Name Server**: `ns2.vercel-dns.com`
4.  Save changes.

**⏳ Wait Time**: It can take anywhere from **1 to 24 hours** for `.np` domains to propagate (update) globally. Once done, Vercel will automatically issue your SSL certificate and your site will be secure and live!
