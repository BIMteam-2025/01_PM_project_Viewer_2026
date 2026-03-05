import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../util/firebase';
import ButtonAppBar from './ButtonAppBar';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icon from '@mui/icons-material/ArrowBackIosNew';

export default function ProjectPage() {
  const { state } = useLocation();
  const { id } = useParams();
  const [project, setProject] = useState(state?.row ?? null);
  const [loading, setLoading] = useState(!state?.row);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!project && id) {
      setLoading(true);
      const projectRef = ref(db, `ProjectData/1754289286238/${id}`);
      get(projectRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // snapshot.val() is the object of fields for this project
            setProject(snapshot.val());
            setError(null);
          } else {
            setError('Project not found');
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, project]);

  const getField = (obj, ...keys) => {
    if (!obj) return undefined;
    for (const k of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k] !== undefined) return obj[k];
    }
    return undefined;
  };

  const columns = [
    { field: 'field', headerName: 'Field', width: 200 },
    { field: 'value', headerName: 'Value', width: 400 },
  ];

  const rows = project ? Object.entries(project).map(([key, value]) => ({
    id: key,
    field: key,
    value: typeof value === 'object' ? JSON.stringify(value) : String(value),
  })) : [];

  if (loading) return <div>Loading project…</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (


    <div>
      <ButtonAppBar />

      {/* <button onClick={() => window.history.back()}>← Back</button> */}

      <Box sx={{ padding: 3, width: '30%' }}>
        <Button onClick={() => window.history.back()} variant="outlined" sx={{
          backgroundColor: '#000000', color: '#f0f0f0', borderRadius: '8px',
          boxShadow: 8,
          '&:hover': {
            backgroundColor: '#81d3c0',
            boxShadow: 10
          }
        }} size="small"
          startIcon={<Icon />}>Back</Button>
        <Box sx={{ marginBottom: 1, padding: 2, backgroundColor: '#6f6f6f', borderRadius: 2 }}>

          <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 1 }}>
            Project
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 300, marginBottom: 1 }}>
            Code: {getField(project, 'Project Code ', 'projectCode', 'project_code', 'code') ?? '—not found—'}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 300, marginBottom: 1 }}>

            Name: {getField(project, 'Project name ', 'projectName', 'project_name') ?? '—not found—'}
          </Typography>


          <Typography variant="body2" sx={{ color: '#f0f0f0' }}>
            Showing {rows.length} of {rows.length} items.
          </Typography>

        </Box>
      </Box>

      <Paper style={{ padding: '20px', margin: '20px', boxShadow: 8, borderRadius: 15 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#e1e1e1',
              fontWeight: 600,
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '2px solid #e0e0e0',
            },
          }}
        />
      </Paper>
    </div>
  );
}