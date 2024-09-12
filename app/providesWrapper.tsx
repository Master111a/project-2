import { ReactNode } from "react";

export default function ProvidersWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}
