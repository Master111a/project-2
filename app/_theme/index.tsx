"use client";

import { useMemo } from "react";
// @mui
import {
    ThemeProvider as MuiThemeProvider,
    ThemeOptions,
    createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// system
import { typography } from "./typography";

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const baseOption = useMemo(
        () => ({
            typography,
        }),
        []
    );

    const theme = createTheme(baseOption as ThemeOptions);
    return (
        <MuiThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
