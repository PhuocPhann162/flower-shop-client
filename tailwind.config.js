/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "featured-bg":
          "url('https://manh-nextjs-ecommerce.s3.amazonaws.com/1703435371824.jpg')",
      }),
      colors: {
        "main-bg": "#5D3D2E",
        "second-bg": "#E1CFBB",
        "feature-bg": "#F5F5F5",
        "feature1-bg": "#1098ad",
      },
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
