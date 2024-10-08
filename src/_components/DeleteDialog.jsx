/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function DeleteDialog({ open, handleCancel, handleDelete }) {
    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    When you select delete, the data will be completely deleted.
                    Are you sure you want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                    onClick={handleDelete}
                    className="!bg-red-500"
                    variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
