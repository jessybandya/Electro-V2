import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Grid} from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { produce } from "immer"
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from 'react-toastify'
import { useHistory } from "react-router-dom"
import ShareIcon from '@mui/icons-material/Share';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Post({ name,amount,price,branchId,restId,received,mealId,image }) {
    const [open, setOpen] = React.useState(false);
    const [branch, setBranch] = useState()

    useEffect(() => {
      db.collection('branches').doc(`${branchId}`).onSnapshot((doc) => {
        setBranch(doc.data());
      });
  }, [])
  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  return (
    <React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
      </TableCell>
      <TableCell component="th" scope="row">
      <Avatar alt="Travis Howard" src={image} />
      </TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{amount}</TableCell>
      <TableCell align="right">{numberWithCommas(parseFloat(price).toFixed(2))}</TableCell>
      <TableCell align="right">{numberWithCommas(parseFloat(amount * price).toFixed(2))}</TableCell>
    </TableRow>
  </React.Fragment>
  )
}

export default Post
