import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';

export default function SkinInfoCard({ skin }) {
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
                <CardActions sx={{ bgcolor: 'background.paper', borderTop: '2px solid #e0e0e0' }}>
                    <Button sx={{ size: 'small', color: "primary.contrastText" }}>Share</Button>
                </CardActions>
            </Card>
        </div>
    );
}
