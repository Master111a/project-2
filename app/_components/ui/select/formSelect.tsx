import { Select, SelectProps } from "@mui/material";
import { forwardRef, Ref } from "react";

const CustomSelect = forwardRef(
    (
        props: SelectProps,
        ref: Ref<HTMLSelectElement | HTMLTextAreaElement | null>
    ) => {
        return (
            <Select
                {...props}
                ref={ref}
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

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
