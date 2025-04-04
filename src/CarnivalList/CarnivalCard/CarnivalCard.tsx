import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
                <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>{content.paradeDate?.join(" - ")}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} className='carnival-card-description'>
                    {content.description}
                </Typography>
            </CardContent>
            <CardActions className='carnival-card-actions'>
                {content.links.length > 0 ?

                    <Grid container spacing={1} wrap="wrap">
                        {content.links.map((link, idx) => (
                            <Grid key={idx}>
                                <Chip
                                    label={link.name}
                                    component="a"
                                    href={link.link}
                                    color="primary"
                                    target="_blank"
                                    clickable
                                    sx={{ "&:hover": { color: 'white', backgroundColor: "secondary.main" } }} />
                            </Grid>
                        ))}
                    </Grid> : ""}
                {content.liked ?
                    <IconButton aria-label="remove to favorites">
                        <FavoriteIcon />
                    </IconButton> :
                    <IconButton aria-label="add to favorites">
                        <FavoriteBorderIcon />
                    </IconButton>}
            </CardActions>
        </Card>
    );
}