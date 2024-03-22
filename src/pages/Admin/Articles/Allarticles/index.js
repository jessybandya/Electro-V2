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



function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
];

export default function StickyHeadTable({ filteredPosts, searchTerm }) {

    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);

    React.useEffect(() => {
      const calculateSumOfRates = async (docRef) => {
          const reviewsSnapshot = await docRef.collection('reviews').get();
          let sum = 0;
          reviewsSnapshot.forEach(reviewDoc => {
              const reviewData = reviewDoc.data();
              sum += reviewData.rating;
          });
          return sum;
      };
  
      const fetchHighestRatedPosts = async () => {
          const electronicsSnapshot = await db.collection('electronics').get();
          const sums = [];
  
          await Promise.all(electronicsSnapshot.docs.map(async elecDoc => {
              const sum = await calculateSumOfRates(elecDoc.ref);
              sums.push({ id: elecDoc.id, sum });
          }));
  
          // Sort sums array by sum in descending order
          sums.sort((a, b) => b.sum - a.sum);
  
          // Fetch the corresponding data for each document based on the sorted sums
          const posts = await Promise.all(sums.map(async ({ id, sum }) => {
              const docSnapshot = await db.collection('electronics').doc(id).get();
              return { id: docSnapshot.id, post: docSnapshot.data(), sum }; // Include sum in the post object
          }));
          // Set the state with the sorted posts
          setPosts(posts);
      };
  
      const interval = setInterval(fetchHighestRatedPosts, 1000); // Fetch every second
  
      // Clear interval on unmount
      return () => clearInterval(interval);
  }, []);



  const menusPerPage = 100;
  const pagesVisited = pageNumber * menusPerPage;




  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}}>NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">CATEGORY</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">PRICE(KSH)</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">DESCRIPTION</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">REVIEWS</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #e74c3c",color:"#e74c3c"}} align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            posts?.length > 0 ?(
               <>
               {
                   posts.slice(pagesVisited, pagesVisited + menusPerPage).map(({id, post, sum}) => (
                      <Post
                      key={id} 
                      electronicID={id}
                      description={post.description}
                      name={post.name}
                      timestamp={post.timestamp}
                      category={post.category}
                      price={post.price}
                      images={post.images}
                      sum={sum}
                      />
                    ))
    }
               </>
            ):(
               <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
