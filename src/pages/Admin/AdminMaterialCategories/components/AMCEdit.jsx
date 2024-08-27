import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import LoaderForm from "_components/LoaderForm";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormAMC from "utils/form/FormAMC";
import { convertFormData } from "utils/function/function";
import {
    getMaterialCategoryByIdAPI,
    updateMaterialCategoryByIdAPI,
} from "utils/services/admin.api";
import * as Yup from "yup";

const schema = Yup.object().shape({
    image: Yup.mixed()
        .test("file-or-string", "Image is require", (value) => {
            return (
                value && (typeof value === "string" || value instanceof File)
            );
        })
        .required("Image is require"),
    name: Yup.string()
        .trim()
        .max(255, "The maximum length of the string is 255")
        .required("Name is require"),
    price_type: Yup.string().required("Type is require").trim(),
});
export default function AMCEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        error: false,
        data: {
            image: "",
            name: "",
            price_type: "per_quantity",
        },
    });
    const { reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!id) return;
        getMaterialCategoryByIdAPI(id)
            .then((res) => {
                setState((x) => ({
                    ...x,
                    data: {
                        image: res?.data?.image,
                        name: res?.data?.name,
                        price_type: res?.data?.price_type,
                    },
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, reset]);

    useEffect(() => {
        if (!state.loading) return;
        updateMaterialCategoryByIdAPI(id, state?.data)
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        loading: false,
                        error: false,
                        data: {
                            image: res?.data?.image,
                            name: res?.data?.name,
                            price_type: res?.data?.price_type,
                        },
                    });
                    toast.success("😊Update success!");
                    navigate("/admin/material-categories");
                } else {
                    setState((x) => ({ ...x, loading: false }));
                    toast.error("😖Update error!");
                }
            })
            .catch(() => {
                toast.error("😖Update error!😖");
                setState((x) => ({ ...x, error: true }));
            })
            .finally(() => {
                setState((x) => ({ ...x, loading: false }));
            });
    }, [id, state.loading, state?.data, navigate]);

    const onSubmit = (data) => {
        const formData = convertFormData(data);
        setState({
            loading: true,
            error: false,
            data: formData,
        });
    };

    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Category Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FormAMC
                        schema={schema}
                        defaultData={state.data}
                        loading={state.loading}
                        onSubmit={onSubmit}
                        text={"Edit"}
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
