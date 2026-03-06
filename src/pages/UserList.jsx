import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../util/firebase';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button } from '@mui/material';
import ButtonAppBar from '../components/ButtonAppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { remove } from 'firebase/database';





export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const usersRef = ref(db, 'RevitUsers');
        get(usersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const usersData = snapshot.val();

                    const usersArray = Object.entries(usersData).map(([id, user]) => ({ id, ...user }));

                    // console.log('Fetched users:', ...usersArray);
                    setUsers(usersArray);
                    setError(null);
                } else {
                    setError('No users found');
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    const columns = [
        {
            field: 'actions', headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'Name', headerName: 'Name', width: 150 },
        {
            field: 'Active Revit License', headerName: 'Active Revit License', width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Yes', 'No'],

        },



        { field: 'Address', headerName: 'Address', width: 200 },
        { field: 'Advanced', headerName: 'Advanced', width: 150 },
        { field: 'Basic', headerName: 'Basic', width: 150 },
        { field: 'Basic date', headerName: 'Basic date', width: 150 },
        { field: 'Current assessment Revit', headerName: 'Current assessment Revit', width: 150 },
        { field: 'Department', headerName: 'Department', width: 150 },
        { field: 'Initial assessment Revit', headerName: 'Initial assessment Revit', width: 150 },
        { field: 'Intended to use Revit', headerName: 'Intended to use Revit', width: 150 },
        { field: 'Intended to use Rhino', headerName: 'Intended to use Rhino', width: 150 },
        { field: 'Manager', headerName: 'Manager', width: 150 },
        { field: 'Position', headerName: 'Position', width: 150 },
        { field: 'ReAssessment', headerName: 'ReAssessment', width: 150 },
        { field: 'Self assessment Revit', headerName: 'Self assessment Revit', width: 150 },
        { field: 'Self assessment Rhino', headerName: 'Self assessment Rhino', width: 150 },
        { field: 'Status', headerName: 'Status', width: 150 },

    ];



    // Function to delete a user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const userRef = ref(db, `RevitUsers/${id}`);
                await remove(userRef);
                // The useEffect listener or manual state update will refresh the list
                setUsers((prev) => prev.filter((user) => user.id !== id));
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    // Placeholder for Edit (you would likely use a Modal here)
    const handleEdit = (user) => {
        console.log("Edit user:", user);
        // Open your edit form with this user's data
    };

    return (
        <>


            <ButtonAppBar />


            <Box sx={{   padding: 3}}>

                <Box sx={{ width: '40%',marginBottom: 1, padding: 2, backgroundColor: '#838a87', borderRadius: 2, border: '1px solid #000000', boxShadow: 4 }}>

                    <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1, color: '#ffffff' }}>
                        DIS Users Page
                    </Typography>
                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => { handleEdit({ id: '', name: '', email: '', role: '', department: '' }) }}
                    sx={{
                        mb: 8, backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: '#b67171'
                        }
                    }}


                >
                    Add New User
                </Button>

                <Paper sx={{ height: 1200, width: '100%', boxShadow: 2, borderRadius: 2 }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        loading={loading}
                        showToolbar

                        pageSize={100}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#838a87',  // Blue background
                                color: 'white',             // White text
                                fontWeight: 1000,            // Bolder font
                                fontSize: '20px',           // Larger font
                                textTransform: 'uppercase', // Uppercase text
                                borderBottom: '8px solid #000000', // Darker border
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '2px solid #e2e2e2',
                            },
                        }}
                    />
                </Paper>
            </Box>
        </>


    );
}
