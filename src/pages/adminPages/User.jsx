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
    TextField ,
    Checkbox
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import leadIcon from "../../assets/images/leadIcon.png";


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

  function createData(id, name, email, contact,role, date,status) {
    return {id, name, email, contact,role, date,status };
  }
  
  const rows = [
    createData('#0001', "Nirmal Bisht", "enquiry@ag-enterprises.com", "9464955655",'User', `11/05/2022 05:00 PM`, 1,),
    createData('#0001', "Nirmal Bisht", "enquiry@ag-enterprises.com", "9464955655",'User', `11/05/2022 05:00 PM`, 0,),
    createData('#0001', "Nirmal Bisht", "enquiry@ag-enterprises.com", "9464955655",'User', `11/05/2022 05:00 PM`, 1,),
    createData('#0001', "Dattaraj Constructions", "nirmalshrma123@gmail.com", "9464955655",'Builder', `11/05/2022 05:00 PM`, 1,),
    createData('#0001', "Dattaraj Constructions", "nirmalshrma123@gmail.com", "9464955655",'Builder', `11/05/2022 05:00 PM`, 0,),
    createData('#0001', "Dattaraj Constructions", "nirmalshrma123@gmail.com", "9464955655",'Builder', `11/05/2022 05:00 PM`, 0,),
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

function User() {

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
          <div>All(15) | BDA/Sales(5) | Builder(12) | Agent(3) | User(10)</div>
          <AddPropButton onClick={handleOpen} size="medium" variant="outlined" endIcon={<img src={leadIcon} />}>Add User</AddPropButton>
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
          <Box sx={{display: "flex",justifyContent: "space-between",px: 3}}>
            <Box>Show 25 entries</Box>
            <Box>Bulk Action <FormControl sx={{width: "80px",maxHeight: "20px"}} size="small">
                        <InputLabel id="demo-simple-select-label" sx={{minHeight: "20px",fontSize: "10px"}}>Delete</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Delete"
                        onChange={handleChange}
                        sx={{minHeight: "20px"}}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl></Box>
          </Box>
          <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' ><Checkbox /></StyledTableCell>
            <StyledTableCell align='center' >Id</StyledTableCell>
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align='center'>Email Id</StyledTableCell>
            <StyledTableCell align='center'>Contact No.</StyledTableCell>
            <StyledTableCell align='center'>Role</StyledTableCell>
            <StyledTableCell align='center'>Last Visit</StyledTableCell>
            <StyledTableCell align='center'>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ width: "100%"}}
            >
              <StyledTableCell align='center' ><Checkbox /></StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">{row.id}</StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.contact}</StyledTableCell>
              <StyledTableCell align="center">{row.role}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
  )
}

export default User;