import { ImageInput } from "@/_components/ui/input";
import CustomInput from "@/_components/ui/input/formInput";
import { LabelError, LabelForm } from "@/_components/ui/label";
import withCategories from "@/_hoc/withCategories";
import { CategoryInListType, MaterialType } from "@/_types/material";
import { yupResolver } from "@hookform/resolvers/yup";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, FormControl, FormControlOwnProps } from "@mui/material";
import { ChangeEvent } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { AnyObject, ObjectSchema } from "yup";
type IProps = {
    schema: ObjectSchema<FieldValues, AnyObject>;
    defaultData: MaterialType;
    loading: boolean;
    onSubmit: (data: []) => void;
    text: string;
    categoryList: CategoryInListType[];
};

// css
const formControlStyle: FormControlOwnProps["sx"] = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
};
// component
const FMaterial = ({
    schema,
    defaultData,
    loading,
    onSubmit,
    text,
    categoryList,
}: IProps) => {
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-3 gap-x-4">
            {/* Image */}
            <Box className="mb-4 h-full w-full bg-background p-6 rounded-md shadow-md">
                <FormControl sx={formControlStyle}>
                    <LabelForm name="Image" id="image" />
                    <Controller
                        name="image"
                        control={control}
                        defaultValue={defaultData.image}
                        render={({ field }) => (
                            <Box className="w-full">
                                {field.value ? (
                                    <Box className="flex flex-col gap-y-4 items-center w-full">
                                        <Box
                                            component="img"
                                            alt="image"
                                            src={
                                                typeof field.value === "string"
                                                    ? field.value
                                                    : URL.createObjectURL(
                                                          field.value
                                                      )
                                            }
                                        />
                                        <Button variant="outlined">
                                            <Box
                                                component="label"
                                                htmlFor="input_image"
                                                className="w-full h-full">
                                                Change image
                                            </Box>
                                        </Button>
                                    </Box>
                                ) : (
                                    <ImageInput />
                                )}
                                <input
                                    type="file"
                                    id="input_image"
                                    className="h-full w-full hidden"
                                    accept="image/*"
                                    ref={field.ref}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        const file = e.target.files
                                            ? e.target.files[0]
                                            : null;
                                        if (file) {
                                            field.onChange(file);
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    />
                </FormControl>
            </Box>
            <Box className="grid grid-cols-2 gap-x-6 gap-y-4 col-span-2 p-6 rounded-md shadow-md bg-background">
                {/*part_number*/}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Part number" id="part_number" />
                        <Controller
                            name="part_number"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="part_number"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.part_number && (
                        <LabelError
                            message={String(errors.part_number.message)}
                        />
                    )}
                </Box>
                {/*name*/}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Name" id="name" />
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="name"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                </Box>
                {/* type */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Type" id="type" />
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="type"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.type && (
                        <LabelError message={String(errors.type.message)} />
                    )}
                </Box>
                {/* large_title */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Large Title" id="large_title" />
                        <Controller
                            name="large_title"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="large_title"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.large_title && (
                        <LabelError
                            message={String(errors.large_title.message)}
                        />
                    )}
                </Box>
                {/* small_title */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Small Title" id="small_title" />
                        <Controller
                            name="small_title"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="small_title"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.small_title && (
                        <LabelError
                            message={String(errors.small_title.message)}
                        />
                    )}
                </Box>
                {/* basic price */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Basic Price" id="basic_price" />
                        <Controller
                            name="basic_price"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    type="number"
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="basic_price"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.basic_price && (
                        <LabelError
                            message={String(errors.basic_price.message)}
                        />
                    )}
                </Box>
                {/* category */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Category" id="category" />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="category"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.category && (
                        <LabelError message={String(errors.category.message)} />
                    )}
                </Box>
                {/* supplier */}
                <Box className="mb-4">
                    <FormControl sx={formControlStyle}>
                        <LabelForm name="Basic Price" id="supplier" />
                        <Controller
                            name="supplier"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(
                                        e: ChangeEvent<
                                            | HTMLInputElement
                                            | HTMLTextAreaElement
                                        >
                                    ) => field.onChange(e.target.value)}
                                    id="supplier"
                                    label=""
                                    variant="outlined"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.supplier && (
                        <LabelError message={String(errors.supplier.message)} />
                    )}
                </Box>
            </Box>
            <Box className="w-full flex items-center justify-between mt-8 col-span-3">
                <Box className="flex items-center gap-x-3 cursor-pointer">
                    <KeyboardBackspaceIcon />
                    <Box component="span">Back</Box>
                </Box>
                <Box className="flex gap-x-3 items-center">
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        className="!bg-primary">
                        <Box component="span" className="txt-button">
                            {loading ? (
                                <AcUnitIcon className="animate-spin" />
                            ) : (
                                text
                            )}
                        </Box>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
const FormMaterial = withCategories(FMaterial);
export default FormMaterial;
