import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface EditPostProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const EditPost: React.FC<EditPostProps> = ({ posts, setPosts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === parseInt(id || "", 10));

  if (!post) {
    return <Typography variant="h5">Post not found</Typography>;
  }

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  // Handle post update
  const handleUpdatePost = (values: { title: string; content: string }) => {
    const updatedPosts = posts.map((p) =>
      p.id === parseInt(id || "", 10) ? { ...p, ...values } : p
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update localStorage
    navigate("/dashBoard");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Post
      </Typography>
      <Formik
        initialValues={{ title: post.title, content: post.content }}
        validationSchema={validationSchema}
        onSubmit={handleUpdatePost}
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
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditPost;