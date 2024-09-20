"use client";

import FormMaterialCategory from "@/_components/pages/admin-material-category/adminMaterialCategoryForm";
import { materialCategorySchema } from "@/_components/pages/admin-material-category/adminMaterialCategorySchema";
import { MaterialCategoryFormType } from "@/_components/pages/admin-material-category/adminMaterialCategoryType";

import { Loader } from "@/_components/ui/customs";
import { ROUTER_API } from "@/_routers";
import { getAPI, putAPI } from "@/_utils/axios";
import { convertFormData } from "@/_utils/convertData";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type StateType = {
    loading: boolean;
    error: boolean;
    data: MaterialCategoryFormType | FormData;
};
const defaultData: StateType = {
    loading: false,
    error: false,
    data: {
        id: "",
        name: "",
        price_type: "",
        image: "",
    },
};
const convertStateData = (data: MaterialCategoryFormType) => {
    return {
        image: data?.image,
        name: data?.name,
        price_type: data?.price_type,
    };
};
export default function DetailMaterialCategory({ id }: { id: string }) {
    const router = useRouter();
    useEffect(() => {
        getAPI(ROUTER_API.materialCategory + "/" + id)
            .then((res) =>
                setState((x) => ({ ...x, data: convertStateData(res) }))
            )
            .catch(() => setState((x) => ({ ...x, error: true })));
    }, [id]);

    const [state, setState] = useState<StateType>(defaultData);
    const onSubmit = (data: MaterialCategoryFormType) => {
        const formData = convertFormData(data);
        setState({
            loading: true,
            error: false,
            data: formData,
        });
    };

    useEffect(() => {
        if (!state.loading) return;
        putAPI([ROUTER_API.materialCategory + "/" + id, { data: state?.data }])
            .then((res) => {
                setState({
                    loading: false,
                    error: false,
                    data: convertStateData(res?.data),
                });
                router.push("/admin/material-category");
                toast.success("Update success!😊");
            })
            .catch(() => {
                setState((x) => ({ ...x, loading: false, error: true }));
                toast.error("Update error!😖");
            });
    }, [id, state.loading, state?.data, router]);

    return (
        <Box className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FormMaterialCategory
                        schema={materialCategorySchema}
                        defaultData={state.data as MaterialCategoryFormType}
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
                                onClick={() => onSubmit(state.data as MaterialCategoryFormType)}>
                                Retry
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
