import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../util/firebase';
import ButtonAppBar from './ButtonAppBar';
import { Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

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

  if (loading) return <div>Loading project…</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (

    
    <div>

        <Paper style={{ padding: '20px', margin: '20px' }}>

      <ButtonAppBar />
                       
      <button onClick={() => window.history.back()}>← Back</button>

      {/* <DataGrid
      rows={rows}
      columns={columns}
      
      />    */}
      <h1>{getField(project, 'Project name', 'projectName', 'project_name') ?? 'Project'}</h1>
      <p>
        Code: {getField(project, 'Project Code ', 'projectCode', 'project_code', 'code') ?? '—not found—'}
      </p>
      {/* Render other fields from `project` as needed */}
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(project, null, 2)}</pre>
        </Paper>
    </div>
  );
}