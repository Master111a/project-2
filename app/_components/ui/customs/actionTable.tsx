import {
    HiOutlineEye,
    HiOutlinePencilAlt,
    HiOutlineTrash,
} from "react-icons/hi";

interface ActionTableProps {
    eyeClick: () => void;
    pencilClick: () => void;
    trashClick: () => void;
}

export default function ActionTable({
    eyeClick,
    pencilClick,
    trashClick,
}: ActionTableProps) {
    return (
        <div className="flex items-center justify-center px-1.5 max-w-40 text-gray400 text-24 gap-x-2">
            <div className="w-fit cursor-pointer" onClick={() => eyeClick()}>
                <HiOutlineEye />
            </div>
            <div
                className="w-fit text-blue-500 cursor-pointer"
                onClick={() => pencilClick()}>
                <HiOutlinePencilAlt />
            </div>
            <div
                className="w-fit text-red-500 cursor-pointer"
                onClick={() => trashClick()}>
                <HiOutlineTrash />
            </div>
        </div>
    );
}
