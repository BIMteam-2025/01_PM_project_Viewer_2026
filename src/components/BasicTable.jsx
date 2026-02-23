import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { db } from '../util/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

export default function BasicTable({ collectionName = 'RevitUsers' }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setRows(data);
      if (data.length > 0) {
        const keys = Object.keys(data[0]).filter(k => k !== 'id');
        setColumns(keys);
      } else {
        setColumns([]);
      }
    } catch (error) {
      console.error('Error fetching data from', collectionName, error);
      setRows([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  const addRow = async () => {
    try {
      await addDoc(collection(db, collectionName), { createdAt: new Date().toISOString() });
      await fetchData();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <CircularProgress size={20} />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Button onClick={addRow} variant="contained">Add</Button>
        <Button onClick={fetchData} variant="outlined">Refresh</Button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              {columns.length === 0 ? (
                <TableCell>No fields</TableCell>
              ) : (
                columns.map(col => (
                  <TableCell key={col}>{col}</TableCell>
                ))
              )}
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map(col => (
                  <TableCell key={col} component="td" scope="row">
                    {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col] ?? '')}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Button onClick={() => deleteRow(row.id)} color="error" size="small">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}