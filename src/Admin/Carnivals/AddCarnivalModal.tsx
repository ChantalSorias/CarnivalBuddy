import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Popover, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Carnival, Link } from '../../Models/Carnival';
import { createCarnival, editCarnival } from '../../services/carnivalService';
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar } from '@mui/x-date-pickers';
import { useSnackbar } from '../../context/SnackbarContext';

interface AddCarnivalModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: () => void;
  carnival?: Carnival | undefined
}

export default function AddCarnivalModal({ open, handleClose, onSave, carnival = undefined }: AddCarnivalModalProps) {
    const MAX_PARADE_DATES = 3;
    const MAX_LINKS = 5;

    const { showSnackbar } = useSnackbar();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);

    const emptyCarnival: Carnival = {
        title: '',
        description: '',
        location: '',
        paradeDates: [],
        image: '',
        links: [],
    };

    const [formData, setFormData] = useState<Carnival>(emptyCarnival);

    useEffect(() => {
        if (carnival) {
            setFormData(carnival);
        } else {
            setFormData(emptyCarnival);
        }
    }, [carnival]);

    const [errors, setErrors] = useState({
        title: false,
        description: false,
        location: false,
        paradeDates: false,
        image: false,
        links: Array(formData.links.length).fill(false)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            location: !formData.location.trim(),
            paradeDates: formData.paradeDates.length < 1,
            image: false,
            links: Array(formData.links.length).fill(false)
        }

        if (formData.links.length > 0) {
            for (let i = 0; i < formData.links.length; i++) {
                var link = formData.links[i];
                if ((link.name.trim() !== "" && link.url.trim() === "")
                    || (link.name.trim() === "" && link.url.trim() !== "")
                    || (link.name.trim() === "" && link.url.trim() === "")
                ) {
                    newErrors.links[i] = true;
                }
            }
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(err => {
            if (typeof err === 'boolean') return !!err;
            if (typeof err === 'object') return err.some(e => e == true);

            return false;
        });

        if (hasErrors) return;

        try {
            var message = "Carnival successfully updated.";
            if (carnival) {
                await editCarnival(formData);
            }
            else {
                message = "Carnival successfully created.";
                await createCarnival(formData);
            }
            
            handleClose();

            setFormData({
                title: '',
                description: '',
                location: '',
                paradeDates: [],
                image: '',
                links: [] as Link[]
            });

            showSnackbar(message, 'success');
            onSave();
        }
        catch (error) {
            showSnackbar(error.response.data || error.response.statusText, 'error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handleDateChange = (date: Dayjs | null) => {
        if (date && !formData.paradeDates.find((d) => d.isSame(date, 'day')) && formData.paradeDates.length < MAX_PARADE_DATES) {
            setFormData(prev => ({ ...prev, paradeDates: [...formData.paradeDates, date] }));
            setErrors(prev => ({ ...prev, paradeDates: false }));
        }
    };

    const handleDeleteParadeDate = (dateToDelete: Dayjs) => {
        setFormData(prev => ({ ...prev, paradeDates: formData.paradeDates.filter((date) => !date.isSame(dateToDelete, 'day'))}));
    };

    const handleLinkChange = (index: number, field: 'name' | 'url', value: string) => {
        const updatedLinks = [...formData.links];
        updatedLinks[index] = { ...updatedLinks[index], [field]: value };
        setFormData(prev => ({ ...prev, links: updatedLinks }));
    };

    const handleAddLink = () => {
        if (formData.links.length < MAX_LINKS) {
            setFormData(prev => ({
            ...prev,
            links: [...prev.links, { name: '', url: '' }]
            }));
        }
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = formData.links.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, links: updatedLinks }));
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" component="form" onSubmit={handleSubmit}>
                <DialogTitle color='primary'>{carnival ? "Edit Carnival" : "Add Carnival"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                        helperText={errors.title ? 'Title is required' : ''}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        error={errors.description}
                        helperText={errors.description ? 'Description is required' : ''}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        error={errors.location}
                        helperText={errors.location ? 'Location is required' : ''}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Parade Dates"
                        placeholder={formData.paradeDates.length >= MAX_PARADE_DATES ? `Max ${MAX_PARADE_DATES} dates selected` : `Select up to ${MAX_PARADE_DATES} dates`}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        InputProps={{
                            startAdornment: formData.paradeDates.map((dateValue) => {
                                const date = dayjs(dateValue);
                                return ( 
                                <Chip
                                    key={date.toISOString()}
                                    label={date.format('YYYY-MM-DD')}
                                    onDelete={() => handleDeleteParadeDate(date)}
                                    size="small"
                                    style={{ marginRight: 4 }}
                                />
                            )}),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} edge="end">
                                        <CalendarTodayIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            readOnly: true,
                        }}
                        error={errors.paradeDates}
                        helperText={errors.paradeDates ? 'At least one parade date is required' : ''}
                    />
                    <Box><Typography variant='caption'>Websites</Typography></Box>
                    {formData.links.map((link, index) => (
                        <Box key={index} display="flex" gap={2} alignItems="center" mb={2}>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Category Name"
                                value={link.name}
                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                                error={errors.links[index]}
                                helperText={errors.links[index] ? 'Category Name is required' : ''}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="URL"
                                value={link.url}
                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                error={errors.links[index]}
                                helperText={errors.links[index] ? 'URL is required' : ''}
                            />
                            <IconButton onClick={() => handleRemoveLink(index)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}

                    <Button
                        variant="outlined"
                        onClick={handleAddLink}
                        disabled={formData.links.length >= MAX_LINKS}
                        >
                        Add Website
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">{carnival ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <DateCalendar onChange={handleDateChange} />
            </Popover>
        </>
    );
}