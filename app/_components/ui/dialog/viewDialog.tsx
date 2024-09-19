import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

type IProps = {
    open: boolean;
    handleCancel: () => void;
    handleDelete: () => void;
};
export default function ViewDialog({
    open,
    handleCancel,
    handleDelete,
}: IProps) {
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
