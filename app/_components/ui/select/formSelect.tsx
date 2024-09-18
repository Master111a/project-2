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
                    backgroundColor: "white",
                    "& .MuiSelect-select": {
                        padding: "8px 12px",
                        border: "1px solid #CBD5E1",
                    },
                }}
            />
        );
    }
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
