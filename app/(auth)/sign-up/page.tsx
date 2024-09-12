import SignUp from "@/_components/pages/signup/signup";
import { ROUTER } from "@/_routers";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Đăng ký tài khoản tại Wonderland",
    description: "",
    openGraph: {
        type: "website",
        locale: "vn_VN",
        url: ROUTER.signUp,
    },
};
export default function SignUpPage() {
    return <SignUp />;
}
