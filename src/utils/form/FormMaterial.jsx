/* eslint-disable react/prop-types */
import { yupResolver } from "@hookform/resolvers/yup";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, MenuItem } from "@mui/material";
import { Label } from "_components";
import { InputImage } from "_components/index";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { convertData } from "utils/function/function";
import withCategories from "utils/hoc/withCategories";
import { getSuplierListAPI } from "utils/services/admin.api";
import { CustomInput, CustomSelect } from "utils/styled";

const FormMaterial = ({
    schema,
    defaultData,
    loading,
    onSubmit,
    text,
    categoryList,
}) => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            image: defaultData.data.image || null,
            part_number: defaultData.data.part_number || "",
            name: defaultData.data.name || "",
            type: defaultData.data.type || 0,
            large_title: defaultData.data.large_title || "",
            small_title: defaultData.data.small_title || "",
            basic_price: defaultData.data.basic_price || 0,
            category: defaultData.data.category || "",
            supplier: defaultData.data.supplier || "",
        },
    });

    useEffect(() => {
        reset(defaultData?.data);
    }, [defaultData?.data, reset]);
    const [supplierList, setSupplierList] = useState();

    useEffect(() => {
        getSuplierListAPI()
            .then((res) => {
                if (res?.status === 200) {
                    setSupplierList(convertData(res?.data?.results));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-x-4">
            <div className="mb-4 h-full w-full bg-background p-6 rounded-md shadow-md">
                <ItemFormWrap>
                    <Label name="Image" id="image" />
                    <Controller
                        name="image"
                        control={control}
                        defaultValue={defaultData.data.image}
                        render={({ field }) => (
                            <div className="w-full">
                                {field.value ? (
                                    <div className="flex flex-col gap-y-4 items-center w-full">
                                        <img
                                            alt="image"
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : URL.createObjectURL(
                                                          field.value
                                                      )
                                            }
                                            className="aspect-video object-cover object-center w-full rounded-md shadow-md flex-shrink-0"
                                        />
                                        <Button variant="outlined">
                                            <label
                                                htmlFor="input_image"
                                                className="w-full h-full">
                                                Change image
                                            </label>
                                        </Button>
                                    </div>
                                ) : (
                                    <InputImage
                                        onChange={(e) =>
                                            field.onChange(e.target.files[0])
                                        }
                                    />
                                )}
                                <input
                                    type="file"
                                    id="input_image"
                                    className="h-full w-full hidden"
                                    accept="image/*"
                                    ref={field.ref}
                                    onChange={(e) =>
                                        field.onChange(e.target.files[0])
                                    }
                                />
                            </div>
                        )}
                    />
                </ItemFormWrap>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 col-span-2 p-6 rounded-md shadow-md bg-background">
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Part number" id="part_number" />
                        <Controller
                            name="part_number"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="part_number"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                    {errors.part_number && (
                        <p className="txt-error">
                            {errors.part_number.message}
                        </p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Name" id="name" />
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="name"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Type" id="type" />
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="type"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                    {errors.type && (
                        <p className="txt-error">{errors.type.message}</p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Large Title" id="large_title" />
                        <Controller
                            name="large_title"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="large_title"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                    {errors.large_title && (
                        <p className="txt-error">
                            {errors.large_title.message}
                        </p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Small Title" id="small_title" />
                        <Controller
                            name="small_title"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="small_title"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                    {errors.small_title && (
                        <p className="txt-error">
                            {errors.small_title.message}
                        </p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Basic Price" id="basic_price" />
                        <Controller
                            name="basic_price"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }
                                    id="basic_price"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </ItemFormWrap>
                    {errors.basic_price && (
                        <p className="txt-error">
                            {errors.basic_price.message}
                        </p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Category" id="category" />
                        <Controller
                            name="category"
                            control={control}
                            defaultValue={defaultData.data.category}
                            render={({ field }) => (
                                <CustomSelect
                                    {...field}
                                    id="category"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }>
                                    {categoryList?.map((item) => (
                                        <MenuItem value={item.id} key={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            )}
                        />
                    </ItemFormWrap>
                    {errors.category && (
                        <p className="txt-error">{errors.category.message}</p>
                    )}
                </div>
                <div className="mb-4 w-full">
                    <ItemFormWrap>
                        <Label name="Supplier" id="supplier" />
                        <Controller
                            name="supplier"
                            control={control}
                            defaultValue={defaultData.data.supplier}
                            render={({ field }) => (
                                <CustomSelect
                                    {...field}
                                    id="supplier"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value)
                                    }>
                                    {supplierList?.map((item) => (
                                        <MenuItem value={item.id} key={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>
                            )}
                        />
                    </ItemFormWrap>
                    {errors.supplier && (
                        <p className="txt-error">{errors.supplier.message}</p>
                    )}
                </div>
            </div>

            <div className="w-full flex items-center justify-between mt-8 col-span-3">
                <div
                    className="flex items-center gap-x-3 cursor-pointer"
                    onClick={() => navigate("/admin/material")}>
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
};
const ItemFormWrap = ({ children }) => {
    return <div className="flex flex-col items-start">{children}</div>;
};
const FMaterrial = withCategories(FormMaterial);
export default FMaterrial;
