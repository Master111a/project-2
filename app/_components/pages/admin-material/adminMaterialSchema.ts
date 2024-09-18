import * as Yup from "yup";
export const materialSchema = Yup.object().shape({
    part_number: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required("This field is required"),
    large_title: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required("This field is required"),
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
