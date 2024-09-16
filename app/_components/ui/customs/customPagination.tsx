/* eslint-disable react/prop-types */
import useChangePage from "@/_hook/useChangePage";
import { Button } from "@mui/material";
type IPtype = {
    count: number;
};
export default function CustomTablePagination({ count }: IPtype) {
    const {
        pageNumber,
        rowsPerPage,
        start,
        end,
        handlePreviousPage,
        handleNextPage,
    } = useChangePage(count);
    return (
        <div className="w-full flex items-center justify-between bg-white border-b rounded-b ">
            <Button
                onClick={handlePreviousPage}
                disabled={pageNumber < 2}
                sx={{
                    p: "12px 16px 12px 16px",
                    display: "flex",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: 12,
                    color: "#1a14148c",
                    fontWeight: 800,
                }}>
                Previous
            </Button>
            <div className="flex items-center gap-x-2 px-3 py-4 text-sm font-normal text-gray500">
                {start}-{end} of {count}
            </div>
            <Button
                onClick={handleNextPage}
                disabled={pageNumber >= Math.ceil(count / rowsPerPage)}
                sx={{
                    p: "12px 16px 12px 16px",
                    display: "flex",
                    gap: "8px",
                    textTransform: "capitalize",
                    fontSize: 12,
                    color: "#1a14148c",
                    fontWeight: 800,
                }}>
                Next
            </Button>
        </div>
    );
}
