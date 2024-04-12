

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect, createContext } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addEmail } from "Store/UserSlice";
import { addname } from "Store/UserSlice";
import { addlast } from "Store/UserSlice";



function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const[valueemail,setValueemail]=useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const dispatch = useDispatch()
  const URL = 'https://reqres.in/api/users?page=2';

  const loginSubmit = async (e) => {
    try {
      const response = await axios.get(URL);
      const details = response.data.data;
      const filteredMail = details.filter((detail) => detail.email === login.email);
      if (filteredMail.length > 0) {
       setValueemail(filteredMail[0].email);
       dispatch(addEmail(filteredMail[0].email))
       dispatch(addname(filteredMail[0].first_name))
       dispatch(addlast(filteredMail[0].last_name))
        navigate('/layouts/tables')
        console.log('filteredMail', valueemail);
      } else {
       
        alert('No match found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };
  
  
const newbUtton=()=>{
  setValueemail("hellow")
    console.log("value",valueemail)
}

  return (
    <BasicLayoutLanding image={bgImage}>
    
      <Card>
        
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" >
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={login.email}
                name="email"
                onChange={handleChange}
                
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={login.password}
                onChange={handleChange}
               
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch  />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
               
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={loginSubmit}>
                sign in
              </MDButton>
              <MDButton onClick={newbUtton}>trail</MDButton>
            </MDBox>
            {/* {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )} */}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password? Reset it{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  here
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
       
      </Card>
    </BasicLayoutLanding>
  );
}

export default Login;
