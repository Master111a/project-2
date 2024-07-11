import { Logo } from "../../../_components";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { RxDashboard } from "react-icons/rx";

export default function AdminAside() {
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
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
                <List
                    className="w-full bg-background text-gray500 !py-0"
                    component="nav">
                    <ListItemButton
                        onClick={() => handleClick()}
                        className="flex items-center gap-x-2">
                        <RxDashboard className="text-gray500 text-2xl" />
                        <ListItemText primary="Dashboard" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                onClick={() => handleItemClick("Main")}
                                className={
                                    isActive("Main") ? "text-primary" : ""
                                }>
                                <ListItemText primary="Main" />
                            </ListItemButton>
                            <ListItemButton
                                onClick={() => handleItemClick("User Insights")}
                                className={
                                    isActive("User Insights")
                                        ? "active"
                                        : "text-primary"
                                }>
                                <ListItemText primary="User Insights" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItemButton
                        onClick={() => {
                            handleClick2();
                            handleItemClick("Resources");
                        }}
                        className={isActive("Resources") ? "active" : ""}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Resources" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {[
                                "Addresses",
                                "Comments",
                                "Posts",
                                "Purchases",
                                "Roles",
                                "Tags",
                                "Users",
                            ].map((text, index) => (
                                <ListItemButton
                                    onClick={() => handleItemClick(text)}
                                    className={isActive(text) ? "active" : ""}
                                    key={index}>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </div>
        </div>
    );
}
