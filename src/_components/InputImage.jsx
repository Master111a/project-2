/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaFolderOpen } from "react-icons/fa6";
export default function InputImage() {
    return (
        <div className="w-full aspect-video p-3">
            <div className="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                <label
                    className="flex flex-col w-full h-full items-center justify-center absolute cursor-pointer"
                    htmlFor="input_image">
                    <FaFolderOpen className="text-blue-700 text-4xl" />
                    <span className="block text-gray-400 font-normal">
                        Attach you image here
                    </span>
                </label>
            </div>
        </div>
    );
}
