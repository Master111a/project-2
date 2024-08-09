import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { createMaterialAPI } from "../../../../utils/services/admin.api";
import { useDispatch, useSelector } from "react-redux";
import { setGetMaterial } from "../../../../utils/store/admin.slice";
import FormMaterial from "../../../../utils/form/FormMaterial";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
    part_number: Yup.string()
        .max(255, "Quá dài")
        .required("Trường này là bắt buộc"),
    large_title: Yup.string()
        .max(255, "Quá dài")
        .required("Trường này là bắt buộc"),
    type: Yup.number(),
    small_title: Yup.string()
        .max(255, "Quá dài")
        .required("Trường này là bắt buộc"),
    basic_price: Yup.number().required("Trường này là bắt buộc"),
    category: Yup.string()
        .max(255, "Quá dài")
        .required("Trường này là bắt buộc"),
    supplier: Yup.string()
        .max(255, "Quá dài")
        .required("Trường này là bắt buộc"),
});

export default function AdminMaterialCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getMaterial = useSelector((state) => state.admin.getMaterial);
    const { reset } = useForm({
        resolver: yupResolver(schema),
    });

    const defaultData = {
        loading: false,
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
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!state.loading) return;
        createMC(state?.data);
    }, [state.loading]);

    const createMC = async (data) => {
        const res = await createMaterialAPI(data);
        try {
            if (res?.status === 201) {
                toast.success("Create success! 😊");
                setState(defaultData);
                dispatch(setGetMaterial(!getMaterial));
                navigate("/admin/material");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error("Create error! 😟");
                setState((x) => ({ ...x, loading: false }));
            }
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
                <FormMaterial
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
