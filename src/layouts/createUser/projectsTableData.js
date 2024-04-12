import React, { useState } from "react";
import { Grid, Card, TablePagination } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios"; // Don't forget to import axios

export default function ProjectTableData() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography
        display="block"
        variant="button"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {name}
      </MDTypography>
    </MDBox>
  );

  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCreateUser = () => {
    setOpenModal(true);
    setUserIdToUpdate(null);
    setName("");
    setJob("");
    setEmail("");
    setEmailError(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleCreateNewUser = async (event) => {
    event.preventDefault();
    if (!name || !job || !email) {
      alert("Name, Job, and Email cannot be empty!");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    try {
      const response = await axios.post("https://reqres.in/api/users", {
        name,
        job,
        email,
      });
      setUserData((prevData) => [...prevData, response.data]);
      setName("");
      setJob("");
      setEmail("");
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      const updatedUserData = userData.filter((user) => user.id !== userId);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (userId) => {
    const userToUpdate = userData.find((user) => user.id === userId);
    if (userToUpdate) {
      setName(userToUpdate.name);
      setJob(userToUpdate.job);
      setEmail(userToUpdate.email);
      setOpenModal(true);
      setUserIdToUpdate(userId);
    }
  };

  const handleUpdateUser = async () => {
    if (!name || !job || !email) {
      alert("Name, Job, and Email cannot be empty!");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${userIdToUpdate}`,
        { name, job, email }
      );

      const updatedUser = {
        ...response.data,
        id: userData.find((user) => user.id === userIdToUpdate).id,
        createdAt: userData.find((user) => user.id === userIdToUpdate)
          .createdAt,
      };

      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userIdToUpdate ? updatedUser : user
        )
      );
      setOpenModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { Header: "Name", accessor: "name", width: "30%", align: "left" },
    { Header: "Job", accessor: "job", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "id", accessor: "id", align: "center" },
    { Header: "createdAt", accessor: "createdAt", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const paginatedRows = userData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user) => ({
      name: (
        <MDTypography
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
        >
          {user.name}
        </MDTypography>
      ),
      job: (
        <MDTypography
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
        >
          {user.job}
        </MDTypography>
      ),
      email: (
        <MDTypography
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
        >
          {user.email}
        </MDTypography>
      ),
      id: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {user.id}
        </MDTypography>
      ),
      createdAt: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          {user.createdAt}
        </MDTypography>
      ),
      action: (
        <MDBox display="flex" alignItems="center" justifyContent="space-around">
          <MDButton onClick={() => handleUpdate(user.id)}>Update</MDButton>
          <MDButton onClick={() => handleDelete(user.id)}>Delete</MDButton>
        </MDBox>
      ),
    }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              style={{ padding: "20px" }}
            >
              <Grid item>
                <h4>Created User's List</h4>
              </Grid>

              <Grid item>
                <MDButton
                  onClick={handleCreateUser}
                  variant="contained"
                  color="primary"
                >
                  Create
                </MDButton>
              </Grid>
            </Grid>
            <DataTable
              table={{ columns, rows: paginatedRows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Grid>

        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>
            {userIdToUpdate ? "Update User" : "Create New User"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="job"
              label="Job"
              type="text"
              fullWidth
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
            <TextField
              error={emailError}
              helperText={emailError ? "Invalid email" : ""}
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <MDButton onClick={handleModalClose}>Cancel</MDButton>
            {userIdToUpdate ? (
              <MDButton onClick={handleUpdateUser}>Update</MDButton>
            ) : (
              <MDButton onClick={handleCreateNewUser}>Create</MDButton>
            )}
          </DialogActions>
        </Dialog>
      </Grid>
    </DashboardLayout>
  );
}
