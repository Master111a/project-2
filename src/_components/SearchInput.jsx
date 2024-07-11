import SearchIcon from "@mui/icons-material/Search";

export default function SearchInput({ className, placeholder = "" }) {
    return (
        <div
            className={`${className} flex items-center justify-between w-4/15 max-w-80 rounded-full overflow-hidden border border-background relative`}>
            <SearchIcon className="absolute top-0 translate-y-1/4 text-gray-400 left-2" />
            <input
                type="text"
                className="outline-none pl-10 py-1 w-full bg-transparent"
                placeholder={placeholder}
            />
        </div>
    );
}
