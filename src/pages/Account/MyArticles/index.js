import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import AddArticle from './AddArticle';
import { auth, db } from '../../../firebase';
import AllArticles from '../../Articles/AllArticles';
import Allmyarticles from './Allmyarticles';


function MyArticles({ userId }){
    const [modalShow, setModalShow] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredPosts, setFilteredPosts] = React.useState([]);
    const [posts1, setPosts1] = React.useState([]);

    React.useEffect(() => {
      db.collection('articles').where("ownerId","==", userId).onSnapshot((snapshot) => {
        setPosts1(snapshot.docs.map((doc) => doc.data()))
      })
  
      if (posts1 !== undefined) {
        const finalPosts = posts1.filter(res => {
          return res.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        })
  
        setFilteredPosts(finalPosts)
      }else {
        return <div>No results3</div>
      }
    }, [searchTerm])
  
    const updateSearchResults = (e) => {
      setSearchTerm(e.target.value)
      // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
    }
    return(
        <div>
        <Paper
        component="form"
        sx={{ display: 'flex', alignItems: 'center'}}
      >

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          onChange={updateSearchResults}
          placeholder="Search my articles"
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {userId === auth?.currentUser?.uid &&(
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DriveFolderUploadIcon style={{color:'#e74c3c'}} onClick={() => setModalShow(true)}/>
          </IconButton>        
        )}
      </Paper>  
      
      <Allmyarticles filteredPosts={filteredPosts} searchTerm={searchTerm} userId={userId}/>
      <Modal
      show={modalShow}
      style={{zIndex:2000}}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Article
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddArticle setModalShow={setModalShow}/>
      </Modal.Body>
    </Modal>
        </div>
  )
}
export default MyArticles