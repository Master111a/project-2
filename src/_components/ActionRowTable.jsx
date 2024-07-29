import {
    HiOutlineDotsHorizontal,
    HiOutlineTrash,
    HiOutlinePencilAlt,
    HiOutlineEye,
} from "react-icons/hi";
export default function ActionRowTable({
    dotClick,
    eyeClick,
    pencilClick,
    trashClick,
}) {
    return (
        <div className="flex items-center justify-between px-1.5 max-w-40 text-gray400 text-24">
            <div
                className="w-fit cursor-pointer hidden"
                onClick={() => dotClick()}>
                <HiOutlineDotsHorizontal />
            </div>
            <div className="w-fit cursor-pointer" onClick={() => eyeClick()}>
                <HiOutlineEye />
            </div>
            <div className="w-fit cursor-pointer" onClick={() => pencilClick()}>
                <HiOutlinePencilAlt />
            </div>
            <div className="w-fit cursor-pointer" onClick={() => trashClick()}>
                <HiOutlineTrash />
            </div>
        </div>
    );
}
