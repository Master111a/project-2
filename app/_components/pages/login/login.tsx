"use client";

import { useEffect, useRef, useState } from "react";
// config
import globalConfig from "@/_config";
// @mui
import { Box } from "@mui/material";
// component
import FormLogin from "./_components/formLogin";
import Hand from "./_components/hand";
import Panda from "./_components/panda";
// type
import WrongAlert from "./_components/wrongAlert";
import { SizeProps, WrongAlertProps } from "./loginType";

const Login = () => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [focus, setFocus] = useState<boolean>(false);
    const [checkWrong, setCheckWrong] = useState<boolean>(false);
    const [wrongAlert, setWrongAlert] = useState<WrongAlertProps>({
        showAlert: false,
        message: "",
    });
    const [documentSize, setDocumentSize] = useState<SizeProps>({
        width: 0,
        height: 0,
    });
    const [size, setSize] = useState<SizeProps>({
        width: 0,
        height: 0,
    });
    // mouse move
    useEffect(() => {
        const updateDocumentSize = () => {
            if (divRef.current) {
                const rect = divRef.current.getBoundingClientRect();
                setDocumentSize({
                    width: rect.width / 15,
                    height: rect.height / 15,
                });
            }
        };
        updateDocumentSize();
        window.addEventListener("resize", updateDocumentSize);
        return () => {
            window.removeEventListener("resize", updateDocumentSize);
        };
    }, []);
    const handleMouseMove = (event: React.MouseEvent) => {
        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const x = (event.clientX - rect.left) / documentSize.width;
            const y = (event.clientY - rect.top) / documentSize.height;
            setSize({ width: x, height: y });
        }
    };
    // alert
    useEffect(() => {
        if (!wrongAlert.showAlert) return;
        const timer = setTimeout(() => {
            setWrongAlert((x) => ({ ...x, showAlert: false }));
        }, 3000);
        return () => {
            setWrongAlert((x) => ({ ...x, showAlert: false }));
            clearTimeout(timer);
        };
    }, [wrongAlert.showAlert]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                padding: "16px",
                background: `url(${globalConfig.assetUrl}/images/thumbPanda.jpg)`,
                backgroundPosition: "center",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            ref={divRef}
            onMouseMove={handleMouseMove}>
            {/* panda */}
            <Box
                sx={{
                    position: "relative",
                }}>
                <Panda size={size} />
                {/* form */}
                <Box
                    sx={{
                        height: "333px",
                        margin: "auto",
                        padding: "20px 40px",
                        display: "block",
                        maxWidth: "400px",
                        bgcolor: "#ffffff",
                        boxShadow: "0 10px 15px rgba(0,0,0,0.15)",
                        zIndex: 500,
                        position: "relative",
                        border: "1px solid #eee",
                        borderRadius: "6px",
                        transitionDuration: "300ms",
                    }}
                    className={`${
                        focus ? "-translate-y-[200px]" : "-translate-y-[100px]"
                    } ${checkWrong ? "animate-wrong" : ""}`}>
                    {/* hand */}
                    <Hand />
                    {/* login */}
                    <FormLogin
                        showAlert={wrongAlert.showAlert}
                        onFocus={setFocus}
                        setCheckWrong={setCheckWrong}
                        setWrongAlert={setWrongAlert}
                    />
                    <WrongAlert wrongAlert={wrongAlert} />
                </Box>
            </Box>
        </Box>
    );
};
export default Login;
