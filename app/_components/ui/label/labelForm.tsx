type IProps = {
    name: string;
    id: string;
};
export default function LabelForm({ name, id }: IProps) {
    return (
        <label
            htmlFor={id}
            className="text-sm w-1/4 max-w-[200px] font-medium text-gray500 text-left">
            {name}
        </label>
    );
}
