import Login from "@/_components/pages/login/login";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Login with laravel Nova",
    description: "",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.login,
    },
};
export default function LoginPage() {
    return <Login />;
}
