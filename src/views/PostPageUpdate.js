import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar, Image } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";








export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName]=useState("")
  const [previewImage, setPreviewImage] = useState("https://zca.sg/img/placeholder");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();






  async function updatePost() {

    let imageURL = previewImage;

    if (image) {
      const deleteRef = ref(storage, `images/${imageName}`);
      await deleteObject(deleteRef);
      console.log("Old image has been deleted from Google Cloud Storage!");

      const imageReference = ref(storage, `images/${image.name}`);
      const response = await uploadBytes(imageReference, image);
      imageURL = await getDownloadURL(response.ref);
    }

    await updateDoc(doc(db, "posts", id), { caption, image: imageURL });
    navigate("/");
  }


  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setPreviewImage(post.image);
    setImageName(post.imageName);

  }



  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);





  
  return (
    <div>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Image
           src={previewImage}
           style={{
           display:"block",
             objectFit: "cover",
             width: "10rem",
             height: "10rem",
           }}
         />



          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  getPost(id);
                  setImage("");
                  return;
                }
                const imageFile = e.target.files[0];
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
              }}
          
              
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

