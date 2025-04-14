import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import axios from '../config/axiosInstance';
import Layout from '../Layout/Layout';
import SimpleDialog from '../SimpleDialog/SimpleDialog';
import './Admin.css';
import { Carnival } from '../Models/Carnival';

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200, editable: true },
  { field: 'description', headerName: 'Description', width: 500, editable: true },
  { field: 'location', headerName: 'Location', width: 200, editable: true },
  { field: 'paradeDates', headerName: 'Parade Dates', width: 200, editable: true },
  {
    field: 'links', headerName: 'Websites', width: 400, editable: true,
    renderCell: (params) => {
      const links = params.value || [];
      return links.map((link: any) => `${link.name}: ${link.url}`).join(', ');
    }
  },
];

const paginationModel = { page: 0, pageSize: 20 };

export default function Admin() {
  const [carnivals, setCarnivals] = React.useState<Carnival[]>([]);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");

  React.useEffect(() => {
    fetchCarnivals();
  }, []);

  const fetchCarnivals = async () => {
    try {
      const res = await axios.get('/carnivals');
      setCarnivals(res.data);
    } catch (error) {
      console.error('Failed to fetch carnivals:', error);
      setDialogTitle("An Error Occurred");
      setDialogText("Failed to fetch carnivals.");
      handleOpenErrorDialog();
    }
  };

  const handleRowUpdate = (newRow, oldRow) => {
    console.log("Updated row:", newRow);
    return newRow;
  };

  const handleOpenErrorDialog = () => {
    setOpenErrorDialog(true);
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  const handleAddClick = () => {
    const newId = `${new Date().getTime()}`;
    const newRow = { id: newId, title: '', description: '', location: '', paradeDates: [], image: '', liked: false, links: [], isNew: true };
    setCarnivals((prev) => [...prev, newRow]);
  };

  return (
    <React.Fragment>
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
            processRowUpdate={handleRowUpdate}
            disableRowSelectionOnClick
          />
        </Box>
      </Layout>
      <SimpleDialog
        open={openErrorDialog}
        handleClose={handleCloseErrorDialog}
        title={dialogTitle}
        text={dialogText} />
    </React.Fragment>
  );
}