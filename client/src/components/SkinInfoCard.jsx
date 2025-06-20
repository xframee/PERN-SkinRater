import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';

export default function SkinInfoCard({ skin, index }) {
    return (
        <div className="skin-info-cards">
            <Card sx={{ width: 345 }}>
                <CardMedia
                    sx={{ height: 240 }}
                    image={skin.skin_image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {skin.skin_name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}
