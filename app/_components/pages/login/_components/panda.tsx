// @mui
import { Box } from "@mui/material";
// type
import { SizeProps } from "../loginType";
type PandaProps = {
    size: SizeProps;
};
const Panda = ({ size }: PandaProps) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "200px",
                margin: "50px auto",
            }}>
            {/* ear */}
            <Box
                sx={{
                    position: "absolute",
                    width: "80px",
                    height: "80px",
                    background: "#000000",
                    zIndex: 5,
                    border: "10px solid #ffffff",
                    left: "-15px",
                    top: "-15px",
                    borderRadius: "9999px",
                    "&:after": {
                        content: '""',
                        left: "140px",
                        position: "absolute",
                        width: "80px",
                        height: "80px",
                        background: "#000000",
                        zIndex: 5,
                        border: "10px solid #ffffff",
                        top: "-12px",
                        borderRadius: "9999px",
                    },
                }}
            />
            {/* face */}
            <Box className="aspect-square w-50 rounded-full z-50 relative bg-white mx-auto my-12.5">
                {/* eye left */}
                <Box className="bg-black w-12.5 h-20 m-2.5 absolute top-8.75 left-25 rotate-220 rounded-eye" />
                <Box className="bg-white w-7.5 aspect-square absolute rounded-full z-[499] left-10 top-20 overflow-hidden">
                    <Box
                        sx={{
                            width: `${size.width}px`,
                            height: `${size.height}px`,
                            position: "absolute",
                            maxWidth: "10px",
                            maxHeight: "10px",
                            transitionDuration: "100ms",
                            top: "20px",
                            left: "20px",
                            "&:after": {
                                content: '""',
                                bgcolor: "#000000",
                                position: "absolute",
                                borderRadius: "9999px",
                                width: "20px",
                                height: "20px",
                                right: 0,
                                bottom: 0,
                            },
                        }}
                    />
                </Box>

                {/* eye right */}
                <Box className="bg-black w-12.5 h-20 m-2.5 absolute top-8.75 left-105 rotate-140 rounded-eye" />
                <Box className="bg-white w-7.5 aspect-square absolute rounded-full z-[499] right-10 top-20 overflow-hidden">
                    <Box
                        sx={{
                            width: `${size.width}px`,
                            height: `${size.height}px`,
                            position: "absolute",
                            maxWidth: "10px",
                            maxHeight: "10px",
                            transitionDuration: "100ms",
                            top: "20px",
                            left: "20px",
                            "&:after": {
                                content: '""',
                                bgcolor: "#000000",
                                position: "absolute",
                                borderRadius: "9999px",
                                width: "20px",
                                height: "20px",
                                right: 0,
                                bottom: 0,
                            },
                        }}
                    />
                </Box>
                {/* nose */}
                <Box className="bg-black w-8.75 h-5 m-auto absolute right-0 left-0 bottom-10 rotate-15 rounded-nose" />
            </Box>
            {/* body */}
            <Box className="bg-white absolute top-200 -left-5 rounded-body w-250 h-306 shadow-body" />
            {/* foot left */}
            <Box
                className="absolute top-400 -left-20 bg-black z-[555] shadow-foot rounded-foot w-21 h-30"
                sx={{
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        width: "55px",
                        height: "65px",
                        bgcolor: "#222222",
                        borderRadius: "9999px",
                        left: 0,
                        right: 0,
                        bottom: "10px",
                        margin: "auto",
                    },
                }}>
                <Box
                    sx={{
                        position: "absolute",
                        width: "25px",
                        height: "35px",
                        bgcolor: "#222222",
                        borderRadius: "9999px",
                        top: "10px",
                        right: "5px",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            width: "20px",
                            height: "35px",
                            bgcolor: "#222222",
                            borderRadius: "9999px",
                            top: "5px",
                            right: "55px",
                        },
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            width: "20px",
                            height: "35px",
                            bgcolor: "#222222",
                            borderRadius: "9999px",
                            top: 0,
                            right: "30px",
                        },
                    }}
                />
            </Box>
            {/* foot right */}
            <Box
                className="absolute top-400 -right-20 bg-black z-[555] shadow-foot rounded-foot w-21 h-30"
                sx={{
                    "&:after": {
                        content: '""',
                        position: "absolute",
                        width: "55px",
                        height: "65px",
                        bgcolor: "#222222",
                        borderRadius: "9999px",
                        left: 0,
                        right: 0,
                        bottom: "10px",
                        margin: "auto",
                    },
                }}>
                <Box
                    sx={{
                        position: "absolute",
                        width: "25px",
                        height: "35px",
                        bgcolor: "#222222",
                        borderRadius: "9999px",
                        top: "10px",
                        left: "5px",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            width: "20px",
                            height: "35px",
                            bgcolor: "#222222",
                            borderRadius: "9999px",
                            top: "5px",
                            left: "55px",
                        },
                        "&:after": {
                            content: '""',
                            position: "absolute",
                            width: "20px",
                            height: "35px",
                            bgcolor: "#222222",
                            borderRadius: "9999px",
                            top: 0,
                            left: "30px",
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Panda;
