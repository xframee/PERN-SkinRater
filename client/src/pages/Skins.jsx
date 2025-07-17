import React from "react";
import SkinListCards from "../components/SkinListCards";
import { useState } from "react";
import Button from '@mui/material/Button';

export const Skins = () => {

    const [filter, setFilter] = useState("newest");

    return (
        <div>
            <h1>Here you can see all skins currently in Counter Strike 2</h1>
            <Button variant="contained" onClick={() => setFilter("newest")}>Newest</Button>
            <Button variant="contained" onClick={() => setFilter("best")}>Best Rated</Button>
            <SkinListCards count={12} title={"All Skins"} filter={filter} />
        </div>
    );
};