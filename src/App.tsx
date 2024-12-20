import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/UserAccess/RegisterPage';
import LoginPage from './Components/UserAccess/LoginPage';
import AddBlog from './Components/Blogs/AddBlog';
import EditPost from './Components/Blogs/EditBlog';
import Navbar from './Components/NavBar';
import Dashboard from './Components/Dashboard';

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on initial render
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]') as Post[];
    setPosts(storedPosts);
  }, []);

  return (
    <Box>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddBlog posts={posts} setPosts={setPosts} />} />
          <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;