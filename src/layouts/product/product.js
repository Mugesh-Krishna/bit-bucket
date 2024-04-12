import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useRef, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  MenuItem,
  Select,
  Container,
  Paper,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MDButton from "components/MDButton";
import { FaArrowLeftLong, FaTrash } from "react-icons/fa6";
import Variants from "layouts/variants/variants";


const Product = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [isChecked, setIsChecked] = useState(false);
  const [trackQuantity, setTrackQuantity] = useState(false);
  const [continueShopping, setContinueShopping] = useState(false);
  const [hasSKU, setHasSKU] = useState(false);
  const [SKU, setSKU] = useState("");
  const [barcode, setBarcode] = useState("");
  const [Physical, setPhysical] = useState(false);
  const [weight, setWeight] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [country, setCountry] = useState("");
  const [harmonizedSystem, setHarmonizedSystem] = useState("");
  const [variants, setVariants] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [urlHandle, setUrlHandle] = useState("");

  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [vendor, setVendor] = useState("");
  const [collections, setCollections] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [profit, setProfit] = useState(null);
  const [margin, setMargin] = useState(null);

  // Handle change for each TextField
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleVendorChange = (event) => {
    setVendor(event.target.value);
  };

  const handleCollectionsChange = (event) => {
    setCollections(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTrackQuantityChange = (event) => {
    setTrackQuantity(event.target.checked);

    if (!event.target.checked) {
      setContinueShopping(false);
    }
  };

  const handleContinueShoppingChange = (event) => {
    setContinueShopping(event.target.checked);
  };

  const handleHasSKUChange = (event) => {
    setHasSKU(event.target.checked);

    if (!event.target.checked) {
      setSKU("");
      setBarcode("");
    }
  };

  const handleSKUChange = (event) => {
    setSKU(event.target.value);
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
  };

  const handlePhysicalCheckboxChange = (event) => {
    setPhysical(event.target.checked);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleAdditionalInfoClick = (event) => {
    event.preventDefault();
    setShowAdditionalInfo(true);
  };

  

 
  const handleEditClick = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
    calculateProfit(newPrice, comparePrice);
  };

  const handleComparePriceChange = (event) => {
    const newComparePrice = event.target.value;
    setComparePrice(newComparePrice);
    calculateProfit(price, newComparePrice);
  };

  const calculateProfit = (price, comparePrice) => {
    const profitValue = parseFloat(price) - parseFloat(comparePrice);
    setProfit(isNaN(profitValue) ? null : profitValue.toFixed(0));
    calculateMargin(profitValue, price); // Call calculateMargin with profitValue and price
  };

  const calculateMargin = (profitValue, costPrice) => {
    const profitPercentage = ((profitValue / costPrice) * 100).toFixed(2);
    setMargin(isNaN(profitPercentage) ? null : `${profitPercentage}%`);
  };

  return (
    <DashboardLayout>
      <Box style={{ padding: "20px" }}>
        <AppBar position="static" color="black">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="white"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: "white" }}
            >
              Shopify
            </Typography>
            <MDButton
              style={{
                color: "black",
                fontSize: "12px",
                padding: "8px 16px",
                minWidth: "auto",
              }}
            >
              Save
            </MDButton>
          </Toolbar>
        </AppBar>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <FaArrowLeftLong
              style={{
                fontSize: "20px",
                marginRight: "10px",
                marginLeft: "20px",
              }}
            />
            <Typography variant="h6" component="div">
              <h3>Add product</h3>
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="sm">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Paper
                elevation={3}
                style={{
                  maxWidth: "calc(50% - 10px)",
                  padding: "20px",
                  marginTop: "15px",
                }}
              >
                <Box mt={2} p={2} border={1} borderColor="grey.200">
                  <Typography variant="h6" component="div" gutterBottom>
                    Title:
                  </Typography>
                  <TextField
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    style={{ width: 430 }}
                  />

                  <Typography variant="h6" component="div" gutterBottom>
                    Description:
                  </Typography>
                  <TextField
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    style={{ width: "100%" }}
                  />
                </Box>
              </Paper>

              <Paper
                elevation={3}
                style={{
                  width: "500px",
                  height: "180px",
                  padding: "20px",
                  marginTop: "15px",
                }}
              >
                <Box mt={2} p={2} border={1} borderColor="grey.200">
                  <Typography variant="h6" component="div" gutterBottom>
                    Status:
                  </Typography>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    style={{ width: 100 }}
                  >
                    <MenuItem value={"value1"}>Active</MenuItem>
                    <MenuItem value={"value2"}>Draft</MenuItem>
                  </Select>
                </Box>
              </Paper>
            </Box>

            <Paper
              elevation={3}
              style={{
                width: "510px",
                padding: "20px",
                marginTop: "-140px",
                marginLeft: "610px",
              }}
            >
              <Box mt={2} p={2} border={1} borderColor="grey.200">
                <Typography variant="h6" component="div" gutterBottom>
                  Publishing:
                </Typography>

                <Typography variant="body1" gutterBottom>
                  Sales channels:
                </Typography>
                <ul>
                  <li>Online Store - Incomplete</li>
                  <li>
                    Point of Sale - Point of Sale has not been set up. Finish
                    the remaining steps to start selling in person. Learn more
                  </li>
                  <li>Markets - Incomplete</li>
                  <li>India and International</li>
                </ul>
              </Box>
            </Paper>

            <Paper
              elevation={3}
              style={{
                width: "510px",
                padding: "20px",
                marginTop: "30px",
                marginLeft: "610px",
              }}
            >
              <Typography variant="h6" component="div" gutterBottom>
                Product Organization
              </Typography>

              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={category}
                onChange={handleCategoryChange}
              />
              <TextField
                label="Product type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={productType}
                onChange={handleProductTypeChange}
              />
              <TextField
                label="Vendor"
                variant="outlined"
                fullWidth
                margin="normal"
                value={vendor}
                onChange={handleVendorChange}
              />
              <TextField
                label="Collections"
                variant="outlined"
                fullWidth
                margin="normal"
                value={collections}
                onChange={handleCollectionsChange}
              />
              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                margin="normal"
                value={tags}
                onChange={handleTagsChange}
              />
            </Paper>
          </Box>
        </Container>

        <Container maxWidth="sm" style={{ marginTop: "-680px" }}>
          <Paper elevation={3} style={{ padding: "20px", width: "500px" }}>
            <Typography variant="h5" gutterBottom>
              Media
            </Typography>
            {selectedFile && (
              <CardMedia
                component="img"
                image={URL.createObjectURL(selectedFile)}
                style={{ width: "100%" }}
              />
            )}
            <Box display="flex" justifyContent="center">
              <input
                type="file"
                accept="image/*, video/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadButtonClick}
              >
                Upload New
              </Button>
            </Box>
          </Paper>
        </Container>

        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <Paper elevation={3} style={{ padding: "20px", width: "500px" }}>
            <Typography variant="h5" gutterBottom>
              Price
            </Typography>
            <TextField
              label="Price"
              variant="outlined"
              margin="normal"
              style={{ width: 200 }}
              value={price}
              onChange={handlePriceChange}
            />
            <TextField
              label="Compare to price"
              variant="outlined"
              margin="normal"
              style={{ width: 200, marginLeft: "20px" }}
            />
            <FormControlLabel
              control={
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              }
              label="Charge Tax on this product"
            />
            <TextField
              label="Cost Per Item"
              variant="outlined"
              margin="normal"
              style={{ width: 200, marginLeft: "20px" }}
              value={comparePrice}
              onChange={handleComparePriceChange}
            />
            <TextField
              label="Profit"
              variant="outlined"
              margin="normal"
              style={{ width: 200, marginLeft: "20px" }}
              value={profit !== null ? profit : "---"}
              InputProps={{ readOnly: true }} // to prevent manual input
            />
            <TextField
              label="Margin"
              variant="outlined"
              margin="normal"
              style={{ width: 200, marginLeft: "20px" }}
              value={margin !== null ? margin : "---"}
              InputProps={{ readOnly: true }}
            />
          </Paper>
        </Container>

        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <Paper elevation={3} style={{ padding: "20px", width: "500px" }}>
            <Typography variant="h5" gutterBottom>
              Inventory
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={trackQuantity}
                  onChange={handleTrackQuantityChange}
                />
              }
              label="Track Quantity"
            />

            <Typography variant="h5" gutterBottom>
              <h5>Shop Location</h5>
            </Typography>
            {trackQuantity && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={continueShopping}
                    onChange={handleContinueShoppingChange}
                  />
                }
                label="Continue Shopping
                This won't affect Shopify POS. Staff will see a warning, but can complete sales when available inventory reaches zero and below."
              />
            )}
            <FormControlLabel
              control={
                <Checkbox checked={hasSKU} onChange={handleHasSKUChange} />
              }
              label="This product has a SKU or barcode"
            />

            {hasSKU && (
              <>
                <TextField
                  label="SKU (Stock Keeping Unit)"
                  variant="outlined"
                  margin="normal"
                  style={{ width: 200, marginTop: "10px" }}
                  value={SKU}
                  onChange={handleSKUChange}
                />
                <TextField
                  label="Barcode (ISBN, UPC, GTIN, etc.)"
                  variant="outlined"
                  margin="normal"
                  style={{ width: 200, marginLeft: "20px", marginTop: "10px" }}
                  value={barcode}
                  onChange={handleBarcodeChange}
                />
              </>
            )}
          </Paper>
        </Container>

        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <Paper elevation={3} style={{ padding: "20px", width: "500px" }}>
            <Typography variant="h5" gutterBottom>
              Shipping
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Physical}
                  onChange={handlePhysicalCheckboxChange}
                />
              }
              label="This is a physical product"
            />
            {Physical && (
              <TextField
                label="Weight"
                variant="outlined"
                margin="normal"
                style={{ width: 200, marginTop: "10px" }}
                value={weight}
                onChange={handleWeightChange}
              />
            )}
            {!Physical && (
              <Typography variant="h6" gutterBottom>
                Customers won’t enter shipping details at checkout. Learn how to
                set up your store for digital products or services.
              </Typography>
            )}
            {Physical && (
              <>
                <Typography variant="h6" gutterBottom>
                  <a href="#" onClick={handleAdditionalInfoClick}>
                    Add Information
                  </a>
                </Typography>
                {showAdditionalInfo && (
                  <>
                    <TextField
                      label="Country"
                      variant="outlined"
                      margin="normal"
                      style={{ width: 200, marginTop: "10px" }}
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                      label="Harmonized System"
                      variant="outlined"
                      margin="normal"
                      style={{
                        width: 200,
                        marginLeft: "20px",
                        marginTop: "10px",
                      }}
                      value={harmonizedSystem}
                      onChange={(e) => setHarmonizedSystem(e.target.value)}
                    />
                  </>
                )}
              </>
            )}
          </Paper>
        </Container>
         <Variants price={price}/>
        

        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Search engine listing
              </Typography>
              <a
                href="#"
                style={{ textDecoration: "none" }}
                onClick={handleEditClick}
              >
                Edit
              </a>
            </div>
            {editMode && (
              <div style={{ width: "100%", marginTop: "20px" }}>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    label="Page Title"
                    variant="outlined"
                    margin="normal"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    fullWidth
                  />
                </div>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <TextField
                    label="Meta Description"
                    variant="outlined"
                    margin="normal"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    fullWidth
                  />
                </div>
                <TextField
                  label="URL Handle"
                  variant="outlined"
                  margin="normal"
                  value={urlHandle}
                  onChange={(e) => setUrlHandle(e.target.value)}
                  fullWidth
                />
                <div style={{ marginTop: "20px" }}>
                  <Button variant="contained" onClick={handleSaveClick}>
                    Save
                  </Button>
                </div>
              </div>
            )}
          </Paper>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Product;
