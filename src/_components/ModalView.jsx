import { useState } from "react";

export default function ModalView({ open = false, setOpen, children }) {
    return (
        <div
            className={`${
                open ? "fixed" : "hidden"
            } top-0 bottom-0 right-0 left-0 bg-black/40 flex items-center justify-center z-50`}
            onClick={setOpen}>
            <div
                className="min-w-[450px] h-[350px] bg-white rounded-md overflow-hidden shadow-md p-4"
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
