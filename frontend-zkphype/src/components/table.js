import * as React from 'react';
    import { styled } from '@mui/material/styles';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell, { tableCellClasses } from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';
import './navigation.css';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import moment from 'moment/moment';

 
const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#42424B',
      color: 'grey',
      borderBottom: '2px solid black'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color:'white',
      borderBottom: '2px solid black'
    },
  }));
  const StyledTableCellStatus = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#42424B',
      color: 'grey',
      borderBottom: '2px solid black'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
      color:'white',
      borderBottom: '2px solid black'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(() => ({
   
      backgroundColor: '#151515',
    color:'white',
    border: 'black',
    cursor: "pointer",
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
 
   
function TableTransaction({interchainTransactions}) {
  const navigate= useNavigate();
  console.log(interchainTransactions,"row")
    const getDetails=(row)=>{
     
 navigate('/detailPage',{state:{row:row}})

    }

    const truncateString=(str, num)=> {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num) + '...'
    }
      return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ZKP Hash</StyledTableCell>
                <StyledTableCell align="right">Transactionhash</StyledTableCell>
                <StyledTableCell align="right">Origin chain</StyledTableCell>
                <StyledTableCell align="right">Destination chain</StyledTableCell>
                <StyledTableCell align="right">Created</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interchainTransactions && interchainTransactions?.length>0 && interchainTransactions.map((row) => {
                let dateObj = new Date(row?.blockTimestamp * 1000);
                let formatdate=moment(dateObj).format('MM/DD/YYYY HH:MM');
                return(
                <StyledTableRow key={row?.destinationChain} onClick={()=>getDetails(row,formatdate)}>
                  <StyledTableCell className={"hash"} component="th" scope="row">
                {truncateString(row?.hash,16)}
                <span class="tooltiptext">{row?.hash}</span>
                  </StyledTableCell>
                  <StyledTableCell className={"hash"} align="right">{truncateString(row?.transactionHash,16)}
                  <span class="tooltiptext">{row?.transactionHash}</span>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.origin}</StyledTableCell>
                  <StyledTableCell align="right">{row?.dest}</StyledTableCell>
                  <StyledTableCell align="right">{formatdate}</StyledTableCell>
                </StyledTableRow>
              )}
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  export default TableTransaction;