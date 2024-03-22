import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {Button, Modal} from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { db, storage } from '../../../../../firebase';
import { toast } from 'react-toastify';
import { useState } from 'react';
import firebase from 'firebase'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Fab, Grid, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import ImagesList from './ImagesList';

function Addimages() {
  const {bool, id} = useParams()
  const [modalShow, setModalShow] = React.useState(false);
  const history = useNavigate("")
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [loading, setLoading] = useState(false)
  const [modalImage, setModalImage] = useState(false)
  const theme = useTheme();
  const [file, setFile] = useState(null)


  const handleCloseModal = () =>{
    setModalImage(false)
    setFile(null)
  }


  React.useEffect(() => {
    setModalShow(bool)
  }, [bool, id])

  const handleClose = () =>{
    setModalShow(false)
    history('/admin')
  }



  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onUpload = async () => {
    setLoading(true)
    if(file === null){
      toast.error("Kindly add an image!")
      setLoading(false)
    }else{
      setLoading(true)
      const storageRef = storage.ref()
      const fileRef = storageRef.child(file.name)
      await fileRef.put(file)
      setLoading(true)
      db.collection("electronics").doc(id).update({
        images: firebase.firestore.FieldValue.arrayUnion({
          url: await fileRef.getDownloadURL(),
        })
      })
      toast.success("successfully apploaded a photo...")
      setLoading(false)
    }
  }

  return (
    <>
    <Dialog
    fullWidth={fullWidth}
    maxWidth={maxWidth}
    open={modalShow}
    onClose={handleClose}
    sx={{ zIndex: 1000}}
  >
  <DialogContent
  sx={{
    [theme.breakpoints.up("xs")]: {
      padding: 0
    },
  }}
  >
  <center style={{marginBottom:5,marginTop:5}}>     
  <Fab onClick={() => setModalImage(true)} color="primary" aria-label="add" style={{backgroundColor:'#e74c3c'}}>
  <Add fontSize="large" />
</Fab>
</center>
<ImagesList  albumId={id} />

  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose}>Close</Button>
</DialogActions>
  </Dialog>




  <Modal
    show={modalImage}
    onHide={handleCloseModal}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
      <center><b><h4 style={{fontWeight:'bold'}}>UPLOAD IMAGE</h4></b></center>
      <hr />
      <center style={{flexDirection:'column'}}>
      <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={6}>
      <Box sx={{ mt: 3, ml: 0 }}>
      <TextField
      accept="image/*"
      id="raised-button-file"
      type="file"
      onChange={onFileChange}
        // fullWidth
      />
      </Box>
    </Grid>
      </ThemeProvider>
      <div>
      <Button onClick={onUpload} component="span" style={{backgroundColor:'#e74c3c',border:'1px solid #e74c3c',marginTop:5}}>
        {loading === true ?(
          <>Uploading...</>
        ):(
          <>Upload</>
        )}
    </Button>
      </div> 
      </center>
    </Modal.Body>
  </Modal>
  </>
  )
}

export default Addimages