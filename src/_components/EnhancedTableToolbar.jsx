import {
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import {
    HiOutlineCheckCircle,
    HiOutlineChevronDown,
    HiOutlineFilter,
    HiOutlineVideoCamera,
    HiOutlineXCircle,
} from "react-icons/hi";
export default function EnhancedTableToolbar(props) {
    const { numSelected, rowCount, onSelectAllClick } = props;
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(false);
        setData({
            name: "",
            email: "",
            admin: 1,
        });
    };
    const [data, setData] = useState({
        name: "",
        email: "",
        admin: 1,
    });
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
                    <IconButton className="" onClick={handleClick}>
                        <div className="flex items-center gap-x-2 text-gray500">
                            <HiOutlineFilter className="text-24" />
                            <HiOutlineChevronDown className="text-sm" />
                        </div>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}>
                    <MenuItem>
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={data?.name}
                            onChange={(e) =>
                                setData((pre) => ({
                                    ...pre,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </MenuItem>
                    <MenuItem>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={data?.email}
                            onChange={(e) =>
                                setData((pre) => ({
                                    ...pre,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </MenuItem>
                    <MenuItem>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Admin
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data?.admin}
                                label="Admin"
                                onChange={(e) =>
                                    setData((pre) => ({
                                        ...pre,
                                        admin: e.target.value,
                                    }))
                                }>
                                <MenuItem value={1}>All</MenuItem>
                                <MenuItem value={2}>
                                    <div className="flex items-center gap-x-2">
                                        <HiOutlineCheckCircle className="text-24 text-green500" />
                                        Admin
                                    </div>
                                </MenuItem>
                                <MenuItem value={3}>
                                    <div className="flex items-center gap-x-2">
                                        <HiOutlineXCircle className="text-24 text-red500" />{" "}
                                        No Admin
                                    </div>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </MenuItem>
                </Menu>
            </div>
        </Toolbar>
    );
}
