import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useEffect, useState } from "react";
import { Label } from "../../../../_components";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { CustomSelect } from "../../../../utils/styled";
import { Button, MenuItem } from "@mui/material";
import {
    getMaterialByIdAPI,
    updateMaterialByIdAPI,
} from "../../../../utils/services/admin.api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { convertFormData } from "../../../../utils/function/function";

const schema = Yup.object().shape({
    part_number: Yup.string().required("Trường này là bắt buộc"),
    large_title: Yup.string().required("Trường này là bắt buộc"),
    small_title: Yup.string().required("Trường này là bắt buộc"),
    basic_price: Yup.number().required("Trường này là bắt buộc"),
    category: Yup.string().required("Trường này là bắt buộc"),
    supplier: Yup.string().required("Trường này là bắt buộc"),
});
export default function AdminMaterialDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
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
    });
    const [isEdit, setIsEdit] = useState(false);
    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        defaultValues: {
            image: state.data.image,
            part_number: state.data.part_number,
            name: state.data.name,
            type: state.data.type,
            large_title: state.data.large_title,
            small_title: state.data.small_title,
            basic_price: state.data.basic_price,
            category: state.data.category,
            supplier: state.data.supplier,
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!id) return;
        getMaterialByIdAPI(id)
            .then((res) => {
                setState((x) => ({
                    ...x,
                    data: {
                        image: res?.data?.image,
                        part_number: res?.data?.part_number,
                        name: res?.data?.name,
                        type: res?.data?.type,
                        large_title: res?.data?.large_title,
                        small_title: res?.data?.small_title,
                        basic_price: res?.data?.basic_price,
                        category: res?.data?.category,
                        supplier: res?.data?.supplier,
                    },
                }));
                reset({
                    image: res?.data?.image,
                    part_number: res?.data?.part_number,
                    name: res?.data?.name,
                    type: res?.data?.type,
                    large_title: res?.data?.large_title,
                    small_title: res?.data?.small_title,
                    basic_price: res?.data?.basic_price,
                    category: res?.data?.category,
                    supplier: res?.data?.supplier,
                });
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
                        data: {
                            image: res?.data?.image,
                            part_number: res?.data?.part_number,
                            name: res?.data?.name,
                            type: res?.data?.type,
                            large_title: res?.data?.large_title,
                            small_title: res?.data?.small_title,
                            basic_price: res?.data?.basic_price,
                            category: res?.data?.category,
                            supplier: res?.data?.supplier,
                        },
                    });
                    toast.success("😊Update success!😊");
                    setIsEdit(false);
                } else {
                    toast.error("😖Update error!😖");
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
        reset(state.data);
        setIsEdit(false);
    };
    return (
        <div className="flex flex-col gap-y-3 w-full h-full min-h-screen">
            <h1 className="text-24 leading-32 text-gray500 font-normal text-left">
                Material Detail
            </h1>
            <div className="rounded-lg w-full shadow-md p-6 txt-body bg-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Image" id="image" />
                            <Controller
                                name="image"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full flex gap-x-4">
                                        <img
                                            alt="image"
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : URL.createObjectURL(
                                                          field.value
                                                      )
                                            }
                                            className="aspect-video w-40 rounded-md shadow-md flex-shrink-0"
                                        />
                                        {isEdit && (
                                            <div className="self-end">
                                                <input
                                                    type="file"
                                                    id="image"
                                                    disabled={!isEdit}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    className="form-item"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Part Number" id="part_number" />
                            <Controller
                                name="part_number"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="part_number"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                        {errors.part_number && (
                            <p className="txt-error">
                                {errors.part_number.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Name" id="name" />
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="name"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Type" id="type" />
                            <Controller
                                name="type"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="type"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Large Title" id="large_title" />
                            <Controller
                                name="large_title"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="large_title"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                        {errors.large_title && (
                            <p className="txt-error">
                                {errors.large_title.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Small Title" id="small_title" />
                            <Controller
                                name="small_title"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="small_title"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                        {errors.small_title && (
                            <p className="txt-error">
                                {errors.small_title.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Small Title" id="small_title" />
                            <Controller
                                name="small_title"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="small_title"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                        {errors.small_title && (
                            <p className="txt-error">
                                {errors.small_title.message}
                            </p>
                        )}
                    </div>{" "}
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Basic Price" id="basic_price" />
                            <Controller
                                name="basic_price"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        disabled={!isEdit}
                                        id="basic_price"
                                        className="form-item w-full"
                                    />
                                )}
                            />
                        </div>
                        {errors.basic_price && (
                            <p className="txt-error">
                                {errors.basic_price.message}
                            </p>
                        )}
                    </div>
                    {/* <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Type" id="price_type" />
                            <Controller
                                name="price_type"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        id="price_type"
                                        value={field.value}
                                        disabled={!isEdit}>
                                        <MenuItem value={"per_quantity"}>
                                            Quantity
                                        </MenuItem>
                                        <MenuItem value={"per_metter"}>
                                            Metter
                                        </MenuItem>
                                    </CustomSelect>
                                )}
                            />
                        </div>
                        {errors.price_type && (
                            <p className="txt-error">
                                {errors.price_type.message}
                            </p>
                        )}
                    </div> */}
                    <div className="w-full flex items-center justify-between mt-8">
                        <div
                            className="flex items-center gap-x-3 cursor-pointer"
                            onClick={() => navigate(-1)}>
                            <KeyboardBackspaceIcon />
                            <span>Back</span>
                        </div>
                        {isEdit ? (
                            <div className="flex gap-x-3 items-center">
                                <Button
                                    variant="contained"
                                    className="!bg-gray500"
                                    onClick={onCancel}>
                                    <span className="txt-button">Cancel</span>
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="!bg-primary">
                                    <span className="txt-button">
                                        {state.loading ? (
                                            <AcUnitIcon className="animate-spin" />
                                        ) : (
                                            "Save"
                                        )}
                                    </span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                className="!bg-primary"
                                onClick={() => setIsEdit(true)}>
                                <span className="txt-button">Edit</span>
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
