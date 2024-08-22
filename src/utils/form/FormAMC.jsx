/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, MenuItem } from "@mui/material";
import { Label } from "_components";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomInput, CustomSelect } from "utils/styled";

export default function FormAMC({
    schema,
    defaultData,
    loading,
    onSubmit,
    text,
}) {
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            image: defaultData?.image || "",
            name: defaultData?.name || "",
            price_type: defaultData?.price_type || "per_quantity",
        },
    });

    useEffect(() => {
        reset(defaultData);
    }, [defaultData, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full">
                <div className="flex items-center">
                    <Label name="Image" id="image" />
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <div className="w-full flex gap-x-4">
                                {field.value && (
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
                                )}
                                <CustomInput
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={(e) =>
                                        field.onChange(e.target.files[0])
                                    }
                                    label=""
                                    variant="outlined"
                                    ref={field.ref}
                                />
                            </div>
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
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <CustomInput
                                {...field}
                                value={field.value}
                                id="name"
                                label=""
                                variant="outlined"
                            />
                        )}
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
            <div className="w-full flex items-center justify-between mt-8">
                <div
                    className="flex items-center gap-x-3 cursor-pointer"
                    onClick={() => navigate("/admin/material-categories")}>
                    <KeyboardBackspaceIcon />
                    <span>Back</span>
                </div>
                <div className="flex gap-x-3 items-center">
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        className="!bg-primary">
                        <span className="txt-button">
                            {loading ? (
                                <AcUnitIcon className="animate-spin" />
                            ) : (
                                text
                            )}
                        </span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
