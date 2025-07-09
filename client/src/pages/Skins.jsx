import React from "react";
import SkinListCards from "../components/SkinListCards";

export const Skins = () => {
    return (
        <>
            <h1>Here you can see all skins currently in Counter Strike 2</h1>
            <SkinListCards count={12} title={"All Skins"} filter={"newest"} />
        </>
    );
};