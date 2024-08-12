import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import {
    getMaterialCategoryByIdAPI,
    updateMaterialCategoryByIdAPI,
} from "../../../../utils/services/admin.api";
import { useNavigate, useParams } from "react-router-dom";
import { convertFormData } from "../../../../utils/function/function";
import FormAMC from "../../../../utils/form/FormAMC";
import { useForm } from "react-hook-form";

const schema = Yup.object().shape({
    image: Yup.mixed().required("Image is require"),
    name: Yup.string()
        .max(255, "The maximum length of the string is 255")
        .required("Name is require"),
    price_type: Yup.string().required("Type is require"),
});
export default function AMCEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        data: {
            image: "",
            name: "",
            price_type: "per_quantity",
        },
    });
    const { reset } = useForm({
        resolver: yupResolver(schema),
    });
    const fileInputRef = useRef(null);

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
            .catch((err) => {
                console.log(err);
            });
    }, [id, state.loading, state?.data]);

    const onSubmit = (data) => {
        const formData = convertFormData(data);
        setState({
            loading: true,
            data: formData,
        });
    };
    const onCancel = () => {
        setState((x) => ({ ...x, loading: false }));
        navigate("/admin/material-categories");
    };
    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Category Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                <FormAMC
                    schema={schema}
                    defaultData={state}
                    loading={state.loading}
                    fileInputRef={fileInputRef}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    text={"Edit"}
                />
            </div>
        </div>
    );
}
