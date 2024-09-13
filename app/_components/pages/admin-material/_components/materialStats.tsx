"use client";

import globalColor from "@/_assets/colors";
import { StatsItemWrap } from "@/_components/ui/customs";
import {
    Box,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { HiOutlineChartBar } from "react-icons/hi";

type Props = {
    count: number | null;
};

export default function MaterialStats({ count }: Props) {
    const [day, setDay] = useState<number>(30);
    const handleChange = (event: SelectChangeEvent<number>) => {
        setDay(Number(event.target.value));
    };
    return (
        <Box className="grid grid-cols-3 gap-x-6 h-40">
            <StatsItemWrap className="flex flex-col justify-start gap-y-4 shadow-lg rounded-md">
                <Box className="flex w-full justify-between items-start">
                    <Typography
                        variant="h4"
                        sx={{
                            color: globalColor.gray500,
                            fontWeight: 900,
                            fontSize: "14px",
                        }}>
                        Current Material
                    </Typography>
                    <Select
                        id="material-select"
                        value={day}
                        onChange={handleChange}
                        sx={{
                            fontSize: "12px",
                            color: globalColor.gray500,
                            borderColor: globalColor.gray300,
                            "& .MuiSelect-select": {
                                padding: "3px 6px 3px 12px",
                                border: `1px solid ${globalColor.gray300}`,
                            },
                        }}>
                        <MenuItem value={7}>
                            <Box
                                component="span"
                                className="text-12 text-gray500">
                                7 Days
                            </Box>
                        </MenuItem>
                        <MenuItem value={30}>
                            <Box
                                component="span"
                                className="text-12 text-gray500">
                                30 Days
                            </Box>
                        </MenuItem>
                        <MenuItem value={60}>
                            <Box
                                component="span"
                                className="text-12 text-gray500">
                                60 Days
                            </Box>
                        </MenuItem>
                    </Select>
                </Box>
                <Box className="flex items-center justify-start gap-x-4">
                    <Box className="bg-primary w-14 h-14 rounded-lg flex items-center justify-center">
                        <HiOutlineChartBar className="text-white text-24" />
                    </Box>
                    <Box
                        component="span"
                        className="text-36 leading-40 font-normal text-gray500">
                        {count || 0}
                    </Box>
                </Box>
            </StatsItemWrap>
        </Box>
    );
}
