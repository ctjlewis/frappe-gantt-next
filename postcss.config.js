module.exports = {
  plugins: {
    /**
     * PostCSS import resolution must come first.
     */
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {})
  },
};
