/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            width: {
                25: "6.25rem",
                131: "131px",
                "18%": "18%",
                "4/15": "26.666667%",
            },
            height: {
                36: "36px",
            },
            colors: {
                background: "#F1F5F9",
                text: "#64748B",
                gray100: "#F1F5F9",
                gray200: "#E2E8F0",
                gray300: "#CBD5E1",
                gray400: "#94A3B8",
                gray500: "#64748B",
                gray600: "#475569",
                primary: "#0EA5E9",
                green500: "#22C55E",
                red500: "#EF4444",
            },
            fontFamily: {
                nunito: ["Nunito Sans", "sans-serif"],
            },
            lineHeight: {
                18: "18px",
                32: "32px",
                40: "40px",
            },
            fontSize: {
                12: "12px",
                24: "24px",
                36: "36px",
                40: "40px",
            },
            boxShadow: {},
            padding: {
                1.5: "0.375rem",
            },
        },
    },
    plugins: [],
};
