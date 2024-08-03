import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export default function CustomTablePagination(props) {
    const { count, page, rowsPerPage, onPageChange } = props;
    const start = page * rowsPerPage + 1;
    const end = Math.min(count, (page + 1) * rowsPerPage);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    useEffect(() => {
        let page = parseInt(searchParams.get("page"));
        setCurrentPage(page || 1);
    }, []);

    const handlePreviousPage = () => {
        if (page > 0) {
            onPageChange(page - 1);
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(count / rowsPerPage) - 1) {
            onPageChange(page + 1);
            handlePageChange(currentPage + 1);
        }
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page);
        navigate(`${location.pathname}?${params}`, { replace: true });
        setCurrentPage(page);
    };
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
