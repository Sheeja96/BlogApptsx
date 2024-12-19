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
    const newPost: Post = { id: posts.length + 1, ...values };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save to localStorage
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
