// The configuration object is exported as the default export of the module. This means that when this configuration file is imported elsewhere 
// (e.g., in a build script or another configuration file), the exported object will be used as the configuration for Tailwind CSS.

/** @type {import('tailwindcss').Config} */  
export default {
  content: [
    // Content property specifies the files that Tailwind CSS should analyze to generate the final CSS styles. 
    // In this case, it includes the index.html file and all JavaScript and TypeScript files (*.js, *.ts, *.jsx, *.tsx) inside the src directory.
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Theme property allows you to customize the default styles provided by Tailwind CSS. 
    // In this configuration, the extend property is an empty object ({}), indicating that no additional customizations are made to the default theme.
    extend: {},
  },

  // The plugins property allows you to extend Tailwind CSS with additional functionality provided by plugins. 
  // In this case, the plugins array is empty ([]), indicating that no additional plugins are used.
  plugins: [],
}


// To sum it up, the content property tells Tailwind CSS where to look for styles, the theme property allows you to customize styles, 
// the plugins property enables additional functionality, and export default makes this configuration accessible to other parts of your project, 
// allowing them to use Tailwind CSS with this particular configuration.