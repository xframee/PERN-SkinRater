import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RateMenu from './RateMenu';
import '../App.css';

//make a color object that maps to the skin rarity and then we style each card based on the rarity

export default function SkinInfoCard({ skin, refetchSkins }) {
    return (
        <div className="skin-info-cards">
            <Card sx={{ width: 320 }}>
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
                    <RateMenu skinId={ skin.skin_id } onRated={refetchSkins} />
                </CardActions>
            </Card>
        </div>
    );
}
