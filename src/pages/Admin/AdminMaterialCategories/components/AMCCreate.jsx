import { Button } from "@mui/material";
import LoaderForm from "_components/LoaderForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormAMC from "utils/form/FormAMC";
import { createMaterialCategoryListAPI } from "utils/services/admin.api";
import * as Yup from "yup";

const schema = Yup.object().shape({
    image: Yup.mixed()
        .test("file-or-string", "Image is require", (value) => {
            return (
                value && (typeof value === "string" || value instanceof File)
            );
        })
        .required("Image is require"),
    name: Yup.string().trim().required("Name is require"),
    price_type: Yup.string().trim().required("Price type is require"),
});

export default function AMCCreate() {
    const navigate = useNavigate();
    const defaultData = {
        image: "",
        name: "",
        price_type: "per_quantity",
    };
    const [state, setState] = useState({
        loading: false,
        error: false,
        data: defaultData,
    });

    useEffect(() => {
        if (!state.loading) return;
        createMaterialCategoryListAPI(state?.data)
            .then(() => {
                toast.success("Create success! 😊");
                navigate("/admin/material-categories");
            })
            .catch(() => {
                setState((x) => ({ ...x, error: true }));
                toast.error("Create error! 😟");
            })
            .finally(() => {
                setState((x) => ({ ...x, loading: false }));
            });
    }, [state.data, state.loading, navigate]);

    const onSubmit = (data) => {
        setState({
            loading: true,
            error: false,
            data: data,
        });
    };

    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Create Material Category
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FormAMC
                        schema={schema}
                        defaultData={state.data}
                        loading={state.loading}
                        onSubmit={onSubmit}
                        text={"Create"}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <LoaderForm />
                        <Button variant="outlined" onClick={() => onSubmit()}>
                            Retry
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
