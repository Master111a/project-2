import { styled } from "@mui/material/styles";
import { useState } from "react";
import { SearchInput, StatsItemWrap } from "../../../_components";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button } from "@mui/material";
const StyledSelect = styled((props) => <Select {...props} />)(({ theme }) => ({
    "& .MuiSelect-select": {
        padding: "3px 6px 3px 12px",
        border: "1px solid #CBD5E1",
    },
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 999,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: [
            theme.palette.mode === "light" ? "#E2E8F0" : "#CBD5E1",
        ],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 999,
        backgroundColor: theme.palette.mode === "light" ? "#22C55E" : "#308fe8",
    },
}));
export default function AdminContent() {
    const [day, setDay] = useState(30);
    const handleChange = (event) => {
        setDay(event.target.value);
    };
    return (
        <div className="w-full h-full py-8 px-12 flex flex-col gap-y-6">
            {/* Stats list */}
            <div className="grid grid-cols-3 gap-x-6 h-40">
                <StatsItemWrap className="flex flex-col justify-start gap-y-4 shadow-lg">
                    <div className="flex w-full justify-between items-start">
                        <h4 className="text-gray500 font-extrabold text-sm">
                            Current Users
                        </h4>
                        <StyledSelect
                            id="demo-simple-select"
                            value={day}
                            className="!text-12 !text-gray500 border-gray300"
                            onChange={handleChange}>
                            <MenuItem value={7}>
                                <span className="text-12 text-gray500">
                                    7 Days
                                </span>
                            </MenuItem>
                            <MenuItem value={30}>
                                <span className="text-12 text-gray500">
                                    30 Days
                                </span>
                            </MenuItem>
                            <MenuItem value={60}>
                                <span className="text-12 text-gray500">
                                    60 Days
                                </span>
                            </MenuItem>
                        </StyledSelect>
                    </div>
                    <div className="flex items-center justify-start gap-x-4">
                        <div className="bg-primary w-14 h-14 rounded-lg flex items-center justify-center">
                            <SignalCellularAltRoundedIcon className="text-white" />
                        </div>
                        <span className="text-36 leading-40 font-normal text-gray500">
                            7
                        </span>
                    </div>
                </StatsItemWrap>
                <StatsItemWrap className="flex flex-col justify-start gap-y-4 shadow-lg">
                    <div className="flex w-full justify-between items-start">
                        <h4 className="text-gray500 font-extrabold text-sm">
                            New Users
                        </h4>
                        <span className="text-12 text-gray500">15k</span>
                    </div>
                    <div className="text-36 leading-40 font-normal text-gray500">
                        75%
                    </div>
                    <div>
                        <BorderLinearProgress
                            variant="determinate"
                            value={75}
                        />
                    </div>
                </StatsItemWrap>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-y-3">
                <h2 className="font-normal text-24 text-gray500 leading-32">
                    Users
                </h2>
                <div className="flex items-center justify-between">
                    <SearchInput className="bg-white" placeholder="Search" />
                    <Button variant="contained" className="!bg-primary">
                        <span className="font-extrabold text-sm leading-5 text-white capitalize">
                            Create User
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
