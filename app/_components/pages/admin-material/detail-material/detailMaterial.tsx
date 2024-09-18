"use client";

import FormMaterial from "@/_components/pages/admin-material/adminMaterialForm";
import { materialSchema } from "@/_components/pages/admin-material/adminMaterialSchema";
import { Loader } from "@/_components/ui/customs";
import { ROUTER_API } from "@/_routers";
import { MaterialType } from "@/_types/material";
import { getAPI } from "@/_utils/axios";
import { convertFormData } from "@/_utils/convertData";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
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
    const onSubmit = (data: []) => {
        const formData = convertFormData(data);
        setState({
            loading: true,
            error: false,
            data: formData,
        });
    };
    return (
        <Box className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FormMaterial
                        schema={materialSchema}
                        defaultData={state.data}
                        loading={state.loading}
                        onSubmit={onSubmit}
                        text={"Edit"}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <Loader />
                        <div className="flex items-center justify-center gap-x-3">
                            <div className="flex items-center gap-x-3 cursor-pointer">
                                <KeyboardBackspaceIcon />
                                <span>Back</span>
                            </div>
                            <Button
                                variant="outlined"
                                onClick={() => onSubmit()}>
                                Retry
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
