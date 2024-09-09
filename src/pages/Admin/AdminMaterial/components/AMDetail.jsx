import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";
import LoaderForm from "_components/LoaderForm";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FMaterrial from "utils/form/FormMaterial";
import { convertFormData } from "utils/function/function";
import {
    getMaterialByIdAPI,
    updateMaterialByIdAPI,
} from "utils/services/admin.api";
import * as Yup from "yup";

const schema = Yup.object().shape({
    part_number: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required("This field is required"),
    large_title: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required(""),
    type: Yup.number().typeError("Type must be a number"),
    small_title: Yup.string()
        .trim()
        .max(255, "The field is too long")
        .required("This field is required"),
    basic_price: Yup.number()
        .moreThan(0, "Basic price must be greater than 0")
        .typeError("Type must be a number")
        .required("This field is required"),
    category: Yup.string()
        .trim()
        .max(255, "The field is too long")
        .required("This field is required"),
    supplier: Yup.string()
        .trim()
        .max(255, "The field is too long")
        .required("This field is required"),
});
export default function AdminMaterialDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
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
    }, [id]);

    useEffect(() => {
        if (!state.loading) return;
        updateMaterialByIdAPI(id, state?.data)
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        loading: false,
                        error: false,
                        data: convertStateData(res?.data),
                    });
                    toast.success("Update success!😊");
                    navigate("/admin/material");
                } else {
                    setState((x) => ({ ...x, loading: false, error: true }));
                    toast.error("Update error!😖");
                }
            })
            .catch(() => {
                setState((x) => ({ ...x, loading: false, error: true }));
                toast.error("Update error!😖");
            });
    }, [id, state.loading, state?.data, dispatch, navigate]);

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
                Material Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                {!state.error ? (
                    <FMaterrial
                        schema={schema}
                        defaultData={state}
                        loading={state.loading}
                        fileInputRef={fileInputRef}
                        onSubmit={onSubmit}
                        text={"Edit"}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <LoaderForm />
                        <div className="flex items-center justify-center gap-x-3">
                            <div
                                className="flex items-center gap-x-3 cursor-pointer"
                                onClick={() => navigate("/admin/material")}>
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
        </div>
    );
}
