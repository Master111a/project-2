import React from "react";

export default function AMCView({ item }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <h1 className="font-bold text-24">Material Category Information</h1>
            <div className="w-full max-w-[300px] flex justify-center items-center">
                <img
                    alt="image"
                    src={item?.image}
                    className="aspect-video w-full rounded-md shadow-md flex-shrink-0"
                />
            </div>
            <h2 className="text-lg font-semibold text-center">{item?.name}</h2>
            <h4 className="text-sm text-gray-500 font-normal text-center italic">
                Type: {item?.price_type}
            </h4>
        </div>
    );
}
