/* eslint-disable react/prop-types */
import ArchiveIcon from "@mui/icons-material/Archive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUser } from "utils/store/auth.slice";

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));
export default function DropdownAvatarMenu({ item }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(resetUser());
        toast.success("Logout success! 🦄", {
            position: "top-left",
        });
        navigate("/login", { state: location.pathname });
        handleClose();
    };
    return (
        <div>
            <Button
                id="avatar-button"
                variant="text"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon className="text-gray500" />}
                className="!py-1">
                <div className="text-sm capitalize text-gray600 flex items-center pl-1 gap-x-1">
                    <img
                        src={item?.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                    />
                    {item?.name}
                </div>
            </Button>
            <StyledMenu
                id="avatar-menu"
                MenuListProps={{
                    "aria-labelledby": "avatar-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem
                    onClick={() => {
                        navigate("/admin");
                    }}>
                    <DashboardIcon />
                    Admin
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ManageAccountsIcon />
                    Profile
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose}>
                    <ArchiveIcon />
                    Archive
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon />
                    Logout
                </MenuItem>
            </StyledMenu>
        </div>
    );
}
