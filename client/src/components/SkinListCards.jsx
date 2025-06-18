import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import "../App.css";

const SkinListCards = ({ count }) => {
    const [skins, setSkins] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const response = await fetch(`http://localhost:5000/skins?page=${page}&limit=${count}`);
                if (!response.ok) throw new Error("Failed to fetch skins");
                const data = await response.json();
                setSkins(data);
                setNumberOfPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching skins:", error);
            }
        };

        fetchSkins();
    }, [page, count]);

    return (
        <div className="pagination-container">
            <h1>Title</h1>
            <Pagination
                count={20}
                page={page + 1}
                onChange={(_, value) => setPage(value - 1)}
                color="primary"
                variant="outlined"
                size="large"
                showFirstButton
                showLastButton
            />
        </div>
    );
};

export default SkinListCards;
