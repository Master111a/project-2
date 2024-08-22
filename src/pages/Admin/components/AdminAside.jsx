import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { HiOutlineCollection } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { Logo } from "../../../_components";
import { dashboardList, resourcesList } from "../../../utils/data";
import { StyledList, StyledListItemButton } from "../../../utils/styled";

export default function AdminAside() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    // const isActive = (item) =>
    //     item !== ""
    //         ? location.pathname.includes("/admin/" + item)
    //         : location.pathname === "/admin" + item;
    return (
        <div className="flex flex-col w-1/5">
            <Logo />
            <div className="flex flex-col py-5 px-3">
                <StyledList
                    className="bg-background text-gray500"
                    component="nav">
                    <StyledListItemButton
                        onClick={() => handleClick()}
                        className="flex items-center gap-x-2">
                        <RxDashboard className="text-gray500 text-24 absolute left-2" />
                        <ListItemText primary="Dashboard" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </StyledListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <StyledList component="ul" disablePadding>
                            {dashboardList?.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item?.href}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primary  font-extrabold block w-full"
                                                : "font-normal block w-full"
                                        }>
                                        <StyledListItemButton>
                                            <span className="flex 1 my-1 text-base">
                                                {item?.title}
                                            </span>
                                        </StyledListItemButton>
                                    </NavLink>
                                </li>
                            ))}
                        </StyledList>
                    </Collapse>
                    <StyledListItemButton
                        onClick={() => handleClick2()}
                        className="flex items-center gap-x-2 relative pl-10">
                        <HiOutlineCollection className="text-24 text-gray500 absolute left-2" />
                        <ListItemText primary="Material" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </StyledListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <StyledList component="ul" disablePadding>
                            {resourcesList.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item?.href}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primary  font-extrabold block w-full"
                                                : "font-normal block w-full"
                                        }>
                                        <StyledListItemButton>
                                            <span className="flex 1 my-1 text-base">
                                                {item?.title}
                                            </span>
                                        </StyledListItemButton>
                                    </NavLink>
                                </li>
                            ))}
                        </StyledList>
                    </Collapse>
                </StyledList>
            </div>
        </div>
    );
}
