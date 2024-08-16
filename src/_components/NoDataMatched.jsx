import React from "react";
import { table } from "src/assets";

export default function NoDataMatched() {
    return (
        <div className="flex  flex-col justify-center items-center w-full h-full">
            <div>
                <img src={table} alt="icon" />
            </div>
            <div className="txt-body text-base text-center">
                No Data matched the given criteria.
            </div>
        </div>
    );
}
