import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "../../_components";
import { CustomSelect } from "../styled";
import { Button, MenuItem, TextField } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function FormAMC({ schema, fetchFunction }) {
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

    useEffect(() => {
        if (!state.loading) return;
        fetchFunction(state?.data);
    }, [state.loading]);

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
                    {/* <TextField id="standard-basic" sx={{width:100%}} variant="standard" /> */}
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
                                <MenuItem value={"per_metter"}>Metter</MenuItem>
                            </CustomSelect>
                        )}
                    />
                </div>
                {errors.price_type && (
                    <p className="txt-error">{errors.price_type.message}</p>
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
    );
}
