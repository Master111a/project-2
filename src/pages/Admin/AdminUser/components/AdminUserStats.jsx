import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { HiOutlineChartBar } from "react-icons/hi";
import { StatsItemWrap } from "../../../../_components";
import { BorderLinearProgress, StyledSelect } from "../../../../utils/styled";

export default function AdminUserStats() {
    const [day, setDay] = useState(30);
    const handleChange = (event) => {
        setDay(event.target.value);
    };
    return (
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
                            <span className="text-12 text-gray500">7 Days</span>
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
                        <HiOutlineChartBar className="text-white text-24" />
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
                    <BorderLinearProgress variant="determinate" value={75} />
                </div>
            </StatsItemWrap>
        </div>
    );
}
