import * as Yup from "yup";
export const listSchema = {
    name: Yup.string().required("Trường này là bắt buộc"),
    image: Yup.mixed().required("Trường này là bắt buộc"),
    price_type: Yup.string().required("Trường này là bắt buộc"),
};
