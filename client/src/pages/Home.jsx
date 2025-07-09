import React from "react";
import SkinListCards from "../components/SkinListCards";
import { HeroCarousel } from "../components/HeroCaroussel";

export const Home = () => {
    return (
        <div>
            <HeroCarousel />
            <SkinListCards count={4} title={"Newly Released Skins"} filter={"newest"} />
            <SkinListCards count={4} title={"Best Rated Skins"} filter={"best"} />
        </div>
    );
}