import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef, Ref } from "react";

const CustomInput = forwardRef(
    (
        props: TextFieldProps,
        ref: Ref<HTMLInputElement | HTMLTextAreaElement | null>
    ) => {
        return (
            <TextField
                {...props}
                inputRef={ref}
                sx={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: 4,
                    backgroundColor: "white",
                    "& .MuiInputBase-input ": {
                        padding: "8px 12px",
                    },
                }}
            />
        );
    }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
