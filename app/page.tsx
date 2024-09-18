"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token") || null;
        if (token) {
            router.push("/admin");
        } else {
            router.push("/login");
        }
    }, [router]);
    return <Fragment></Fragment>;
}
