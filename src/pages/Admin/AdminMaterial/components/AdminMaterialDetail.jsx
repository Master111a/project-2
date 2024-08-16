import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormMaterial from "utils/form/FormMaterial";
import { convertFormData } from "utils/function/function";
import {
    getMaterialByIdAPI,
    updateMaterialByIdAPI,
} from "utils/services/admin.api";
import { setGetMaterial } from "utils/store/admin.slice";
import * as Yup from "yup";

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
export default function AdminMaterialDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getMaterial = useSelector((state) => state.admin.getMaterial);

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
    const convertStateData = (data) => {
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

    const [state, setState] = useState(defaultData);
    const fileInputRef = useRef(null);

    const { reset } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!id) return;
        getMaterialByIdAPI(id)
            .then((res) => {
                setState((x) => ({
                    ...x,
                    data: convertStateData(res?.data),
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, reset]);

    useEffect(() => {
        if (!state.loading) return;
        updateMaterialByIdAPI(id, state?.data)
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        loading: false,
                        data: convertStateData(res?.data),
                    });
                    dispatch(setGetMaterial(!getMaterial));
                    toast.success("😊Update success!😊");
                    navigate("/admin/material");
                } else {
                    setState((x) => ({ ...x, loading: false }));
                    toast.error("😖Update error!😖");
                }
            })
            .catch((err) => {
                setState((x) => ({ ...x, loading: false }));
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
        navigate("/admin/material");
    };
    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                <FormMaterial
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
