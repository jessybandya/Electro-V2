import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { db } from '../../../../firebase';
import Post from './Post';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
];

export default function StickyHeadTable({ filteredPosts, searchTerm }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);
    const [input, setInput] = React.useState("");

     React.useEffect(() => {
         db.collection('users').onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const menusPerPage = 100;
  const pagesVisited = pageNumber * menusPerPage;

  const pageCount = Math.ceil(posts.length / menusPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}}>FIRST NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">LAST NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">EMAIL</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">PHONE NO.</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">DATE REGISTERED</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchTerm === "" ?(
            posts?.length > 0 ?(
               <>
               {
                   posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post}) => (
                      <Post
                      key={id} 
                      userId={id}
                      firstName={post.firstName}
                      lastName={post.lastName}
                      email={post.email}
                      phone={post.phone}
                      profilePhoto={post.profilePhoto}
                      timestamp={post.timestamp}
                      regNo={post.regNo}
                      yos={post.yos}
                      />
                    ))
    }
               </>
            ):(
               <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
            )
         ):(
          <>
          {
           filteredPosts.length > 0 ?(
             <>
             {
                             filteredPosts.map((posts2) => (
   
   <Post 
   userId={posts2.uid}
   firstName={posts2.firstName}
   lastName={posts2.lastName}
   email={posts2.email}
   phone={posts2.phone}
   profilePhoto={posts2.profilePhoto}
   timestamp={posts2.timestamp}
   regNo={posts2.regNo}
   yos={posts2.yos}
   />
   ))
                             }
             </>
           ):(
             <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
           )       
         
         }
          </>
         )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
