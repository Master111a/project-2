import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { ChangeEvent } from "react";
type Props = {
    className: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
};

export default function SearchInput({
    className,
    placeholder,
    value,
    onChange,
    onSubmit,
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            className={`${className} flex items-center justify-between w-4/15 max-w-80 rounded-full overflow-hidden border border-background relative`}>
            <SearchIcon
                className="absolute top-0 translate-y-1/4 text-gray-400 left-2 cursor-pointer"
                onClick={() => onSubmit()}
            />
            <input
                type="text"
                className="outline-none pl-10 py-1 w-full bg-transparent"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
        </Box>
    );
}
