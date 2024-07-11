/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                131: "131px",
                "18%": "18%",
                "4/15": "26.666667%",
            },
            height: {},
            colors: {
                background: "#F1F5F9",
                text: "#64748B",
                primary: "#0EA5E9",
            },
        },
    },
    plugins: [],
};
