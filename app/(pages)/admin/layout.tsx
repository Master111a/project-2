import AdminLayout from "@/_components/layouts/admin/adminLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en">
            <AdminLayout>{children}</AdminLayout>
        </div>
    );
}
