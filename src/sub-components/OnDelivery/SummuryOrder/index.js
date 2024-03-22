import React,{useState, useEffect,useContext} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector,useDispatch } from 'react-redux';
import Posts from './Post';
import CartContext from '../../../store/cart-context';
import Post from './Post';





function SummuryOrder() {
  let {user} = useSelector((state)=> ({...state}));
  const cartCtx = useContext(CartContext);
  var posts = cartCtx

console.log("Orders: ",posts)
    return (
                <div style={{marginTop:0}}>
                   <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}}/>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}}>IMAGE</TableCell>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}} align="right">NAME</TableCell>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}} align="right">QUANTITY</TableCell>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}} align="right">@ PRICE (KSH)</TableCell>
            <TableCell sx={{backgroundColor: "#e74c3c",fontWeight:"900",color:"#fff"}} align="right">Tot. PRICE (KSH)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
        
        posts.items.map(item => (
          <Post 
              key = {item.id}
              name = {item.name} 
              amount = {item.amount} 
              price = {item.price} 
              image = {item.image}
branchId={item.branchId}
restId={item.restId}
mealId={item.id}
menuId={item.menuId}
received={item.received}
          />
      ))
    
}


        </TableBody>
      </Table>
    </TableContainer>
                </div>
    )
}

export default SummuryOrder