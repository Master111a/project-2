import { Box, Button, Checkbox, Toolbar, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function EnhancedTableToolbar(props) {
    const { selected, rowCount, onSelectAllClick, onDeleteMany } = props;
    const numSelected = selected?.length || 0;
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
                <Box className="flex items-center justify-between w-full">
                    <Typography
                        sx={{ flex: "1 1 100%", color: "#64748b" }}
                        color="inherit"
                        variant="subtitle1"
                        component="div">
                        {numSelected} selected
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            flexShrink: 0,
                        }}
                        onClick={onDeleteMany}>
                        Delete all
                    </Button>
                </Box>
            )}
        </Toolbar>
    );
}
