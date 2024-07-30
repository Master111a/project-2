import { forwardRef, useEffect, useState, useRef } from "react";
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
    image: Yup.mixed().required("Trường này là bắt buộc"),
    name: Yup.string().required("Trường này là bắt buộc"),
    price_type: Yup.string().required("Trường này là bắt buộc"),
});

export default function AMCCreate() {
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
            name: "",
            price_type: "per_quantity",
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
                        {errors.image && (
                            <p className="txt-error">{errors.image.message}</p>
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
                        {errors.name && (
                            <p className="txt-error">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <div className="flex items-center">
                            <Label name="Type" id="price_type" />
                            <Controller
                                name="price_type"
                                control={control}
                                defaultValue={defaultData.data.price_type}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        id="price_type"
                                        value={field.value}>
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
