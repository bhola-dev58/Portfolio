# Certificates Folder (`src/assets/certificates/`)

Place your certificate PDFs and images in this directory to serve them securely via Vercel.

### How to add a new certificate:
1. Save your certificate file in this directory (e.g. `aws_cert.pdf`, `prasunet_internship.pdf`, `edunet_internship.pdf`).
2. Import the certificate file in `src/lib/initialData.ts`:
   ```ts
   import awsCertPdf from "@/assets/certificates/aws_cert.pdf";
   ```
3. Set the `url` or `internship_url` field to `awsCertPdf`:
   ```ts
   url: awsCertPdf
   ```

Vite and Vercel will automatically package your certificate files with full security, fast CDN hosting, and zero cost!
