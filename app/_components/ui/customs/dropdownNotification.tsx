"use client";

import { DropDownMenu } from "@/_components/ui/menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, IconButton, MenuItem } from "@mui/material";
import { useState } from "react";

export default function DropdownNotificationMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <IconButton id="notification-menu" onClick={handleClick}>
                <NotificationsIcon />
            </IconButton>
            <DropDownMenu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <span className="w-full text-center py-3">Notify Item</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {" "}
                    <span className="w-full text-center py-3">Notify Item</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {" "}
                    <span className="w-full text-center py-3">Notify Item</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {" "}
                    <span className="w-full text-center py-3">Xem tat ca</span>
                </MenuItem>
            </DropDownMenu>
        </Box>
    );
}
