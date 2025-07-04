import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import akAquamarine from '../images/ak_aqumarine.jpg';
import akWildLotus from '../images/ak_wild_lotus.jpg';

export const HeroCarousel = () => {
    var items = [
        {
            name: "Fist element",
            description: "Random description for the first element",
            image: akAquamarine
        },
        {
            name: "Second element",
            description: "Random description for the second element",
            image: akWildLotus
        }
    ]

    return (
        <Carousel

            sx={{
                margin: "25px 100px 0px 100px"
            }}

            indicatorContainerProps={{
                style: {
                    marginTop: "20px",
                    transitionDuration: "0.5s"
                }
            }}

            indicatorIconButtonProps={{
                style: { color: "#222222" }
            }}
            activeIndicatorIconButtonProps={{
                style: { color: "#EEEEEE" }
            }}
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )

    function Item(props) {
        return (
            <Paper>
                <img src={props.item.image} alt={props.item.name} style={{ width: "100%", maxHeight: "600px"}} />
            </Paper>
        )
    }
}