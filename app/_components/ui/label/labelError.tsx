type IProps = {
    message: string;
};

export default function LabelError({ message }: IProps) {
    return <p className="txt-error">{message || null}</p>;
}
