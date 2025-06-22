import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SkinInfoCard from "./SkinInfoCard";
import "../App.css";

const SkinListCards = ({ count  }) => {
    const [skins, setSkins] = useState([]);
    const [page, setPage] = useState(1);   // 1-based everywhere
    const [pageCount, setPageCount] = useState(0); // total number of pages

    useEffect(() => {
        const fetchSkins = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/skins?page=${page}&limit=${count}`
                );
                if (!res.ok) throw new Error("Failed to fetch skins");

                const json = await res.json();
                setSkins(json.data);          // json.data, not json
                setPageCount(json.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSkins();
    }, [page, count]);

    return (
        <div className="pagination-container">
            <h1>Title</h1>

            <div className="skin-list">
                {skins.map((skin) => (
                    <SkinInfoCard key = {skin.skin_id} skin={skin} />
                ))}
            </div>

            <Pagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
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