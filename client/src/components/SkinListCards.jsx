import React, { useEffect, useState, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import SkinInfoCard from "./SkinInfoCard";
import "../App.css";
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const SkinListCards = ({ count, title, filter }) => {
    const [skins, setSkins] = useState([]);
    const [page, setPage] = useState(1);   // 1-based everywhere
    const [pageCount, setPageCount] = useState(0); // total number of pages

    const fetchSkins = useCallback(async () => {

        const url = new URL("http://localhost:5000/skins");
        url.searchParams.set("page", page);
        url.searchParams.set("limit", count);
        url.searchParams.set("filter", filter);

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();
        setSkins(data.data);
        setPageCount(data.totalPages);
    }, [page, count, filter]);

    useEffect(() => { fetchSkins(); }, [fetchSkins]);

    return (
        <div className="pagination-container">
            <h1>{title}</h1>

            <div className="skin-list">
                {skins.map((skin) => (
                    <SkinInfoCard key={skin.skin_id} skin={skin} refetchSkins={fetchSkins} />
                ))}
            </div>

            <Pagination
                sx={{ marginBottom: "20px" }}
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                variant="outlined"
                size="large"
                showFirstButton
                showLastButton
            />

            <Button color='inherit' component={RouterLink} to="/skins">All skins</Button>

        </div>
    );
};

export default SkinListCards;