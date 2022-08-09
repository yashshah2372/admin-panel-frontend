import { 
    Box,
    InputLabel,
    InputBase,
    FormControl,
    Grid,
    Divider,
    Paper,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Modal,
    Typography,
    styled
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { fontSize } from '@mui/system';
import React,{useEffect, useState} from 'react';
import TextEditor from '../../components/TextEditor'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from 'react-select'
import Axios from 'axios';
import { RevolvingDot } from 'react-loader-spinner';
import {BasicAmenitiesData, ConvenienceAmenitiesData, EnvironmentAmenitiesData, SecurityAmenitiesData, SportsAmenitiesData} from  '../../assets/demoData/AmenitiesData'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    let lat=12.9716,lng=77.5946;
    const [Lat,setLat] = useState(0);
    const [Lng,setLng] = useState(0);
    useEffect(()=>{
        console.log(props)
    },[Lat,Lng])
    return(
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 12.9716, lng: 77.5946 }}
        onClick={e =>{
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
            props.handleLatLng(e.latLng.lat(),e.latLng.lng())
            console.log(Lat,Lng)
            } }
    >
        {/* {props.isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />} */}
        {Lat && Lng && <Marker position={{ lat: Lat, lng: Lng }} />}
        
    </GoogleMap>
    )
}))


const UploadWrapper = styled(Box)({
    border: '1px solid #C4C4C4',
    borderRadius: "3px",
    padding: "0px 12px",
    marginTop: "20px",
    display: 'flex',
    justifyContent: "space-between",
    maxWidth: "320px",   
    overflowX: 'auto'
})

const SelectImage = styled(Box)({
    borderRadius: "10px",
    position: 'relative',
    border: '1px solid #C4C4C4',
    background: "#e5e5e5",
    lineHeight: "27px",
    height: "31px",
    width: '133px',
    textAlign: "center",
    margin: "7px"
})

const inputImages = {
    opacity: 0,
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    p: 0,
    m: 0,
    cursor: "pointer"
}

const styledBoxTop = {
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    padding: "10px 20px",
    width: "80vw",
    border: "1px solid #E5E5E5",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",   
    alignItems: "center",
    marginTop: "30px" , 
    fontSize: "22px"    
    };

    const StyledInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: 20,
        },
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
          border: '1px solid #C4C4C4',
          fontSize: 16,
          width: '100%',
          padding: '5px 12px',
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ]),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.15)} 0 0 0 0.15rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }));

    const StyledLabel = styled(InputLabel)(()=>({
        fontSize: 18,
        color: "#000",
    }))

    const StyledUploadLabel = styled(InputLabel)(()=>({
        fontSize: 18,
        color: "#000",
    }))

    const projectTypeOptions = [
        { value: 'villa', label: 'Villa' },
        { value: 'flat', label: 'Flat' },
        { value: 'house', label: 'House' }
      ];
    
    const configurationOptions = [
        {value: '1bhk', label: '1 BHK'},
        {value: '2bhk', label: '2 BHK'},
        {value: '3bhk', label: '3 BHK'},
        {value: '4bhk', label: '4 BHK'},
        {value: '5bhk', label: '5 BHK'},
        {value: '6bhk', label: '6 BHK'},
    ];
    const possessionStatusOptions = [
        {value: 'Ready To Move', label: 'Ready To Move'},
        {value: 'Under Construction', label: 'Under Construction'},
        {value: 'Upcoming Project', label: 'Upcoming Project'},
    ]
const UploadedImg = ({url,data,setData,index,name,floor}) => {
    return(
        <Box sx={{position: "relative",m: 1}}>
            <CancelIcon sx={{position: "absolute",top:'-4px',right: '-4px',fontSize: "14px",cursor: 'pointer',display: floor ? 'none' : ''}} onClick={(e)=>{
                let imgs = data[name];
                imgs.splice(index,1);
                setData({...data,[name]: imgs})
            }} />
            <img src={url} width={60} height={60}  />
        </Box>
    )
}

