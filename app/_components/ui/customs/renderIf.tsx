import { ReactNode } from "react";

type IProps = {
    children: ReactNode;
    isTrue: boolean;
};
const RenderIf = ({ children, isTrue }: IProps) => {
    return isTrue ? children : null;
};
export default RenderIf;
