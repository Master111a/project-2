import * as Yup from "yup";
export const materialCategorySchema = Yup.object().shape({
    name: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required("This field is required"),
});
export const createMaterialCategorySchema = Yup.object().shape({
    name: Yup.string()
        .max(255, "The field is too long")
        .trim()
        .required("This field is required"),
    image: Yup.mixed().required("This field is required"),
});