const AddProperty = () => {

    const [screen, setScreen] = useState(0)
    const [aboutProject, setAboutProject] = useState("")
    const [projectSpecs, setProjectSpecs] = useState("")
    const [builderDesc, setBuilderDesc] = useState("")
    const [data,setData] = useState({
        projectname: '',
        projectlocation: '',
        projectlocality: '',
        projectcity: '',
        projectstate: '',
        projecttype: '',
        projectsubtype: '',
        projectconfiguration: '',
        projecttowerunit: '',
        projectpossessionstatus: '',
        projectarea: 0,
        projectfacing: '',
        projectfurnishing: '',
        projectreranumber: '',
        projectminspace: 0,
        projectmaxspace: 0,
        projectminprice: 0,
        projectmaxprice: 0,
        aboutproject: '',
        projectspecification: '',
        externalimages: [],
        internalimages: [],
        amenitiesimages: [],
        othersimages: [],
        floorplan: [],
        country: '',
        projectlongitude: '',
        projectlatitude: '',
        basicamenities: '',
        convenienceamenities: '',
        environmentamenities: '',
        securityamenities: '',
        sportsamenities: '',
        buildername: '',
        builderimage: '',
        builderaddress: '',
        builderyoe: 0,
        builderlocality: '',
        builderproject: '',
        companytype: '',
        buildercontact: 0,
        builderwebsite: '',
        builderemail: '',
        builderdescription: '',
        ocimage: '',
        ccimage: '',
        khatano: 0,
        khatatype: '',
        reraapproved: false,
        reraauthority: '',


    })
    const [floorData,setFloorData] = useState({
        floortype: '',
        carpetarea: '',
        pricepersqft: '',
        totalprice: '',
        floorimage: ''
    })
    const [floorsData,setFloorsData] = useState([]);
    const [basicAmenities, setBasicAmenities] = useState([])
    const [convenienceAmenities, setConvenienceAmenities] = useState([])
    const [environmentAmenities, setenvironmentAmenities] = useState([])
    const [sportsAmenities, setSportsAmenities] = useState([])
    const [securityAmenities, setSecurityAmenities] = useState([])
    const [loader,setLoader] = useState(false);

    const handleBasicAmenitiesChange=(val)=>{
        setBasicAmenities(val)
    }

    const handleConvenienceAmenitiesChange=(val)=>{
        setConvenienceAmenities(val)
    }

    const handleEnvironmentAmenitiesChange=(val)=>{
        setenvironmentAmenities(val)
    }

    const handleSportsAmenitiesChange=(val)=>{
        setSportsAmenities(val)
    }

    const handleSecurityAmenitiesChange=(val)=>{
        setSecurityAmenities(val)
    }

    const handleTextFieldChange = (e)=>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    
    const handleNumberFielChange = (e) => {
        setData({
            ...data,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const handleMultipleImg = (e) => {
        let imgs=[];
        let files = Array.from(e.target.files);
        files.map(val=>imgs.push(val));  
        setData({...data,[e.target.name]: imgs})
    }

    const handleSingleImg = (e) => {
        setData({...data,[e.target.name]: e.target.files[0]})
    }

    const handleLatLng = (lat,lng) => {
        setData({
            ...data,
            projectlatitude: lat,
            projectlongitude: lng
        })
    }

    const handleFloorChange = (e) => {
        setFloorData({
            ...floorData,
            [e.target.name]: e.target.value
        })
    }
    const handleFloorImgChange = (e) => {
        setFloorData({
            ...floorData,
            floorimage: e.target.files[0]
        })
    }
    const addFloor = () => {
        let indiFloor = floorData
        let floors = data.floorplan;
        floors.push(indiFloor);
        setFloorData({
            floortype: '',
            carpetarea: '',
            pricepersqft: '',
            totalprice: '',
            floorimage: ''
        })
    }

    const removeFloor = (typ) => {
        let floors = data.floorplan;
        floors = floors.filter((v)=> v.floortype != typ);
        setData({...data,floorplan: floors});
    }

    const getProfileURL = () => {
        return URL.createObjectURL(data.builderimage);
    }

    const getFloorPlanId = async(flrs) => {
        let res = [];
        console.log(flrs)
        for(let val of flrs){
            let floorFormData = new FormData();
            console.log(val)
        for(let k in val){
            // console.log(k,floorData[k]);
            floorFormData.append(k,val[k]);
        }
        let r = await Axios.post('/project/add/floorplan',floorFormData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=> res.data.floorplan._id).catch((err)=> "");
        res.push(r);
        }
        return res;
    }

    const  submitProject =  async() => {
        setLoader(true);
        let basicAmen = basicAmenities.length> 0 && basicAmenities.map((val)=>{return val.value});
        let convinAmen = convenienceAmenities.length> 0 && convenienceAmenities.map((val)=>{return val.value});
        let envAmen = environmentAmenities.length> 0 && environmentAmenities.map((val)=>{return val.value});
        let sportAmen = securityAmenities.length> 0 && sportsAmenities.map((val)=>{return val.value});
        let securtAmen = securityAmenities.length> 0 && securityAmenities.map((val)=>{return val.value})

        let flrs = await getFloorPlanId(data.floorplan); 
        console.log("floor plan: ",flrs);
        setData({...data,
            basicamenities: basicAmen,
            convenienceamenities: convinAmen,
            environmentamenities: envAmen,
            sportsamenities: sportAmen,
            securityamenities: securtAmen,
            aboutproject: aboutProject,
            projectspecification: projectSpecs,
            builderdescription: builderDesc,
        }) 
        let postData = data;        
        postData.floorplan = flrs;
        postData.basicamenities = basicAmen;
        postData.convenienceamenities = convinAmen;
        postData.environmentamenities = envAmen;
        postData.sportsamenities = sportAmen;
        postData.securityamenities = securtAmen;
        postData.aboutproject = aboutProject;
        postData.projectspecification = projectSpecs;
        postData.builderdescription = builderDesc;

        let formData = new FormData();  
        console.log("postData: ",postData);
        for(let d in postData){
            console.log(d,typeof postData[d],postData[d]);
            if(Array.isArray(postData[d]))
                for(let i=0;i< postData[d].length; i++)
                    formData.append(d,postData[d][i]);
            else
                formData.append(d,postData[d]);
        } 
        Axios.post('/project/add',formData,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            console.log(res);
            setLoader(false);
            setModalMsg("Property Saved Successfully!!!")
            setOpen(true);
            setTimeout(()=>{
                setOpen(false)
            },5000);
        }).catch((err)=>{
            console.log(err);
            setModalMsg("Failed saving Property!!!")
            setOpen(true);
            setInterval(()=>{
                setOpen(false)
            },2000);
        })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 100,
        bgcolor: 'background.paper',
        border: "1px solid #E5E5E5",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      };
      
  const [open, setOpen] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return(
        <div className="p-4 mt-5" >
            <Paper  elevation={2} >
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "24px",py: 1}} >Project Info</Paper>
                <Grid sx={{p: 4}} container columnSpacing={10} rowSpacing={4} >
                    <Grid item xs={6}>
                        <FormControl  variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="projectName">Project Name</StyledLabel>
                            <StyledInput placeholder='' id="projectName" name="projectname" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="projectLocation">Project Location</StyledLabel>
                            <StyledInput placeholder='' id="projectLocation" name="projectlocation" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="projectLocality">Project Locality</StyledLabel>
                            <StyledInput placeholder='' id="projectLocality" name="projectlocality" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="city">City/District</StyledLabel>
                            <StyledInput placeholder='' id="city" name="projectcity" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="state">State</StyledLabel>
                            <StyledInput placeholder='' id="state" name="projectstate" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>          
                    <Grid item xs={4}>
                        <StyledLabel shrink sx={{mb: 0}}>Project Type</StyledLabel>
                        <Select options={projectTypeOptions} onChange={(e)=>setData({...data,projecttype: e.value})} />
                    </Grid> 
                    <Grid item xs={4}>
                        <StyledLabel shrink htmlFor="status">Possession Status</StyledLabel>
                        <Select options={possessionStatusOptions} onChange={(e)=>setData({...data,projectpossessionstatus: e.value})} />
                    </Grid>
                    <Grid item xs={4}>
                            <StyledLabel shrink >Configuration</StyledLabel>
                            <Select options={configurationOptions} onChange={(e)=>setData({...data,projectconfiguration: e.value})} />
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="tower">Tower & Unit</StyledLabel>
                            <StyledInput placeholder='' id="tower" name="projecttowerunit" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="projectSubType">Project Sub-Type</StyledLabel>
                            <StyledInput placeholder='' id="projectSubType" name="projectsubtype" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid> 
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="area">Project Area</StyledLabel>
                            <StyledInput placeholder='' id="area" type='number' name="projectarea" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="facing">Facing</StyledLabel>
                            <StyledInput placeholder='' id="facing" name="projectfacing" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="furnish">Furnishing</StyledLabel>
                            <StyledInput placeholder='' id="furnish" name="projectfurnishing" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="reraNumber">RERA Number</StyledLabel>
                            <StyledInput placeholder='' id="reraNumber" name="projectreranumber" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="minSpace">Project Min Space</StyledLabel>
                            <StyledInput placeholder='' id="minSpace" type='number' name="projectminspace" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="maxSpace">Project Max Space</StyledLabel>
                            <StyledInput placeholder='' id="maxSpace" type='number' name="projectmaxspace" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="minPrice">Project Min Price</StyledLabel>
                            <StyledInput placeholder='' id="minPrice" type='number' name="projectminprice" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="maxPrice">Project Max Price</StyledLabel>
                            <StyledInput placeholder='' id="maxPrice" type='number' name="projectmaxprice" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="tag">Tags</StyledLabel>
                            <StyledInput placeholder='' id="tag"  />
                        </FormControl>
                    </Grid> 
                    <Grid item xs={5}></Grid> 
                    <Grid item xs={12}>Upload Image/Video</Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="external">External</StyledLabel>
                            <UploadWrapper>
                                {
                                    data.externalimages.length > 0 ? data.externalimages.map((val,i)=>{
                                        let url = URL.createObjectURL(val);
                                        return(
                                            <UploadedImg url={url} data={data} setData={setData} index={i} name="externalimages" />
                                        )
                                    }) :
                                    <>
                                    <SelectImage>
                                    Select Image
                                    <input id="amenities" type="file" accept='image/*' multiple style={inputImages} name="externalimages" onChange={(e)=>handleMultipleImg(e)} />
                                    </SelectImage>
                                    <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                                    </>
                                }  
                            </UploadWrapper>
                        </FormControl>
                    </Grid>  
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="internal">Internal</StyledLabel>
                            <UploadWrapper>
                                {
                                    data.internalimages.length > 0 ? data.internalimages.map((val,i)=>{
                                        let url = URL.createObjectURL(val);
                                        return(
                                            <UploadedImg url={url} data={data} setData={setData} index={i} name="internalimages" />
                                        )
                                    }) :
                                    <>
                                    <SelectImage>
                                    Select Image
                                    <input id="amenities" type="file" accept='image/*' multiple style={inputImages} name="internalimages" onChange={(e)=>handleMultipleImg(e)} />
                                    </SelectImage>
                                    <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                                    </>
                                }
                            </UploadWrapper>
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="amenities">Amenities</StyledLabel>
                            {/* <StyledInput placeholder='' id="amenities" type="file" /> */}
                            <UploadWrapper>
                                {
                                    data.amenitiesimages.length > 0 ? data.amenitiesimages.map((val,i)=>{
                                        let url = URL.createObjectURL(val);
                                        return(
                                            <UploadedImg url={url} data={data} setData={setData} index={i} name="amenitiesimages" />
                                        )
                                    }) :
                                    <>
                                    <SelectImage>
                                    Select Image
                                    <input id="amenities" type="file" accept='image/*' multiple style={inputImages} name="amenitiesimages" onChange={(e)=>handleMultipleImg(e)} />
                                    </SelectImage>
                                    <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                                    </>
                                }
                            </UploadWrapper>
                        </FormControl>
                    </Grid>  
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink >Other</StyledLabel>
                            <UploadWrapper>
                                {
                                    data.othersimages.length > 0 ? data.othersimages.map((val,i)=>{
                                        let url = URL.createObjectURL(val);
                                        return(
                                            <UploadedImg url={url} data={data} setData={setData} index={i} name="othersimages" />
                                        )
                                    }) :
                                    <>
                                    <SelectImage>
                                    Select Image
                                    <input id="amenities" type="file" accept='image/*' multiple style={inputImages} name="othersimages" onChange={(e)=>handleMultipleImg(e)} />
                                    </SelectImage>
                                    <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                                    </>
                                }
                            </UploadWrapper>
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12}>
                            About Project   
                            <TextEditor initialValue=" " getValue={(value)=> setAboutProject(value)} />
                    </Grid>  
                    <Grid item xs={12}>
                             Project Specification   
                            <TextEditor initialValue=" " getValue={(value)=> setProjectSpecs(value)} />
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={2} sx={{my: 4}}>
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "18px",py:1}}>
                    Floor Plan Detail
                </Paper>
                <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Type Of Floor</StyledLabel>
                            <StyledInput placeholder='' id="floortType" value={floorData.floortype} name='floortype' onChange={(e)=>handleFloorChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Space (Carpet Area)</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='carpetarea' value={floorData.carpetarea} onChange={(e)=>handleFloorChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Per sqft Price</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='pricepersqft' value={floorData.pricepersqft} onChange={(e)=>handleFloorChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Total Price</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='totalprice' value={floorData.totalprice} onChange={(e)=>handleFloorChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="internal">Floor Image 2D/3D</StyledLabel>
                            <UploadWrapper sx={{padding: "0px",justifyContent: "center"}}>
                                <SelectImage sx={{fontSize: "10px",height: "20px",lineHeight: "18px",width: "75px",m:"6px 8px"}}>
                                    Select Image
                                    <input id="amenities" type="file" accept='image/*' multiple style={inputImages} name='floorimage' onChange={(e)=>handleFloorImgChange(e)}/>
                                </SelectImage>
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <AddRoundedIcon  onClick={()=>addFloor()}
                            sx={{
                                fontSize: "40px",
                                color: "#FEAA7B",
                                border: "1px solid #e5e5e5",
                                borderRadius: "50%",
                                my: 2,
                                cursor: 'pointer'
                                }}
                         />
                    </Grid>
                </Grid>
                {data && data.floorplan && data.floorplan.length>0 && data.floorplan.map((val)=>{
                    let url = URL.createObjectURL(val.floorimage);
                    return(
                        <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Type Of Floor</StyledLabel>
                            <StyledInput placeholder='' id="floortType" value={val.floortype} name='floortype' disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Space (Carpet Area)</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='carpetarea' value={val.carpetarea} disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Per sqft Price</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='pricepersqft' value={val.pricepersqft} disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="floortType">Total Price</StyledLabel>
                            <StyledInput placeholder='' id="floortType" name='totalprice' value={val.totalprice} disabled />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="internal">Floor Image 2D/3D</StyledLabel>
                            <UploadWrapper sx={{justifyContent: "center",p: 0,maxHeight: "80px"}}>
                                <UploadedImg url={url} floor={true}  />
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                        <RemoveRoundedIcon onClick={()=> removeFloor(val.floortype)}
                            sx={{
                                fontSize: "40px",
                                color: "#FEAA7B",
                                border: "1px solid #e5e5e5",
                                borderRadius: "50%",
                                my: 2,
                                cursor: 'pointer'
                                }}
                          />
                    </Grid>
                </Grid>
                    )
                })}
            </Paper>
            <Paper elevation={2} sx={{my: 4}}>
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "18px",py:1}}>
                    Locality Detail
                </Paper>
                <MyMapComponent
                    // onMapClick={(e)=>{console.log(e)}}
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPJ10SOVXGlrVsdru1ajSJ5_wqIbD6G2s&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    handleLatLng={handleLatLng}
                    />
                <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="country">Country</StyledLabel>
                            <StyledInput placeholder='' id="country" value="India" name="country" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="city">City/District</StyledLabel>
                            <StyledInput placeholder='' id="city" value="Bangalore" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="latitude">Project Latitude</StyledLabel>
                            <StyledInput placeholder='' id="latitude" name="projectlatitude"
                                value={data.projectlatitude}
                            //  onChange={(e)=>handleTextFieldChange(e)} 
                             />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="longitude">Project Longitude</StyledLabel>
                            <StyledInput placeholder='' id="longitude" name="projectlongitude" 
                                value={data.projectlongitude}
                            // onChange={(e)=>handleTextFieldChange(e)} 

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} sx={{mt: 2,display: 'none'}}>
                        <Button variant="contained" sx={{background: "#FEAA7B",color: "#000"}}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={2} sx={{my: 4}}>
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "18px",py:1}}>
                    Amenities
                </Paper>
                <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item xs={12}>
                        <StyledLabel  shrink>Basic Amenities</StyledLabel>
                        <Select   options={BasicAmenitiesData} displayValue="label" id="basicAmenities" onChange={handleBasicAmenitiesChange} isMulti />   
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel  shrink >Convenience Amenities</StyledLabel>
                        <Select   options={ConvenienceAmenitiesData} displayValue="label" id="basicAmenities" onChange={handleConvenienceAmenitiesChange} isMulti />   
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel  shrink >Environment Amenities</StyledLabel>
                        <Select   options={EnvironmentAmenitiesData} displayValue="label" id="basicAmenities" onChange={handleEnvironmentAmenitiesChange} isMulti />   
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel  shrink >Sports Amenities</StyledLabel>
                        <Select   options={SportsAmenitiesData} displayValue="label" id="basicAmenities" onChange={handleSportsAmenitiesChange} isMulti />   
                    </Grid>
                    <Grid item xs={12}>
                        <StyledLabel  shrink >Security Amenities</StyledLabel>
                        <Select   options={SecurityAmenitiesData} displayValue="label" id="basicAmenities" onChange={handleSecurityAmenitiesChange} isMulti />   
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={2} sx={{my: 4}}>
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "18px",py:1}}>
                    Builder Profile
                </Paper>
                <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item container xs={6} columnSpacing={6} rowSpacing={4}>
                        <Grid item xs={12} >
                            <FormControl variant="standard" className='w-100'>
                                <StyledLabel shrink htmlFor="maxSpace">Builder Name</StyledLabel>
                                <StyledInput placeholder='' id="maxSpace" name="buildername" onChange={(e)=>handleTextFieldChange(e)} />
                            </FormControl>
                        </Grid>  
                        <Grid item xs={12}>
                            <FormControl variant="standard" className='w-100'>
                                <StyledLabel shrink htmlFor="maxSpace">Builder Address</StyledLabel>
                                <StyledInput placeholder='' id="maxSpace" name="builderaddress" onChange={(e)=>handleTextFieldChange(e)} />
                            </FormControl>
                        </Grid>  
                    </Grid>
                    <Grid item xs={6} className="d-flex justify-content-center align-items-center position-relative">
                    <input id="builderImg" type="file" accept='image/*' style={inputImages} name="builderimage" onChange={(e)=>handleSingleImg(e)}  />
                        {
                            data.builderimage ?
                            <img
                            style={{
                                width: "120px",
                                height: "120px",
                                border: '1px solid #e5e5e5',
                                borderRadius: "50%",
                                cursor: 'pointer'
                            }}
                            onClick={()=>{document.getElementById('builderImg').click()}}
                            src={getProfileURL()}
                         />
                         :
                         <AddRoundedIcon sx={{
                            fontSize: "120px",
                            border: "1px solid #000",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}  onClick={()=>{document.getElementById('builderImg').click()}} />
                        } 
                        
                          
                                       
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="locality">Locality</StyledLabel>
                            <StyledInput placeholder='' id="locality" name="builderlocality" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="district">City / District</StyledLabel>
                            <StyledInput placeholder='' id="district" name="builderdistrict" 
                            // onChange={(e)=>handleTextFieldChange(e)}
                             />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="state">State</StyledLabel>
                            <StyledInput placeholder='' id="state" />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="yearOfE">Year of Establishment</StyledLabel>
                            <StyledInput placeholder='' id="yearOfE" type='number' name='builderyoe' onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="projects">Projects</StyledLabel> 
                            <StyledInput placeholder='' id="projects" name="builderproject" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="typeOfCompany">Type of Company</StyledLabel>
                            <StyledInput placeholder='' id="typeOfCompany" name="companytype" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="contactNo">Contact Number</StyledLabel>
                            <StyledInput placeholder='' id="contactNo" type='number' name="buildercontact" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="website">Website</StyledLabel>
                            <StyledInput placeholder='' id="website" name='builderwebsite' onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={4}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="emaliAdd">Email Address</StyledLabel>
                            <StyledInput placeholder='' id="emailAdd" name="builderemail" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid> 
                    <Grid item xs={12}>
                             Description   
                            <TextEditor initialValue=" " getValue={(value)=> setBuilderDesc(value)} />
                    </Grid>  
                </Grid>
            </Paper>
            <Paper elevation={2} sx={{my: 4}}>
                <Paper elevation={2} sx={{textAlign: "center",fontSize: "18px",py:1}}>
                    Project Legal Details
                </Paper>
                <Grid sx={{p:4}} container columnSpacing={6} rowSpacing={4}>
                    <Grid item xs={3}>
                        <StyledLabel shrink  className='my-4 fs-5'>Occupancy Certificate (OC)</StyledLabel>
                    </Grid>
                    <Grid item xs={3}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="no"
                            name="radio-buttons-group"
                            className="d-flex mt-3"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid> 
                    <Grid item xs={6}>
                        <FormControl variant="standard" className='w-100'>
                            <UploadWrapper>
                                <SelectImage>
                                    Choose File
                                    <input id="amenities" type="file" style={inputImages} name="ocimage" onChange={(e)=>handleSingleImg(e)}  />
                                </SelectImage>
                                <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1,overflow: 'hidden',width: "45%",maxHeight: "45px"}}>{data.ocimage ? data.ocimage.name : "Upload"}</Box>
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <StyledLabel shrink  className='my-4 fs-5'>Completion Certificate (CC)</StyledLabel>
                    </Grid>
                    <Grid item xs={3}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="no"
                            name="radio-buttons-group"
                            className="d-flex mt-3"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid> 
                    <Grid item xs={6}>
                        <FormControl variant="standard" className='w-100'>
                            <UploadWrapper>
                                <SelectImage>
                                    Choose File
                                    <input id="amenities" type="file"  style={inputImages} name="ccimage" onChange={(e)=>handleSingleImg(e)} />
                                </SelectImage>
                                <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1,overflow: 'hidden',width: "45%",maxHeight: "45px"}}>{data.ccimage ? data.ccimage.name : "Upload"}</Box>
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="website">Khata Type</StyledLabel>
                            <StyledInput placeholder='' id="website" name="khatatype" onChange={(e)=>handleTextFieldChange(e)}   />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="website">Khata No.</StyledLabel>
                            <StyledInput placeholder='' id="website" type='number' name="khatano" onChange={(e)=>handleNumberFielChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={6}>
                        <FormControl variant="standard" className='w-100'>
                            <UploadWrapper>
                                <SelectImage>
                                    Choose File
                                    <input id="amenities" type="file" multiple style={inputImages} />
                                </SelectImage>
                                <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <StyledLabel shrink htmlFor="website">RERA Approved</StyledLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={false}
                            name="reraapproved"
                            className="d-flex"
                            onChange={(e)=>handleTextFieldChange(e)}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" />
                            <FormControlLabel value={false}  control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>  
                    <Grid item xs={3}>
                        <FormControl variant="standard" className='w-100'>
                            <StyledLabel shrink htmlFor="website">RERA Authority Name</StyledLabel>
                            <StyledInput placeholder='' id="website" name="reraauthority" onChange={(e)=>handleTextFieldChange(e)} />
                        </FormControl>
                    </Grid>  
                    <Grid item xs={6}>
                        <FormControl variant="standard" className='w-100'>
                            <UploadWrapper>
                                <SelectImage>
                                    Choose File
                                    <input id="amenities" type="file" multiple style={inputImages} />
                                </SelectImage>
                                <Box sx={{cursor: "pointer",borderLeft: "1px solid #C4C4C4",px: 5,py:1}}>Upload</Box>
                            </UploadWrapper>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
            <div className='d-flex justify-content-around my-5'>
                <Button onClick={()=>setOpen(true)} sx={{
                    background: "#1ADDFF",
                    width: "220px",
                    color: "#000",
                }}>Save As Draft</Button>
                <Button type="submit" onClick={()=>submitProject()} sx={{
                    background: "#FEAA7B",
                    width: "220px",
                    color: "#000",
                }}>Submit For Review</Button>
            </div>
            {/* <RevolvingDot wrapperStyle={style} /> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" align='center' >{modalMsg}</Typography>
                </Box>
                </Modal>
        </div>
    )
}

export default AddProperty;