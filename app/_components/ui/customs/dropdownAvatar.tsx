"use client";

import { DropDownMenu } from "@/_components/ui/menu";
import { User } from "@/_types/user";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Box, Button, Divider, MenuItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
type IProps = {
    item: User;
};
export default function DropdownAvatarMenu({ item }: IProps) {
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
            <Button
                id="avatar-button"
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon className="text-gray500" />}
                sx={{
                    paddingLeft: "4px",
                    fontWeight: 600,
                    "&:hover": {
                        bgcolor: "#E9E9E9",
                        color: "#000000",
                    },
                }}>
                <Box className="text-sm capitalize text-gray600 flex items-center pl-1 gap-x-1">
                    <Image
                        src={item.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                        width={32}
                        height={32}
                    />
                    {item.name}
                </Box>
            </Button>
            <DropDownMenu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <DashboardIcon />
                    Admin
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ManageAccountsIcon />
                    Profile
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <LogoutIcon />
                    Logout
                </MenuItem>
            </DropDownMenu>
        </Box>
    );
}
