import { Button } from "@mui/material";
import LoaderForm from "_components/LoaderForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FMaterrial from "utils/form/FormMaterial";
import { createMaterialAPI } from "utils/services/admin.api";
import * as Yup from "yup";

const schema = Yup.object().shape({
    part_number: Yup.string()
        .max(255, "The field is too long")
        .required("This field is required"),
    large_title: Yup.string()
        .max(255, "The field is too long")
        .required("This field is required"),
    type: Yup.number().typeError("Type must be a number"),
    small_title: Yup.string()
        .max(255, "The field is too long")
        .required("This field is required"),
    basic_price: Yup.number()
        .moreThan(0, "Basic price must be greater than 0")
        .typeError("Basic price must be a number")
        .required("This field is required"),
    category: Yup.string()
        .max(255, "The field is too long")
        .required("This field is required"),
    supplier: Yup.string()
        .max(255, "The field is too long")
        .required("This field is required"),
});

export default function AdminMaterialCreate() {
    const navigate = useNavigate();
    const defaultData = {
        loading: false,
        error: false,
        data: {
            image: "",
            part_number: "",
            name: "",
            type: 0,
            large_title: "",
            small_title: "",
            basic_price: 0,
            category: "",
            supplier: "",
        },
    };

    const [state, setState] = useState(defaultData);

    useEffect(() => {
        if (!state.loading) return;
        createMaterialAPI(state?.data)
            .then(() => {
                toast.success("Create success! 😊");
                navigate("/admin/material");
            })
            .catch(() => {
                setState((x) => ({ ...x, error: true }));
                toast.error("Create error! 😟");
            })
            .finally(() => {
                setState((x) => ({ ...x, loading: false }));
            });
    }, [navigate, state?.data, state.loading]);

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
                Create Material
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FMaterrial
                        schema={schema}
                        defaultData={defaultData}
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
