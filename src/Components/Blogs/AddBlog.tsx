import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface AddPostProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const AddBlog: React.FC<AddPostProps> = ({ posts, setPosts }) => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  // Handle post addition
  const handleAddPost = (
    values: { title: string; content: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    // Always read posts from localStorage
    const storedPosts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
  
    // Get a unique ID
    const currentId = parseInt(localStorage.getItem("postIdCounter") || "1", 10);
  
    const newPost: Post = { id: currentId, ...values };
  
    // Add the new post to the stored posts
    const updatedPosts = [...storedPosts, newPost];
  
    // Save to localStorage and update state
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem("postIdCounter", (currentId + 1).toString());
    setPosts(updatedPosts);
  
    resetForm();
    navigate("/dashBoard");
  };

  return (
    <Box className="add-blog-page">
      <Container maxWidth="md" sx={{ pt: 4 }} className="blog-form-container">
        <Typography variant="h4" gutterBottom className="h4">
          Add New Post
        </Typography>
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={validationSchema}
          onSubmit={handleAddPost}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="title"
                label="Title"
                fullWidth
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={<ErrorMessage name="title" />}
              />
              <Field
                as={TextField}
                name="content"
                label="Content"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                error={touched.content && Boolean(errors.content)}
                helperText={<ErrorMessage name="content" />}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Add Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default AddBlog;
