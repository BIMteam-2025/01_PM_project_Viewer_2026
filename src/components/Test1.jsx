import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from '../util/firebase';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Test() {
    const [DIS_Projects, setDIS_Projects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);


    useEffect(() => {
        const settingsRef = ref(db, "ProjectData/1754289286238");
        

        const unsubscribe = onValue(
            settingsRef,
            (snapshot) => {
                const data = snapshot.val();
                console.log(settingsRef, data)
                setDIS_Projects(data);
                
                // Extract keys and values from nested objects
                if (data && typeof data === 'object') {
                    const rows = [];
                    let allKeys = new Set();
                    
                    // First pass: collect all possible keys
                    Object.entries(data).forEach(([projectKey, projectObj]) => {
                        if (typeof projectObj === 'object' && projectObj !== null) {
                            Object.keys(projectObj).forEach(key => allKeys.add(key));
                        }
                    });
                    
                    // Second pass: create rows with all extracted data
                    Object.entries(data).forEach(([projectKey, projectObj], index) => {
                        const row = {
                            id: projectKey || index,
                        };
                        
                        if (typeof projectObj === 'object' && projectObj !== null) {
                            // Extract all key-value pairs from the nested object
                            Object.entries(projectObj).forEach(([key, value]) => {
                                row[key] = typeof value === 'object' ? JSON.stringify(value) : value;
                            });
                        }
                        rows.push(row);
                    });
                    
                    console.log("Transformed rows:", rows);
                    setRows(rows);
                    
                    // Generate columns from all extracted keys
                    const generatedColumns = Array.from(allKeys).map((key, idx) => ({
                        field: key,
                        headerName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                        width: 150,
                        editable: true,
                        sortable: true,
                        filterable: true,
                        flex: idx === 0 ? 4 : 1,
                    }));
                    setColumns(generatedColumns);
                } else {
                    setRows([]);
                    setColumns([]);
                }
                
                setLoading(false);
                setError(null);
            },
            (err) => {
                console.error("Firebase fetch error:", err);
                setError("Failed to fetch application settings. Please ensure you have the correct permissions.");
                setLoading(false);
            }
        );
        return () => {
            off(settingsRef);
        };
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 4 }}>
                <CircularProgress size={32} />
                <span>Loading...</span>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3, width: '100%' }}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    Project Data
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                    Showing {rows.length} of {rows.length} projects.
                </Typography>
            </Box>
            
            {error && (
                <Typography variant="body1" sx={{ color: 'red', marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            
            {rows.length > 0 ? (
                <Paper sx={{ height: 800, width: '100%', boxShadow: 5, borderRadius: 2 }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: { paginationModel: { page: 0, pageSize: 15} },
                            density: 'standard',
                        }}
                        pageSizeOptions={[5, 10, 25, 100]}
                        checkboxSelection
                        disableSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#f5f5f5',
                                fontWeight: 600,
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '2px solid #e0e0e0',
                            },
                        }}
                    />
                </Paper>
            ) : (
                <Typography variant="body1">No projects found.</Typography>
            )}
        </Box>
    );

}