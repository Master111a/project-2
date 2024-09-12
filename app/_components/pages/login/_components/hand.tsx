import { Fragment } from "react";
// @mui
import { Box } from "@mui/material";
const Hand = () => {
    return (
        <Fragment>
            <Box
                className="w-10 h-7.5 rounded-50 shadow-hand bg-black m-[5px] absolute top-70 -left-25"
                sx={{
                    "&:before": {
                        content: '""',
                        width: "40px",
                        height: "30px",
                        borderRadius: "50px",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.15)",
                        position: "absolute",
                        top: "26px",
                        left: "-5px",
                        bgcolor: "#000",
                        margin: "5px",
                    },
                    "&:after": {
                        content: '""',
                        width: "40px",
                        height: "30px",
                        borderRadius: "50px",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.15)",
                        position: "absolute",
                        top: "11px",
                        left: "-5px",
                        bgcolor: "#000",
                        margin: "5px",
                    },
                }}
            />
            <Box
                className="w-10 h-7.5 rounded-50 shadow-hand bg-black m-[5px] absolute top-70 -right-25"
                sx={{
                    "&:before": {
                        content: '""',
                        width: "40px",
                        height: "30px",
                        borderRadius: "50px",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.15)",
                        position: "absolute",
                        top: "26px",
                        right: "-5px",
                        bgcolor: "#000",
                        margin: "5px",
                    },
                    "&:after": {
                        content: '""',
                        width: "40px",
                        height: "30px",
                        borderRadius: "50px",
                        boxShadow: "0 2px 3px rgba(0, 0, 0, 0.15)",
                        position: "absolute",
                        top: "11px",
                        right: "-5px",
                        bgcolor: "#000",
                        margin: "5px",
                    },
                }}
            />
        </Fragment>
    );
};
export default Hand;
