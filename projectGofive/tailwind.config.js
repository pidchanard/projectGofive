/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}", // ✅ ให้ Tailwind ใช้งานใน Angular
      "./node_modules/flowbite/**/*.js" // ✅ ให้ Flowbite ใช้งาน
    ],
    theme: {
      extend: {},
      colors: {
        customBlueGray: "#EFF4FA",
      },
    },
    plugins: [require("daisyui")], // ✅ เพิ่ม DaisyUI เข้าไป
  }
  