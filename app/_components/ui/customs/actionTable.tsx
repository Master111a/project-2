import { Box } from "@mui/material";
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
        <Box className="flex items-center justify-center px-1.5 w-full text-gray400 text-24 gap-x-4">
            <Box className="w-fit cursor-pointer" onClick={() => eyeClick()}>
                <HiOutlineEye />
            </Box>
            <Box
                className="w-fit text-blue-500 cursor-pointer"
                onClick={() => pencilClick()}>
                <HiOutlinePencilAlt />
            </Box>
            <Box
                className="w-fit text-red-500 cursor-pointer"
                onClick={() => trashClick()}>
                <HiOutlineTrash />
            </Box>
        </Box>
    );
}
