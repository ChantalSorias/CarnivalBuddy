import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, InputBase, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatToLocalDate } from '../../utils/dateUtils';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import './Post.css';
import CommentsDrawer from '../CommentsDrawer/CommentsDrawer';

export default function Post({ content }) {
    const [imgSrc, setImgSrc] = useState(content.image);
    const defaultImage = "src/assets/default-carnival-image.jpg";
    const [commentsOpen, setCommentsOpen] = useState(false);

    return (
        <>
            <Card className='post-card'>
                <CardHeader
                    avatar={
                        <Avatar aria-label="user image"
                            src={content.user.image} />
                    }
                    title={content.user.fullName}
                    subheader={formatToLocalDate(content.createdAt)}
                    action={
                        <div>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderIcon />
                            </IconButton>
                            <IconButton aria-label="comments" onClick={() => setCommentsOpen(true)}>
                                <ModeCommentOutlinedIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </div>
                    }
                />
                {content.image !== null ?
                    <CardMedia
                        className='post-image'
                        component="img"
                        image={imgSrc}
                        height={320}
                        onError={() => setImgSrc(defaultImage)}
                        alt="post image"
                    /> : ""}
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {content.text}
                    </Typography>
                </CardContent>
                {/* <CardActions className='post-actions'>
                <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ModeCommentOutlinedIcon />
                </IconButton>
            </CardActions> */}
                {/* <CardActions className='post-comment' sx={{ borderTop: 1, borderColor: '#0000004D', mr: 2, ml: 2 }}>
                <Avatar aria-label="user image" sx={{ width: 24, height: 24 }} />
                <InputBase
                    placeholder="Write a comment..."
                    multiline
                    maxRows={2}
                    className='post-comment-text-field'
                    size="small"
                    sx={{ p: 0.5 }}
                    inputProps={{ 'aria-label': 'write a comment' }}
                />
                <IconButton aria-label="leave a comment" sx={{ color: 'secondary.main' }}>
                    <SendIcon />
                </IconButton>
            </CardActions> */}
            </Card >
            <CommentsDrawer
                open={commentsOpen}
                onClose={() => setCommentsOpen(false)}
                comments={content.comments}
            />
        </>
    )
}