"use client";

import FormMaterialCategory from "@/_components/pages/admin-material-category/adminMaterialCategoryForm";
import { createMaterialCategorySchema } from "@/_components/pages/admin-material-category/adminMaterialCategorySchema";
import { MaterialCategoryFormType } from "@/_components/pages/admin-material-category/adminMaterialCategoryType";
import { Loader } from "@/_components/ui/customs";
import { ROUTER_API } from "@/_routers";
import { postAPI } from "@/_utils/axios";
import { convertFormData } from "@/_utils/convertData";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button } from "@mui/material";
import Link from "next/link";
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
        image: "",
        name: "",
        price_type: "",
    },
};

export default function CreateMaterialCategory() {
    const router = useRouter();
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
        postAPI([ROUTER_API.materialCategory, { data: state?.data }])
            .then(() => {
                toast.success("Create success!😊");
                router.push("/admin/material-category");
            })
            .catch(() => {
                setState((x) => ({ ...x, loading: false, error: true }));
                toast.error("Create error!😖");
            });
    }, [router, state?.data, state.loading]);

    return (
        <Box className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Create Material Category
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FormMaterialCategory
                        schema={createMaterialCategorySchema}
                        defaultData={defaultData.data}
                        loading={state.loading}
                        onSubmit={onSubmit}
                        text={"Create"}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <Loader />
                        <div className="flex items-center justify-center gap-x-3">
                            <Link
                                href="/admin/material-category"
                                className="flex items-center gap-x-3 cursor-pointer">
                                <KeyboardBackspaceIcon />
                                <span>Back</span>
                            </Link>
                            <Button
                                variant="outlined"
                                onClick={() => onSubmit(state.data)}>
                                Retry
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Box>
    );
}
