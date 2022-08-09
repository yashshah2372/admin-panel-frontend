import React from 'react'
import {
    Button,
    styled,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    tableCellClasses,
    Modal,
    Typography,
    TextField 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBannerIcon from "../../assets/images/addBannerIcon.png";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#000",
    fontSize: "16px",
    fontWeight: "500",

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    width: "100%",
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const AddPropButton = styled( Button )({
    border: "2px solid #1ADDFF",
    borderRadius: "5px",
    color: "#000",
    textTransform: "capitalize",
    fontSize: "14px",
    lineHeight: "16px",
    '&:hover' : {
      border: "2px solid #1ADDFF"
    }
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 360,
    bgcolor: 'background.paper',
    border: "1px solid #E5E5E5",
    borderRadius: "5px",
    boxShadow: 24,
    p: 0,
  
  };

  function createData(id, title, url, role, position,status) {
    return {id, title, url, role, position,status };
  }
  
  const rows = [
    createData('#1001', "G Square Ballari City", "http://www.akashbuilders.in/", "Home Page", 1, 1,),
    createData('#1001', "G Square Ballari City", "http://www.akashbuilders.in/", "Home Page", 1, 0,),
    createData('#1001', "G Square Ballari City", "http://www.akashbuilders.in/", "Home Page", 1, 1,),
    createData('#1001', "G Square Ballari City", "http://www.akashbuilders.in/", "Home Page", 1, 1,),
    createData('#1001', "G Square Ballari City", "http://www.akashbuilders.in/", "Home Page", 1, 0,),
  ];
  
  
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


function Ads() {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="p-4">
        <div style={styledBoxTop}>
          <div>All(15) | Home Page(5) | Exclusive Project(12) | Product Page(3)</div>
          <AddPropButton onClick={handleOpen} size="medium" variant="outlined" endIcon={<img src={AddBannerIcon} />}>Add Banner</AddPropButton>
        </div>
        <div className='my-5' style={{border: "2px solid #E5E5E5",borderRadius: "5px"}}>
          <Box sx={{display: "flex",justifyContent: "center",py: 5,}}>
            <input type="text" placeholder='Search...' className='mx-1' style={{width: "280px" , height: "45px" , border: "1px solid #E5E5E5", borderRadius: "4px"}} />
            <FormControl sx={{minWidth: "120px",mx: 1}}>
              <InputLabel id="demo-simple-select-label" sx={{fontSize: "16px",lineHeight: "16px"}}>Role</InputLabel>
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
          <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' >Id</StyledTableCell>
            <StyledTableCell align='center'>Title</StyledTableCell>
            <StyledTableCell align='center'>URL</StyledTableCell>
            <StyledTableCell align='center'>Role</StyledTableCell>
            <StyledTableCell align='center'>Position</StyledTableCell>
            <StyledTableCell align='center'>Status</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ width: "100%"}}
            >
              <StyledTableCell component="th" scope="row" align="center">{row.id}</StyledTableCell>
              <StyledTableCell align="center">{row.title}</StyledTableCell>
              <StyledTableCell align="center">{row.url}</StyledTableCell>
              <StyledTableCell align="center">{row.role}</StyledTableCell>
              <StyledTableCell align="center">{row.position}</StyledTableCell>
              <StyledTableCell align="center" sx={{display: "flex",justifyContent: "center"}}><div style={{
                  minWidth: "81px",
                  maxWidth: "81px",
                  background: row.status ? "#4EC615" : "#FFD700",
                  padding: "4px 15px",
                  borderRadius: "3px",
                  fontSize: "11px"
              }}>{row.status ? "Active" : "In Active"}</div></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align='center' sx={{borderBottom: "2px solid #e5e5e5",py: 1}}>Add Ads</Typography>
            <Box sx={{p: 5}}>
            <Box className='row d-flex justify-content-around'>
              <TextField className='col-4' id="outlined-basic" size="small" label="Title" variant="outlined" />
              <FormControl className='col-2' size="small" >
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Position"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='col-2' size="small">
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className='row d-flex justify-content-around my-5'>
              <Box className='col-5' sx={{border: "1px solid #e5e5e5", borderRadius: "5px",alignItems: "center",display: "flex"}}><input type="file" /></Box>
              <TextField className='col-5' size="small" variant='outlined' label="Redirect URL" />
            </Box>
            <Box className='d-flex justify-content-around '>
              <Button onClick={handleClose} sx={{borderColor: "#1ADDFF",textTransform: "none",color: "#000",width: "160px"}} variant='outlined'>Cancel</Button>
              <Button onClick={handleClose} sx={{backgroundColor: "#FEAA7B",textTransform: "none",color: "#000",width: "160px"}} variant='contained'>Submit</Button>
            </Box>
            </Box>
          </Box>
        </Modal>
    </div>
  )
}

export default Ads;