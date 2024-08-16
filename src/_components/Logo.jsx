import { Link } from "react-router-dom";
import { LogoPNG } from "src/assets";

export default function Logo() {
    return (
        <Link to={"/"}>
            <div className="flex justify-start items-center w-full pl-6 py-4 bg-white">
                <img src={LogoPNG} alt="logo" className="w-[131px]" />
            </div>
        </Link>
    );
}
