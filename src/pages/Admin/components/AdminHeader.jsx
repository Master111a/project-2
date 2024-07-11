import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AvatarPNG } from "../../../assets";
import { DropdownAvatarMenu, SearchInput } from "../../../_components";
export default function AdminHeader() {
    const item = {
        name: "Digital Creative",
        avatar: AvatarPNG,
    };
    return (
        <div className="flex items-center px-12 py-2 bg-white">
            <SearchInput
                className="bg-background"
                placeholder="Press / to search"
            />
            <div className="flex ml-auto items-center">
                <IconButton aria-label="notification">
                    <NotificationsIcon />
                </IconButton>
                <DropdownAvatarMenu item={item} />
            </div>
        </div>
    );
}
