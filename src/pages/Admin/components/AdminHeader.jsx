import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
export default function AdminHeader() {
    return (
        <div className="flex items-center px-12 ">
            <div className="flex items-center justify-between w-4/15 max-w-80 rounded-full overflow-hidden border">
                <Input
                    id="input-with-icon-adornment"
                    label="Press/ to search"
                    className="w-full bg-background"
                    startAdornment={
                        <InputAdornment position="start"></InputAdornment>
                    }
                />
                <input type="text" />
                <SearchIcon />
            </div>
            <div className="flex ml-auto items-center">
                <IconButton aria-label="notification">
                    <NotificationsIcon />
                </IconButton>
            </div>
        </div>
    );
}
