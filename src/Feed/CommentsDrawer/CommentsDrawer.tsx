import React from 'react';
import {
    Drawer,
    SwipeableDrawer,
    useMediaQuery,
    useTheme,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
} from '@mui/material';

interface CommentsDrawerProps {
    open: boolean;
    onClose: () => void;
    onOpen?: () => void;
    comments: any[];
}

function Comment({ content }) {
    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="user image" src="" />
                </ListItemAvatar>
                <ListItemText
                    primary={content.user.username}
                    secondary={
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {content.text}
                        </Typography>
                    }
                />
                <Button size="small">Reply</Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </ React.Fragment>
    );
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ open, onClose, onOpen, comments }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    if (isDesktop) {
        return (
            <Drawer anchor="right" open={open} onClose={onClose}>
                <Box width={400} p={2}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>Comments</Typography>
                    <Divider />
                    <List>
                        {comments.map((comment, index) => (
                            <Comment key={index} content={comment} />
                        ))}
                    </List>
                </Box>
            </Drawer>
        );
    }

    return (
        <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            onOpen={onOpen || (() => { })}
        >
            <Box p={2}>
                <Typography variant="h6" sx={{ textAlign: 'center' }}>Comments</Typography>
                <Divider />
                <List>
                    {comments.map((comment, index) => (
                        <Comment key={index} content={comment} />
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
};

export default CommentsDrawer;
