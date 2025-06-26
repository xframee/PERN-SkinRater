import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RateMenu from './RateMenu';
import '../App.css';

//make a color object that maps to the skin rarity and then we style each card based on the rarity
const rarityColors = {
    "Consumer": "#AFAFAF",
    "Industrial": "#6496E1",
    "Mil-spec": "#4B69CD",
    "Restricted": "#8847FF",
    "Classified": "#D32CE6",
    "Covert": "#EB4B4B",
    "Contraband": "#886A08"
};


export default function SkinInfoCard({ skin, refetchSkins }) {
    return (
        <div className="skin-info-cards">
            <Card sx={{ width: 320, borderRadius: 2, bgcolor: rarityColors[skin.rarity] || '#FFFFFF' }}>
                <Box sx={{ p: 1.5, bgcolor: 'rgba(0,0,0,0.5)' }}>
                    <Typography variant="h6" color="#ffffff">
                        {skin.rarity}
                    </Typography>
                </Box>
                <CardMedia
                    sx={{ height: 240 }}
                    image={skin.skin_image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {skin.skin_name}
                    </Typography>
                </CardContent>
                <CardActions sx={{ bgcolor: 'background.paper', borderTop: '2px solid #e0e0e0', justifyContent: 'space-between' }}>
                    <Typography >Average rating: {skin.average_rating ?? "N/A"}</Typography>
                    <RateMenu skinId={skin.skin_id} onRated={refetchSkins} />
                </CardActions>
            </Card>
        </div>
    );
}
