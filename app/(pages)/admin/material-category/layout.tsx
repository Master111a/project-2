import MaterialCategoryLayout from "@/_components/layouts/admin/material-category/materialCategoryLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <MaterialCategoryLayout>{children}</MaterialCategoryLayout>;
}
