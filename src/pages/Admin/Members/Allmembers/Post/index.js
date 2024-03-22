import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Post({ userId, firstName, lastName, email, phone, profilePhoto, timestamp, regNo, yos}) {
  var d = timestamp;
  //var d =val.timestamp;
  
  //NB: use + before variable name
  var date = new Date(+d);
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell > 
        {firstName}         
        </TableCell>
        <TableCell align='right'>  
        {lastName}                
        </TableCell>
        <TableCell align='right'>
        {email}                   
        </TableCell>
        <TableCell align='right'>
        {phone}                   
        </TableCell>

        <TableCell align='right'>
        {date.toDateString()}                 
        </TableCell>
        <TableCell align='right'>
         <DeleteForeverIcon style={{color:'#e74c3c'}} fontSize='medium'/>                  
        </TableCell>
  </TableRow>
  )
}

export default Post