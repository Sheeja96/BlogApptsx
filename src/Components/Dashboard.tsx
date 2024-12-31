import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; 
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  // Retrieve data from localStorage
  useEffect(() => {
    const storedUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const storedPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    setUsers(storedUsers);
    setPosts(storedPosts);
  
    // Initialize the postIdCounter if it doesn't exist
    if (!localStorage.getItem("postIdCounter")) {
      const maxId = storedPosts.reduce((max, post) => Math.max(max, post.id), 0);
      localStorage.setItem("postIdCounter", (maxId + 1).toString());
    }
  }, []);

  // Handle post deletion
  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update localStorage
    }
  };
  

  return (
    <Box sx={{  minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box component="main" sx={{ p: 3 }}>
          {/* Dashboard Stats */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{  boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" >
                    Registered Users
                  </Typography>
                  <Typography variant="h4" >
                    {users.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{  boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" component="div" >
                    Total Posts
                  </Typography>
                  <Typography variant="h4" >
                    {posts.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Post Titles */}
          <Box mt={4}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Post Titles
            </Typography>
            <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "#ffffff" }}>
              <List>
                {posts.map((post) => (
                  <React.Fragment key={post.id}>
                    <ListItem>
                      <ListItemText
                        primary={post.title}
                        secondary={post.content.slice(0, 50) + "..."}
                      />
                      <Box>
                      
                        <IconButton color="primary" onClick={() => navigate(`/edit/${post.id}`)}>
                        <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(post.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;