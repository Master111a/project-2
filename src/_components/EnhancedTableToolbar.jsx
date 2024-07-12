import {
    Checkbox,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
    HiOutlineChevronDown,
    HiOutlineFilter,
    HiOutlineVideoCamera,
} from "react-icons/hi";
export default function EnhancedTableToolbar(props) {
    const { numSelected, rowCount, onSelectAllClick } = props;

    return (
        <Toolbar
            sx={{
                p: { sm: "12px" },
                borderBottom: "1px solid #E2E8F0",
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}>
            <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                    "aria-label": "select all desserts",
                }}
            />
            {numSelected > 0 && (
                <Typography
                    sx={{ flex: "1 1 100%", color: "#64748b" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div">
                    {numSelected} selected
                </Typography>
            )}
            <div className="ml-auto flex-shrink-0 flex items-center gap-x-2 ">
                <Tooltip title="Video select">
                    <IconButton>
                        <div className="flex items-center gap-x-2 text-gray500">
                            <HiOutlineVideoCamera className="text-24" />
                            <HiOutlineChevronDown className="text-sm" />
                        </div>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Filter list">
                    <IconButton className="">
                        <div className="flex items-center gap-x-2 text-gray500">
                            <HiOutlineFilter className="text-24" />
                            <HiOutlineChevronDown className="text-sm" />
                        </div>
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
}
