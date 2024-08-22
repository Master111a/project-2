import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import { StyledMenu } from "./DropdownAvatarMenu";

export default function DropdownNotificationMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton id="notification-menu" onClick={handleClick}>
                <NotificationsIcon />
            </IconButton>
            <StyledMenu
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
            </StyledMenu>
        </div>
    );
}
