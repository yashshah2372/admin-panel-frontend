import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Axios from 'axios';
import TablePagination from '@mui/material/TablePagination';


const AddPropButton = styled( Button )({
    border: "2px solid #1ADDFF",
    borderRadius: "5px",
    color: "#000",
    textTransform: "capitalize",
    fontSize: "14px",
    lineHeight: "16px",
    '&:hover' : {
      border: "2px solid #1ADDFF",
      color: '#000'
    }
  })
  
  const StyledButton = styled(Button)({
    height: "20px",
    minWidth: "36px",
    background: "#C4C4C4",
    fontSize: "12px",
    lineHeight: "14px",
    borderRadius: "5px",
    padding: "6px 6px",
    margin: "2px 3px",
    color: "#000",
    textTransform: "capitalize",
  })
  
  
  const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.head}`]: {
      fontSize: "20px",
      lineHeight: "24px",
      fontWeight: "400",
      padding: "5px 10px"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: "300",
      height: "40px",
      padding: "2px 10px"
    }
  })
  
  const StyledBadge = styled(Badge)({
    height: "30px",
    minWidth: "36px",
    fontSize: "16px",
    lineHeight: "20px",
    borderRadius: "5px",
    padding: "6px 6px",
    margin: "2px 8px",
    color: "#000",
    textTransform: "capitalize",
  
  })
  
  const StyledTableRow = styled(TableRow)({
    maxHeight: "40px",
    minHeight: "40px",
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  });
  
  const styledBoxTop = {
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    padding: "10px 20px",
    width: "100%",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",   
    alignItems: "center",
    marginTop: "30px"      
    };

const Dashboard = () => {
    const [ screen, setScreen ] = useState(0);
    const [page, setPage] = React.useState(0);
    const [count, setCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const signOut = () => {
    };
  
      const ViewProperty=()=>{}
      const EditProperty = ()=>{}
      const ApproveProperty=()=>{}
      const UnApprovePropperty=()=>{}
  
      const datas = [
        {documentID: "#0111",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
        {documentID: "#0112",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
        {documentID: "#0113",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "pending"},
        {documentID: "#0114",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "published"},
        {documentID: "#0115",propertyName: "Presten Avenur, Banglore",position: "Ready To Move",type: "Flat",ownerName: "Builder",status: "draft"},
      ]
  
      const [age, setAge] = React.useState('');
      const [data,setData] = useState([]);
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    useEffect(()=>{
      Axios.get('/projects',{
        params: {page: page+1}
      }).then((res)=>{
        console.log(res);
        setData(res.data.projects)
        setCount(res.data.filteredProjectNumber);
      }).catch((err)=>{
        console.log(err)
      })
    },[page])
    

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    return(
        <div className='p-4'>
        <div style={styledBoxTop}>
          <div>All(15) | BDA/Sales(5) | Builder(12) | Agent(3) | User(10)</div>
          <AddPropButton
            size="medium"
            variant="outlined"
            href="/admin/addproperty"
            endIcon={<AddCircleOutlineIcon />}>Add Property</AddPropButton>
        </div>
        <div className='my-5' style={{border: "2px solid #E5E5E5",borderRadius: "5px"}}>
          <Box sx={{padding: "48px 15vw",borderBottom: "2px solid #E5E5E5"}}>
            <input type="text" placeholder='Search...' className='mx-1' style={{width: "180px" , height: "45px" , border: "1px solid #E5E5E5", borderRadius: "4px"}} />
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label">Owner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{height: "45px"}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">S No.</StyledTableCell>
                    <StyledTableCell align="center">Property Name</StyledTableCell>
                    <StyledTableCell align="center">Position</StyledTableCell>
                    <StyledTableCell align="center">Type</StyledTableCell>
                    <StyledTableCell align="center">Owner</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                    const{
                      documentID,
                      propertyApproval,
                      isSubmitted,
                      projectname,
                      projectpossessionstatus,
                      projecttype,
                      status,
                      buildername
                      }=product
                      let sn = page*10 + index +1;
                    return(
                    <StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row" align="left">{sn}
                      </StyledTableCell>
                      <StyledTableCell align="center">{projectname}</StyledTableCell>
                      <StyledTableCell align="center">{projectpossessionstatus}</StyledTableCell>
                      <StyledTableCell align="center">{projecttype}</StyledTableCell>
                      <StyledTableCell align="center">{buildername}</StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledBadge sx={status==="published" ? {background: "#4BB543"} : status==="pending" ? {background: "#FFFF00"} : {background: "#87CEEB"}}>{status}</StyledBadge>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledButton href={`/adminView/${documentID}`} >View</StyledButton>
                        <StyledButton>Edit</StyledButton>
                        <StyledButton>Approve</StyledButton>
                        <StyledButton>Delete</StyledButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  )})}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </div>
        </div>
    </div>
    )
}


export default Dashboard;