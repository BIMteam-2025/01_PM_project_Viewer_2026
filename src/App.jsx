import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ProjectList from './pages/ProjectList';
import UsersList from './pages/UsersList';
import Settings from './pages/Settings';
import Drafts from './pages/Drafts';
// import ProjectData from './components/ProjectData';


function App() {
  return (
    <BrowserRouter>
 
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/drafts" element={<Drafts />} />
        {/* <Route path="/project-data" element={<ProjectData />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;