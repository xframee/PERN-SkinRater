import React from "react";
import SkinListCards from "../components/SkinListCards";

export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <SkinListCards count={10} />
        </div>
    );
}