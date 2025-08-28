import { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { formatToLocalDate } from '../../utils/dateUtils';
import './CarnivalCard.css';
import { Carnival } from '../../Models/Carnival';
import { useAuth } from '../../context/AuthContext';

interface CarnivalCardProps {
    content: Carnival;
    handleLikeToggle: (id: string, currentlyLiked: boolean) => void;
}

export default function CarnivalCard({ content, handleLikeToggle }: CarnivalCardProps) {
    const defaultImage = "src/assets/default-carnival-image.jpg";
    const [imgSrc, setImgSrc] = useState(content.image || defaultImage);
    const entityId = content.id!;
    const { currentUser } = useAuth();

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
                <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>{content.paradeDates?.map(date => formatToLocalDate(date)).join(" - ")}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }} className='carnival-card-description'>
                    {content.description}
                </Typography>
            </CardContent>
            <CardActions className='carnival-card-actions'>
                {content.links.length > 0 &&

                    <Grid container spacing={1} wrap="wrap">
                        {content.links.map((link, idx) => (
                            <Grid key={idx}>
                                <Chip
                                    label={link.name}
                                    component="a"
                                    href={link.url}
                                    color="primary"
                                    target="_blank"
                                    clickable
                                    sx={{ "&:hover": { color: 'white', backgroundColor: "secondary.main" } }} />
                            </Grid>
                        ))}
                    </Grid>
                }
                
                {currentUser && (
                    content.liked ?
                        <IconButton aria-label="remove from favorites" onClick={() => handleLikeToggle(entityId, content.liked!)}>
                            <FavoriteIcon />
                        </IconButton> :
                        <IconButton aria-label="add to favorites" onClick={() => handleLikeToggle(entityId, content.liked!)}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    )
                }
            </CardActions>
        </Card>
    );
}