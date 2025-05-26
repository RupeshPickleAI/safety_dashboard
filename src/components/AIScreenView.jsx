import React, { useState } from 'react';
import { 
  ViewInAr as ViewIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid
} from '@mui/material';

const AIScreenView = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // Safety items for dropdown
  const safetyItems = [
    "Safety Helmet",
    "Safety Gloves",
    "Safety Belt",
    // "Safety Boots"
  ];

  // Static images for each safety item
// ... existing code ...
  // Static images for each safety item
  const safetyImages = {
    "Safety Helmet": [
      "/src/assets/helmet1.jpg",
      "/src/assets/helmet2.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
       "/src/assets/gloves1.jpg",
      "/src/assets/helmet2.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
     "/src/assets/helmet1.jpg",
      "/src/assets/helmet1.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg"
    ],
// .
    "Safety Gloves": [
      "/src/assets/hemlet3.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
      "/src/assets/gloves1.jpg",
      "/src/assets/helmet2.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
       "/src/assets/gloves1.jpg",
       "/src/assets/gloves2.jpg",
      "/src/assets/helmet2.jpg",
       "/src/assets/gloves1.jpg",
      "/src/assets/helmet1.jpg"
    ],
    "Safety Belt": [
      "https://cdn.openart.ai/stable_diffusion/349fe0a5186979771d2978d9e11540e4d531c263_2000x2000.webp",
     "/src/assets/helmet2.jpg",
       "/src/assets/gloves1.jpg",
      "/src/assets/helmet1.jpg",
        "/src/assets/helmet2.jpg",
      "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
       "/src/assets/gloves1.jpg",
      "/src/assets/helmet2.jpg",
    ],
    // "Safety Boots": [
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg",
    //   "http://192.168.0.147:8000/media/report/temp_FUz3JuX.jpeg"
    // ]
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-6 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side with title */}
          <div className="flex items-center gap-2">
            <ViewIcon className="text-blue-600" />
            <h1 className="text-xl font-semibold">AI Screen View</h1>
          </div>

          {/* Right side with dropdown */}
          <div className="w-full sm:w-[300px]">
            <FormControl fullWidth size="small" className="bg-white rounded-md">
              <InputLabel>Select Safety Item</InputLabel>
              <Select
                value={selectedItem}
                label="Select Safety Item"
                onChange={handleItemChange}
                className="bg-white"
              >
                <MenuItem value="">
                  <em>Select a safety item</em>
                </MenuItem>
                {safetyItems.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      {selectedItem && safetyImages[selectedItem] && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <Grid container spacing={3}>
            {safetyImages[selectedItem].map((image, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleImageClick(image)}
                >
                  <CardMedia
                    component="img"
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                    image={image}
                    alt={`${selectedItem} ${index + 1}`}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {selectedItem} - Image {index + 1}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={isImageDialogOpen}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Safety Item Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <div className="flex justify-center items-center">
              <img 
                src={selectedImage} 
                alt="Safety Item" 
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIScreenView; 