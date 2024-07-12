import { Button } from "@mui/material";
export default function CustomTablePagination(props) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const handlePreviousPage = () => {
        if (page > 0) {
            onPageChange(page, page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(count / rowsPerPage) - 1) {
            onPageChange(page, page + 1);
        }
    };
    console.log(page);
    const start = page * rowsPerPage + 1;
    const end = Math.min(count, (page + 1) * rowsPerPage);
    return (
        <div className="w-full flex items-center justify-between bg-white border-b rounded-b ">
            <Button
                onClick={handlePreviousPage}
                disabled={page === 0}
                sx={{
                    p: "12px 16px 12px 16px",
                    display: "flex",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: 12,
                    color: "#CBD5E1",
                    fontWeight: 800,
                }}>
                Previous
            </Button>
            <div className="flex items-center gap-x-2 px-3 py-4 text-sm font-normal text-gray500">
                {start}-{end} of {count}
            </div>
            <Button
                onClick={handleNextPage}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                sx={{
                    p: "12px 16px 12px 16px",
                    display: "flex",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: 12,
                    color: "#CBD5E1",
                    fontWeight: 800,
                }}>
                Next
            </Button>
        </div>
    );
}
