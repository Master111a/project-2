import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, Select, styled } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { createMaterialCategoryListAPI } from "../../../../utils/services/admin.api";
import { Label } from "../../../../_components";
import { CustomSelect } from "../../../../utils/styled";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGetMC } from "../../../../utils/store/admin.slice";

const schema = Yup.object().shape({
    part_number: Yup.string().required("Trường này là bắt buộc"),
    large_title: Yup.string().required("Trường này là bắt buộc"),
    small_title: Yup.string().required("Trường này là bắt buộc"),
    basic_price: Yup.number().required("Trường này là bắt buộc"),
    category: Yup.string().required("Trường này là bắt buộc"),
    supplier: Yup.string().required("Trường này là bắt buộc"),
});

export default function AdminMaterialCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getMC = useSelector((state) => state.admin.getMC);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
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
        const res = await createMaterialCategoryListAPI(data);
        if (res?.status === 201) {
            toast.success("Create success! 😊");
            setState(defaultData);
            dispatch(setGetMC(!getMC));
            reset(defaultData.data);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } else {
            toast.error("Create error! 😟");
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Image" id="image" />
                            <Controller
                                name="image"
                                control={control}
                                defaultValue={defaultData.data.image}
                                render={({ field }) => (
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={(e) =>
                                            field.onChange(e.target.files[0])
                                        }
                                        className="form-item w-full"
                                        ref={fileInputRef}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Part number" id="part_number" />
                            <input
                                {...register("part_number")}
                                type="text"
                                id="part_number"
                                className="form-item w-full"
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
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className="form-item w-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Type" id="type" />
                            <input
                                {...register("type")}
                                type="number"
                                id="type"
                                className="form-item w-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Large Title" id="large_title" />
                            <input
                                {...register("large_title")}
                                type="text"
                                id="large_title"
                                className="form-item w-full"
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
                            <input
                                {...register("small_title")}
                                type="text"
                                id="small_title"
                                className="form-item w-full"
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
                            <Label name="Basic Price" id="basic_price" />
                            <input
                                {...register("basic_price")}
                                type="number"
                                id="basic_price"
                                className="form-item w-full"
                            />
                        </div>
                        {errors.basic_price && (
                            <p className="txt-error">
                                {errors.basic_price.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Category" id="category" />
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={defaultData.data.category}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        id="category"
                                        value={field.value}>
                                        <MenuItem value={"per_quantity"}>
                                            Quantity
                                        </MenuItem>
                                    </CustomSelect>
                                )}
                            />
                        </div>
                        {errors.category && (
                            <p className="txt-error">
                                {errors.category.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Supplier" id="supplier" />
                            <Controller
                                name="supplier"
                                control={control}
                                defaultValue={defaultData.data.supplier}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        id="supplier"
                                        value={field.value}>
                                        <MenuItem value={"per_quantity"}>
                                            Quantity
                                        </MenuItem>
                                    </CustomSelect>
                                )}
                            />
                        </div>
                        {errors.supplier && (
                            <p className="txt-error">
                                {errors.supplier.message}
                            </p>
                        )}
                    </div>
                    <div className="w-full flex items-center justify-between  mt-8">
                        <div
                            className="flex items-center gap-x-3 cursor-pointer"
                            onClick={() => navigate(-1)}>
                            <KeyboardBackspaceIcon />
                            <span>Back</span>
                        </div>
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
                                        "Create"
                                    )}
                                </span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
