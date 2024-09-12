import MaterialLayout from "@/_components/layouts/admin/material/materialLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MaterialLayout>{children}</MaterialLayout>;
}
