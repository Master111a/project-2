import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormAMC from "utils/form/FormAMC";
import { createMaterialCategoryListAPI } from "utils/services/admin.api";
import { setGetMC } from "utils/store/admin.slice";
import * as Yup from "yup";

const schema = Yup.object().shape({
    image: Yup.mixed().required("Trường này là bắt buộc"),
    name: Yup.string().required("Trường này là bắt buộc"),
    price_type: Yup.string().required("Trường này là bắt buộc"),
});

export default function AMCCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getMC = useSelector((state) => state.admin.getMC);

    const defaultData = {
        loading: false,
        data: {
            image: "",
            name: "",
            price_type: "per_quantity",
        },
    };
    const [state, setState] = useState(defaultData);
    const { reset } = useForm({
        resolver: yupResolver(schema),
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!state.loading) return;
        createMC(state?.data);
    }, [state.loading]);

    const createMC = async (data) => {
        try {
            await createMaterialCategoryListAPI(data)
                .then((res) => {
                    toast.success("Create success! 😊");
                    setState(defaultData);
                    dispatch(setGetMC(!getMC));
                    reset(defaultData.data);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    navigate("/admin/material-categories");
                })
                .catch(() => {
                    toast.error("Create error! 😟");
                    setState((x) => ({ ...x, loading: false }));
                });
        } catch (error) {
            toast.error("Create error! 😟");
            setState((x) => ({ ...x, loading: false }));
        }
    };

    const onSubmit = (data) => {
        setState({
            loading: true,
            data: data,
        });
    };

    const onCancel = () => {
        setState(defaultData);
        reset(defaultData.data);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Create Material Category
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                <FormAMC
                    schema={schema}
                    defaultData={defaultData}
                    loading={state.loading}
                    fileInputRef={fileInputRef}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    text={"Create"}
                />
            </div>
        </div>
    );
}
