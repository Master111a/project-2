import { Loading2 } from "src/assets";

export default function LoaderForm() {
    return (
        <div className="w-full max-w-[25%] rounded-lg overflow-hidden">
            <img
                className="w-full aspect-square object-cover object-center"
                src={Loading2}
                alt=""
            />
        </div>
    );
}
