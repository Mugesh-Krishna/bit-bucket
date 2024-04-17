import React, { useState } from "react";
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
  TableRow,
  Collapse,

} from "@mui/material";

import MDButton from "components/MDButton";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Variants({ price }) {
  const [variants, setVariants] = useState([]);
  const [fields, setFields] = useState([""]);
  const [tableData, setTableData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [showAddOptionsLink, setShowAddOptionsLink] = useState(true);
  const [numFields, setNumFields] = useState(1);
  const [showAddExtraDataInput, setShowAddExtraDataInput] = useState(false);
  const [extraDataInputValues, setExtraDataInputValues] = useState([""]);
  const [showAddExtraDataLink, setShowAddExtraDataLink] = useState(false);

  const handleDoneData = () => {
    const newData = [...tableData];

    const additionalValues = {
      variant: variants[variants.length - 1].medium,
      newField: fields.filter((field) => field.trim() !== ""),
      extraData: extraDataInputValues.filter((extra) => extra.trim() !== ""),
    };

    newData[newData.length - 1].additionalValues.push(additionalValues);

    setTableData(newData);
    setExtraDataInputValues([""]);
    setShowAddExtraDataInput(false);
  };

  const handleAddExtraData = (e) => {
    e.preventDefault();
    setShowAddExtraDataInput(true);
  };

  const handleExtraDataInputChange = (e, index) => {
    const { value } = e.target;
    const newValues = [...extraDataInputValues];
    newValues[index] = value;
    setExtraDataInputValues(newValues);

    if (value !== "" && index === extraDataInputValues.length - 1) {
      setExtraDataInputValues([...newValues, ""]);
    }
  };
  const handleAddVariantOption = (e) => {
    e.preventDefault();
    setVariants([...variants, { size: "", medium: "" }]);
    setFields([""]);
    setShowAddOptionsLink(false);
  };

  const handleNewFieldChange = (e, index) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    if (index === newFields.length - 1 && e.target.value.trim() !== "") {
      newFields.push("");
      setNumFields(numFields + 1);
    }
    setFields(newFields);
  };
  const handleDeleteField = (indexToDelete) => {
    const updatedVariants = variants.filter(
      (value, index) => index !== indexToDelete
    );
    const updatedFields = fields.filter(
      (value, index) => index !== indexToDelete
    );
    setVariants(updatedVariants);
    setFields(updatedFields);
  };
  const handleVariantMediumChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].medium = e.target.value;
    setVariants(updatedVariants);
  };
  const handleDone = (index) => {
    const newData = [...tableData];
    newData.push({
      variant: variants[index].size,
      price: price,
      additionalValues: [
        {
          variant: variants[index].medium,
          newField: fields.filter((field) => field.trim() !== ""),
        },
      ],
    });
    setTableData(newData);
    const updatedVariants = [...variants];
    updatedVariants[index] = { size: "", medium: "" };
    setVariants(updatedVariants);
    setFields([""]);
    setShowAddExtraDataLink(true); // Show the "Add Extra Data" link
  };

  const handleSelectChange = (e, index) => {
    const selectedValue = e.target.value;
    if (selectedValues.some((value) => value === selectedValue)) {
      alert("Value already selected");
    } else {
      setSelectedValues([...selectedValues, selectedValue]);
    }
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", maxWidth: "500px" }}>
        <Typography variant="h5" gutterBottom>
          Variants
        </Typography>
        <Typography variant="h6" gutterBottom>
          {showAddOptionsLink && (
            <a href="#" onClick={handleAddVariantOption}>
              + Add Options like size or color
            </a>
          )}
        </Typography>

        {variants.map((variant, index) => (
          <Grid container spacing={2} key={index} style={{ marginTop: "10px" }}>
            {!showAddExtraDataInput && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={4} marginTop="15px">
                    <Select
                      label="Types"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={variant.size}
                      onChange={(e) => handleSelectChange(e, index)}
                      style={{ height: "80%" }}
                    >
                      <MenuItem value="Size">Size</MenuItem>
                      <MenuItem value="Style">Style</MenuItem>
                      <MenuItem value="Color">Color</MenuItem>
                      <MenuItem value="Material">Material</MenuItem>
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
                  {variant.medium !== "" &&
                    fields.map((value, fieldIndex) => (
                      <Grid item xs={3} key={fieldIndex}>
                        {fieldIndex < numFields && (
                          <TextField
                            label="New Field"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={value}
                            onChange={(e) =>
                              handleNewFieldChange(e, fieldIndex)
                            }
                            onBlur={() => {
                              if (value.trim() === "") {
                                handleDeleteField(fieldIndex);
                              }
                            }}
                            style={{ marginBottom: "10px" }}
                          />
                        )}
                      </Grid>
                    ))}
                </Grid>
                <Grid item xs={12}>
                  <IconButton onClick={() => handleDone(index)}>
                    Done
                  </IconButton>
                  <MDButton
                    onClick={() => {
                      handleDeleteField(index);
                    }}
                  >
                    Delete
                  </MDButton>
                </Grid>
              </>
            )}
            {showAddExtraDataLink && (
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: "10px" }}
              >
                <Grid item>
                  <a href="#" onClick={handleAddExtraData}>
                    + Add extra data
                  </a>
                </Grid>
              </Grid>
            )}
            {showAddExtraDataInput &&
              extraDataInputValues.map((value, index) => (
                <Grid container style={{ marginTop: "10px" }} key={index}>
                  <Grid item xs={12}>
                    <TextField
                      label="Extra Data"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={value}
                      onChange={(e) => handleExtraDataInputChange(e, index)}
                    />
                  </Grid>
                </Grid>
              ))}
            {showAddExtraDataInput && (
              <Grid container style={{ marginTop: "10px" }}>
                <Grid item xs={12}>
                  <MDButton
                    variant="contained"
                    color="primary"
                    onClick={handleDoneData}
                  >
                    Done
                  </MDButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Collapse in={tableData.length > 0}>
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
    <React.Fragment key={dataIndex}>
      <TableRow>
        <TableCell>{data.variant}</TableCell>
        <TableCell>{price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={2}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{data.variant}</Typography>
              <Typography variant="body2" color="textSecondary">
                {data.variant}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableBody>
                  {data.extraData &&
                    data.extraData.map((extra, extraIndex) => (
                      <TableRow
                        key={`variant-${dataIndex}-extra-${extraIndex}`}
                      >
                        <TableCell colSpan={2}>
                          {extra}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </TableCell>
      </TableRow>
      {data.additionalValues &&
  data.additionalValues.map((additionalData, additionalIndex) => (
    <React.Fragment key={`${dataIndex}-${additionalIndex}`}>
      {additionalData.newField.map((field, fieldIndex) => (
        <TableRow key={`${dataIndex}-${additionalIndex}-${fieldIndex}`}>
          <TableCell colSpan={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${dataIndex}-${additionalIndex}-${fieldIndex}-content`}
                id={`panel-${dataIndex}-${additionalIndex}-${fieldIndex}-header`}
              >
                <Typography>{field}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {price} {/* Display the price */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <Typography>Extra Data:</Typography>
                  <ul>
                  {additionalData.extraData && additionalData.extraData.map((extra, extraIndex) => (
  <li key={`extra-${extraIndex}`}>{extra.value}</li>
))}

                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </TableCell>
        </TableRow>
      ))}
    </React.Fragment>
  ))}

    </React.Fragment>
  ))}
</TableBody>

              </Table>
            </TableContainer>
          </Collapse>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Variants;
