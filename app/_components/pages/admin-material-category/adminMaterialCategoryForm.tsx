import {
    CreateMaterialCategorySchemaType,
    MaterialCategoryFormType,
    MaterialCategorySchemaType,
} from "@/_components/pages/admin-material-category/adminMaterialCategoryType";
import { ImageInput } from "@/_components/ui/input";
import CustomInput from "@/_components/ui/input/formInput";
import { LabelError, LabelForm } from "@/_components/ui/label";
import CustomSelect from "@/_components/ui/select/formSelect";
import { CategoryInListType } from "@/_types/material";
import { yupResolver } from "@hookform/resolvers/yup";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
    Box,
    Button,
    FormControl,
    FormControlOwnProps,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AnyObject, ObjectSchema } from "yup";
type IProps = {
    schema:
        | ObjectSchema<MaterialCategorySchemaType, AnyObject, unknown, "">
        | ObjectSchema<
              CreateMaterialCategorySchemaType,
              AnyObject,
              unknown,
              ""
          >;
    defaultData: MaterialCategoryFormType;
    loading: boolean;
    onSubmit: (data: MaterialCategoryFormType) => void;
    text: string;
    categoryList?: CategoryInListType[];
};

// css
const formControlStyle: FormControlOwnProps["sx"] = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    "& .css-t1peqf-MuiFormControl-root-MuiTextField-root": {
        maxWidth: "100%",
    },
    "& .css-1ufq8d9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
        maxWidth: "100%",
    },
};
// component
const FormMaterialCategory = ({
    schema,
    defaultData,
    loading,
    onSubmit,
    text,
}: IProps) => {
    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<MaterialCategoryFormType>({
        resolver: yupResolver<
            MaterialCategorySchemaType | CreateMaterialCategorySchemaType
        >(schema),
        defaultValues: defaultData,
    });

    useEffect(() => {
        reset(defaultData);
    }, [defaultData, reset]);
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full">
            {/* Image */}
            <Box className="flex w-full bg-background p-6 items-start justify-center gap-x-6">
                <Box className="mb-4 rounded-md shadow-md aspect-video w-2/5 p-4 bg-white">
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
                                                    typeof field.value ===
                                                    "string"
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
                    {errors.image && (
                        <LabelError message={String(errors?.image?.message)} />
                    )}
                </Box>
                <Box className="flex flex-col p-4 gap-y-4 rounded-md shadow-md bg-white w-2/5">
                    {/*name*/}
                    <Box>
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
                        {errors.name && (
                            <LabelError
                                message={String(errors?.name?.message)}
                            />
                        )}
                    </Box>

                    {/* category */}
                    <Box>
                        <FormControl sx={formControlStyle}>
                            <LabelForm name="Category" id="category" />
                            <Controller
                                name="price_type"
                                control={control}
                                render={({ field }) => (
                                    <CustomSelect
                                        {...field}
                                        id="price_type"
                                        sx={{
                                            maxWidth: "100%",
                                        }}
                                        value={field.value || "per_metter"}
                                        onChange={(
                                            e: SelectChangeEvent<unknown>
                                        ) => field.onChange(e.target.value)}>
                                        <MenuItem
                                            value={"per_metter"}
                                            key={"per_metter"}>
                                            Metter
                                        </MenuItem>
                                        <MenuItem
                                            value={"per_quantity"}
                                            key={"per_quantity"}>
                                            Quantity
                                        </MenuItem>
                                    </CustomSelect>
                                )}
                            />
                        </FormControl>
                    </Box>
                </Box>
            </Box>

            <Box className="w-full flex items-center justify-between mt-8 col-span-3">
                <Link
                    href="/admin/material-category"
                    className="flex items-center gap-x-3 cursor-pointer">
                    <KeyboardBackspaceIcon />
                    <Box component="span">Back</Box>
                </Link>
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
export default FormMaterialCategory;
