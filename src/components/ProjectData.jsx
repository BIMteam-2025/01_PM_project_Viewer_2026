import React, { useState, useEffect } from 'react';
import { db } from '../util/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ButtonAppBar from './ButtonAppBar';

export default function ProjectData() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'ProjectData'));

     
      const projects = [];
      querySnapshot.forEach((doc) => {
        // Assuming the document data is an object where keys are indices of an array-like structure
        Object.values(doc.data()).forEach(project => {
          projects.push(project);
          console.log('Fetched project:', project);
        });
      });
      setProjectData(projects);
    };
    fetchData();
  }, []);

  return (
    <div>
      <ButtonAppBar />
      <h1>Project Data</h1>
      {projectData.map((project, index) => (
        <div key={index}>
          <h2>{project['Project Name']}</h2>
          <ul>
            <li>BIM Lead: {project['BIM Lead']}</li>
            <li>BIM requirement: {project['BIM requirement'] ? 'Yes' : 'No'}</li>
            <li>Category: {project.Category}</li>
            <li>Description: {project.Description}</li>
            <li>Discipline: {project.Discipline}</li>
            <li>Guardian: {project.Guardian}</li>
            <li>Host: {project.Host}</li>
            <li>Key contact: {project['Key contact']}</li>
            <li>LCA: {project.LCA ? 'Yes' : 'No'}</li>
            <li>Leader: {project.Leader}</li>
            <li>Location Link: <a href={project['Location Link']} target="_blank" rel="noopener noreferrer">{project['Location Link']}</a></li>
            <li>Project Code: {project['Project Code']}</li>
            <li>Revit Version: {project['Revit Version']}</li>
            <li>Status: {project.Status}</li>
            <li>Year: {project.Year}</li>
            <li>automatic scheduled publish: {project['automatic scheduled publish']}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
