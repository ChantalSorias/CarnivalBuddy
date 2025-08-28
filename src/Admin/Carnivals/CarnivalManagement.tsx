import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import Layout from '../../Layout/Layout';
import { Carnival } from '../../Models/Carnival';
import { deleteCarnival, getCarnivals } from '../../services/carnivalService';
import { useSnackbar } from '../../context/SnackbarContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCarnivalModal from './AddCarnivalModal';

const paginationModel = { page: 0, pageSize: 20 };

export default function CarnivalManagement() {
  const { showSnackbar } = useSnackbar();
  
  const [carnivals, setCarnivals] = useState<Carnival[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addCarnivalModalOpen, setAddCarnivalModalOpen] = useState(false);
  const [selectedCarnival, setSelectedCarnival] = useState<Carnival>();

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 500 },
    { field: 'location', headerName: 'Location', width: 200 },
    { field: 'paradeDates', headerName: 'Parade Dates', width: 200 },
    {
      field: 'links', headerName: 'Websites', width: 400,
      renderCell: (params) => {
        const links = params.value || [];
        return (
      <div>
        {links.map((link: any, index: number) => (
          <span key={index}>
            {link.name}: {link.url}
            <br /><br />
          </span>
        ))}
      </div>
    );
      }
    },
    { field: 'actions', headerName: "Action", width: 200,
      renderCell: (params) => (
        <>
        <IconButton
          color="error"
          onClick={() => handleEditClick(params.row)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => handleDeleteClick(params.row)}
        >
          <DeleteIcon />
        </IconButton>
        </>
      ),
    }
  ];

  useEffect(() => {
    fetchCarnivals();
  }, []);

  const fetchCarnivals = async () => {
    try {
      const carnivals = await getCarnivals();
      setCarnivals(carnivals);
    } catch (error) {
      console.error('Failed to fetch carnivals:', error);
      showSnackbar(error.response.data || error.response.statusText, 'error');
    }
  };

  const handleDeleteClick = (carnival: Carnival) => {
    setDeleteDialogOpen(true);
    setSelectedCarnival(carnival);
  };

  const handleEditClick = (carnival: Carnival) => {
    setSelectedCarnival(carnival);
    setAddCarnivalModalOpen(true);
  }

  const handleDelete = async () => {
    try {
      await deleteCarnival(selectedCarnival!.id!);
      showSnackbar("Carnival successfully deleted.", 'success');

      fetchCarnivals();

      setDeleteDialogOpen(false);
      setSelectedCarnival(undefined);
    } catch (error) {
      showSnackbar(error.response.data || error.response.statusText, 'error');
    }
  }

  const handleAddClick = () => {
    setAddCarnivalModalOpen(true);
  };

  const handleClose = () => {
    setAddCarnivalModalOpen(false);
    setSelectedCarnival(undefined);
  };

  return (
    <>
      <Layout>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Carnival Admin Dashboard
          </Typography>

          <Button variant="contained" onClick={handleAddClick}>
            + Add Carnival
          </Button>
          <DataGrid
            rows={carnivals}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[20, 50]}
            sx={{
              border: 0,
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#ede7f6',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#fff3e0',
              },
            }}
            getRowHeight={(params) => {
              if (params.model.isNew) {
                return 60;
              }
              return 'auto';
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Layout>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Carnival?</DialogTitle>
        <DialogContent>Are you sure you want to delete this carnival?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
        <AddCarnivalModal
          open={addCarnivalModalOpen}
          handleClose={handleClose}
          onSave={fetchCarnivals}
          carnival={selectedCarnival}
      />
    </>
  );
}
