"use client";

import { ROUTER_API } from "@/_routers";
import { MaterialType } from "@/_types/material";
import { getAPI } from "@/_utils/axios";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
type StateType = {
    loading: boolean;
    error: boolean;
    data: MaterialType;
};
const defaultData: StateType = {
    loading: false,
    error: false,
    data: {
        id: "",
        image: "",
        part_number: "",
        name: "",
        type: 0,
        large_title: "",
        small_title: "",
        basic_price: 0,
        category: [],
        supplier: [],
    },
};
export default function DetailMaterial({ id }: { id: string }) {
    useEffect(() => {
        getAPI(ROUTER_API.material + "/" + id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, [id]);
    const [state, setState] = useState<StateType>(defaultData);
    const convertStateData = (data: MaterialType) => {
        return {
            image: data?.image,
            part_number: data?.part_number,
            name: data?.name,
            type: data?.type,
            large_title: data?.large_title,
            small_title: data?.small_title,
            basic_price: data?.basic_price,
            category: data?.category,
            supplier: data?.supplier,
        };
    };
    const fileInputRef = useRef(null);
    return (
        <Box className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Detail
            </h1>
        </Box>
    );
}
