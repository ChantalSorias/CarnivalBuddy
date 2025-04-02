import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './CarnivalCard.css'

export default function CarnivalCard({ content }) {
    const [imgSrc, setImgSrc] = useState(content.image);
    const defaultImage = "src/assets/default-carnival-image.jpg";

    return (
        <Card className='carnival-card'>
            <CardMedia
                component="img"
                height="194"
                image={imgSrc}
                onError={() => setImgSrc(defaultImage)}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {content.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{content.paradeDate.join(" - ")}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} className='carnival-card-description'>
                    {content.description}
                </Typography>
            </CardContent>
        </Card>
    );
}