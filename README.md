# Personal Portfolio Website

Welcome to my personal portfolio website! This project is a modern, responsive, and interactive web application built to showcase my skills, projects, and professional background. It features a sleek dark mode design, smooth animations, and a user-friendly interface.

## 🚀 Features

- **Modern UI/UX**: Designed with a focus on aesthetics and usability, featuring a default dark mode for visual comfort.
- **Responsive Design**: Fully responsive layout that looks great on devices of all sizes.
- **Interactive Elements**: Includes smooth page transitions, animated backgrounds, and interactive components.
- **Multi-Page Layout**: Dedicated pages for Home, Internship, Projects, About and Contact.
- **Dynamic Content**: Powered by **Supabase** (PostgreSQL) for real-time data fetching (Internship Experience).
- **Admin Dashboard**: Secure admin panel to Add, Edit, and Delete internship experiences dynamically.
- **Authentication**: Secure login for admin access.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend/Database**: Supabase (PostgreSQL, Auth)
- **UI Components**: Shadcn UI, Lucide React

## 📸 Screenshots

### Home Page
![Home Page](src/assets/screenshot%20of%20output/localhost_8080_%20(1).png)

### Internship Page
![Internship Page](src/assets/screenshot%20of%20output/Internship_page.png)

### Projects Page
![Projects Page](src/assets/screenshot%20of%20output/Project.png)

### About Page
![About Page](src/assets/screenshot%20of%20output/About_page.png)

### Contact Page
![Contact Page](src/assets/screenshot%20of%20output/contact_page.png)

## 📦 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bhola-dev58/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in your browser:**
    Open [http://localhost:8080](http://localhost:8080) to view the app.

## 🎨 Tailwind CSS Integration

This project is built with **Tailwind CSS** for handling styles. The integration allows for utility-first CSS classes directly in the markup.

**Setup Overview:**
1.  **Installation**: Tailwind and its peer dependencies (PostCSS, Autoprefixer) are installed.
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```
2.  **Configuration**: The `tailwind.config.ts` file is customized to include paths to all template files (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`).
3.  **Directives**: The `src/index.css` file includes the imperative Tailwind directives:
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

## 🔐 Admin Access

To access the admin dashboard:
1.  Navigate to `/admin/login`.
2.  Login with your admin credentials.
3.  Manage your portfolio data entirely from the UI!

## 📂 Project Structure

- `src/pages`: Main page components (Home, About, Projects, Contact, Admin).
- `src/components`: Reusable UI components (Hero, Navbar, Experience, etc.).
- `src/lib`: Utility functions and Supabase configuration.
- `src/assets`: Static assets.

## 🤝 Contributing

Feel free to explore the code! If you have any suggestions or find any bugs, please open an issue or submit a pull request.
