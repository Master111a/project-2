import { Logo } from "../../../_components";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineCollection } from "react-icons/hi";
import { StyledList, StyledListItemButton } from "../../../utils/styled";

export default function AdminAside() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = () => {
        setOpen(!open);
        setActiveItem("");
    };
    const handleClick2 = () => {
        setActiveItem("");
        setOpen2(!open2);
    };
    const handleItemClick = (item) => {
        setActiveItem(item);
    };
    const isActive = (item) => activeItem === item;
    return (
        <div className="flex flex-col w-18% max-w-60">
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
                        <StyledList component="div" disablePadding>
                            <StyledListItemButton
                                onClick={() => handleItemClick("Main")}
                                className={isActive("Main") ? "active" : ""}>
                                <ListItemText primary="Main" />
                            </StyledListItemButton>
                            <StyledListItemButton
                                onClick={() => handleItemClick("User Insights")}
                                className={
                                    isActive("User Insights") ? "active" : ""
                                }>
                                <ListItemText primary="User Insights" />
                            </StyledListItemButton>
                        </StyledList>
                    </Collapse>
                    <StyledListItemButton
                        onClick={() => handleClick2()}
                        className="flex items-center gap-x-2 relative pl-10">
                        <HiOutlineCollection className="text-24 text-gray500 absolute left-2" />
                        <ListItemText primary="Resources" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </StyledListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <StyledList component="div" disablePadding>
                            {[
                                "Addresses",
                                "Comments",
                                "Posts",
                                "Purchases",
                                "Roles",
                                "Tags",
                                "Users",
                            ].map((text, index) => (
                                <StyledListItemButton
                                    onClick={() => handleItemClick(text)}
                                    className={isActive(text) ? "active" : ""}
                                    key={index}>
                                    <ListItemText primary={text} />
                                </StyledListItemButton>
                            ))}
                        </StyledList>
                    </Collapse>
                </StyledList>
            </div>
        </div>
    );
}
