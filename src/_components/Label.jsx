export default function Label({ name, id }) {
    return (
        <label
            htmlFor={id}
            className="text-sm w-1/4 font-medium text-gray500 text-left">
            {name}
        </label>
    );
}
