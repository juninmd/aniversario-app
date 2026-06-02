module.exports = {
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  rules: {
    // Disable console.error in production builds
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // Allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};