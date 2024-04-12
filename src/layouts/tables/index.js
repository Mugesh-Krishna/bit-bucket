import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import DataTable from "examples/Tables/DataTable";
import { Listuser } from "./data/authorsTableData";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const Tables = () => {
  const { columns, rows } = Listuser();
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState(null); 

  const handleCreateUser = () => {
    setOpenModal(true);
    setUserIdToUpdate(null); 
    setName("");
    setJob("");
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  
  const handleCreateNewUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://reqres.in/api/users", { name, job });
      setUserData((prevData) => [...prevData, response.data]);
      setName('');
      setJob('');
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      const updatedUserData = userData.filter(user => user.id !== userId);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (userId) => {
  
    const userToUpdate = userData.find(user => user.id === userId);
    if (userToUpdate) {
      setName(userToUpdate.name);
      setJob(userToUpdate.job);
      setOpenModal(true);
      setUserIdToUpdate(userId);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${userIdToUpdate}`, { name, job });
    
      setUserData(userData.map(user => user.id === userIdToUpdate ? response.data : user));
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DashboardLayout>
      
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} style={{ padding: '20px' }}>
              <Grid item>
                <h4>Users Details Table</h4>
              </Grid>
             
            </Grid>
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          </Card>
        </Grid>
        </Grid>
    
    </DashboardLayout>
  );
};

export default Tables;
