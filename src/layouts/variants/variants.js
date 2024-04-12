import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import MDButton from "components/MDButton";

function Variants({ price }) {
  const [variants, setVariants] = useState([]);
  const [fields, setFields] = useState([""]);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false); 

  const handleAddVariantOption = (e) => {
    e.preventDefault();
    setVariants([...variants, { size: "", medium: "" }]);
    
    setFields([""]);
  };
  

  const handleNewFieldChange = (e, index) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
  
    if (index === newFields.length - 1 && e.target.value.trim() !== "") {
      
      newFields.push("");
    }
  
    setFields(newFields);
  };
  

  const handleDeleteField = indexToDelete => {
    setFields(fields.filter((value, index) => index !== indexToDelete));
  };

  const handleDeleteVariantOption = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleVariantSizeChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].size = e.target.value;
    setVariants(updatedVariants);
  };

  const handleVariantMediumChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].medium = e.target.value;
    setVariants(updatedVariants);
  };

  const handleDone = (index) => {
    const newData = [...tableData];
    newData.push({
      variant: variants[index].medium,
      newField: [...fields],
      price: price
    });
    setTableData(newData);

    const updatedVariants = [...variants];
    updatedVariants[index] = { size: "", medium: "" };
    setVariants(updatedVariants);

    setFields([""]);
    setShowTable(true); // Set showTable to true after clicking the link
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "500px" }}>
        <Typography variant="h5" gutterBottom>
          Variants
        </Typography>
        <Typography variant="h6" gutterBottom>
          <a href="#" onClick={handleAddVariantOption}>
            + Add Options like size or color
          </a>
        </Typography>

        {variants.map((variant, index) => (
          <Grid container spacing={2} key={index} style={{ marginTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={4} marginTop="15px">
                <Select
                  label="Types"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={variant.size}
                  onChange={(e) => handleVariantSizeChange(e, index)}
                  style={{ height: "80%" }}
                >
                  <MenuItem value="Small">Size</MenuItem>
                  <MenuItem value="Medium">Style</MenuItem>
                  <MenuItem value="Large">Color</MenuItem>
                  <MenuItem value="X-Large">Material</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Variant"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={variant.medium}
                  onChange={(e) => handleVariantMediumChange(e, index)}
                  style={{ height: "100%" }}
                />
              </Grid>
              {variant.medium !== "" && fields.map((value, fieldIndex) => (
                <Grid item xs={4} key={fieldIndex}>
                  <TextField
                    label="New Field"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={value}
                    onChange={(e) => handleNewFieldChange(e, fieldIndex)}
                    onBlur={() => {
                      if (value.trim() === "") {
                        handleDeleteField(fieldIndex);
                      }
                    }}
                    style={{ marginBottom: "10px" }}
                  />
                </Grid>
              ))}
              <MDButton onClick={() => handleDone(index)}>Done</MDButton>
              <IconButton onClick={() => handleDeleteVariantOption(index)}>
                <FaTrash />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        
        {showTable && ( 
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Variant</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((data, dataIndex) => (
                  <TableRow key={dataIndex}>
                      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {data.variant}
      </AccordionSummary>
     
        {data.newField.map((field, fieldIndex) => (
          <div key={fieldIndex}>{field}</div>
        ))}
      
    </Accordion>

                    <TableCell>{data.price}</TableCell>
                    <TableCell>
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
}

export default Variants;
