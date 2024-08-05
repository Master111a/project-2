import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { isNumber } from "../utils/function/function";

export default function CustomTablePagination(props) {
    const { count, rowsPerPage, onClick } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get("page"));
    const rowParams = Number(searchParams.get("row"));

    const checkPageNumber = isNumber(pageNumber);
    const row = Boolean(rowParams) ? rowParams : rowsPerPage;

    const start = (pageNumber < 2 ? 0 : pageNumber - 1) * row + 1;
    const end = Math.min(count, (pageNumber < 2 ? 1 : pageNumber) * row);

    const removePageParam = () => {
        let newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("page");
        setSearchParams(newSearchParams);
    };
    const setPageParam = (value) => {
        let newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", value);
        setSearchParams(newSearchParams);
    };

    const handlePreviousPage = () => {
        if (checkPageNumber && pageNumber > 0) {
            pageNumber === 2 ? removePageParam() : setPageParam(pageNumber - 1);
            onClick();
        }
    };

    const handleNextPage = () => {
        if (checkPageNumber && pageNumber < Math.ceil(count / row)) {
            pageNumber <= 1
                ? setPageParam(pageNumber + 2)
                : setPageParam(pageNumber + 1);
            onClick();
        }
    };

    return (
        <div className="w-full flex items-center justify-between bg-white border-b rounded-b ">
            <Button
                onClick={handlePreviousPage}
                disabled={pageNumber === 0}
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
                disabled={pageNumber >= Math.ceil(count / row)}
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
