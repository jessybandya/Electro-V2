import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {Button,Modal } from 'react-bootstrap';
import Allmembers from './Allmembers';
import { auth, db } from '../../../firebase';
import DashboardLayout from '../../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../../examples/Navbars/DashboardNavbar';
import SoftTypography from '../../../components/SoftTypography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

function Articles() {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);

  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    })

    if (posts1 !== undefined) {
      const finalPosts = posts1.filter(res => {
        return res?.firstName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
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


  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`ELECTRO USERS`, 20, 10);
    const columns = [
      "First Name",
      "Last Name",
      "Phone",
      "Email",
    ];
    const rows = [];
    posts1.map((item) =>
      rows.push([
        item.firstName,
        item.lastName,
        item.phone,
        item.email,
      ])
    );
    doc.autoTable(columns, rows);
    doc.save(`Ebesa Members`);
  }

  return (
    <SoftTypography>
    <div>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >
  <IconButton type="button" sx={{ p: '10px' }} aria-label="pdf">
  <PictureAsPdfIcon onClick={downloadPdf} style={{color:'#e74c3c'}}/>
</IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search user by first name..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    {auth?.currentUser?.uid &&(
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
    </IconButton>   
    )}   
  </Paper>  
  
  <Allmembers filteredPosts={filteredPosts} searchTerm={searchTerm}/>

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
  </Modal.Body>
</Modal>
    </div>
    </SoftTypography>
  )
}

export default Articles