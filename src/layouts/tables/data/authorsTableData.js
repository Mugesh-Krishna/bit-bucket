/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
 * =========================================================
 * Material Dashboard 2 React - v2.1.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)
 * Coded by www.creative-tim.com
 *
 * =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDButton from "components/MDButton";



export const Listuser = () => {
  const [listdata, setListdata] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define your state here if needed

  const location = useLocation();
  const navigate = useNavigate();

  const URL1 = "https://reqres.in/api/users?page=1";
  const URL2 = "https://reqres.in/api/users?page=2";
  const getNewuser = "https://reqres.in/api/users/2";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = (await axios.get(URL1)).data.data;
        const response2 = (await axios.get(URL2)).data.data;

        setListdata([...response1, ...response2]);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const addNewuser = async () => {
    try {
      const newResponse = await axios.get(getNewuser);
      const newUser = newResponse.data.data;
      setListdata(prevData => [...prevData, newUser]);
      console.log(listdata); 
    } catch (error) {
      console.error("Error adding new user:", error);
    }
  };

  return {
    
    columns: [
      { Header: "email", accessor: "email", width: "45%", align: "left" },
      { Header: "id", accessor: "id", align: "left" },
      { Header: "first_name", accessor: "first_name", align: "center" },
      { Header: "Last_name", accessor: "last_name", align: "center" },
      { Header: "Actions", accessor: "action", align: "center" },
    ],

    rows: listdata.map((user) => ({
      email: user.email,
      id: user.id,
      first_name: <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {user.first_name}
      </MDTypography>,
      last_name: <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">{user.last_name}</MDTypography>,
      action: (
        <div>
          <MDButton onClick={addNewuser} variant="caption" color="text" fontWeight="medium">Add</MDButton>
        </div>
      ),
    })),
  };
};
