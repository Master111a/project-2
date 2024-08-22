/* eslint-disable react/prop-types */
export default function Label({ name, id }) {
    return (
        <label
            htmlFor={id}
            className="text-sm w-1/4 max-w-[200px] font-medium text-gray500 text-left">
            {name}
        </label>
    );
}
