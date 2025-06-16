import React, { useState } from 'react';
import { ViewInAr as ViewIcon } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Pagination,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AIScreenView = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;

  const safetyItems = ['Safety Helmet', 'Safety Gloves', 'Safety Belt'];

  const safetyImages = {
    'Safety Helmet': [
      '/src/assets/helmet1.jpg',
      '/src/assets/helmet2.jpg',
      '/src/assets/gloves1.jpg',
      '/src/assets/helmet2.jpg',
      '/src/assets/helmet1.jpg',
      '/src/assets/helmet1.jpg',
    ],
    'Safety Gloves': [
      '/src/assets/hemlet3.jpg',
      '/src/assets/gloves1.jpg',
      '/src/assets/helmet2.jpg',
      '/src/assets/gloves1.jpg',
      '/src/assets/gloves2.jpg',
      '/src/assets/helmet2.jpg',
      '/src/assets/gloves1.jpg',
      '/src/assets/helmet1.jpg',
    ],
    'Safety Belt': [
      'https://cdn.openart.ai/stable_diffusion/349fe0a5186979771d2978d9e11540e4d531c263_2000x2000.webp',
      '/src/assets/helmet2.jpg',
      '/src/assets/gloves1.jpg',
      '/src/assets/helmet1.jpg',
      '/src/assets/helmet2.jpg',
      'https://ai-safety.indusvision.ai/media/report/temp_FUz3JuX.jpeg',
      '/src/assets/gloves1.jpg',
      '/src/assets/helmet2.jpg',
    ],
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
    setCurrentImageIndex(0);
    setPage(1);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedImages = selectedItem && safetyImages[selectedItem]
    ? safetyImages[selectedItem].slice((page - 1) * imagesPerPage, page * imagesPerPage)
    : [];

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      {/* Header Card */}
      <Box
        sx={{
          background: 'linear-gradient(to bottom right, #90caf9, #64b5f6)',
          borderRadius: 2,
          p: 4,
          boxShadow: 1,
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewIcon sx={{ color: '#1976d2' }} />
            <Typography variant="h6" fontWeight="bold">AI Screen View</Typography>
          </Box>
          <FormControl sx={{ width: { xs: '100%', sm: 300 }, background: '#fff', borderRadius: 1 }} size="small">
            <InputLabel>Select Safety Item</InputLabel>
            <Select value={selectedItem} label="Select Safety Item" onChange={handleItemChange}>
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
        </Box>
      </Box>

      {/* Main Content */}
      {selectedItem && safetyImages[selectedItem] && (
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent:"space-between"
          }}
        >
          {/* Left: Carousel */}
          <Grid item xs={12} md={8} sx={{ maxWidth: '68%' }}>
            <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 1, p: 2 }}>
              <Carousel
                selectedItem={currentImageIndex}
                onChange={(index) => setCurrentImageIndex(index)}
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                emulateTouch
                showArrows
                width="100%"
              >
                {safetyImages[selectedItem].map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${selectedItem} ${index + 1}`}
                      style={{ height: '400px', width: '100%', borderRadius: '8px', objectFit: 'fill' }}
                    />
                    <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                      {selectedItem} - Image {index + 1}
                    </Typography>
                  </div>
                ))}
              </Carousel>
            </Box>
          </Grid>

          {/* Right: Paginated Image Cards */}
          <Grid item xs={12} md={4} sx={{ maxWidth: '30%' }}>
            <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 1, p: 2, minWidth:"360px",minHeight:"400px",maxHeight: '600px', overflowY: 'auto' }}>
              <Grid container spacing={2}>
                {paginatedImages.map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s',
                        '&:hover': { boxShadow: 3 },
                        border: currentImageIndex === ((page - 1) * imagesPerPage + index) ? '2px solid #1976d2' : 'none',
                      }}
                      onClick={() => handleImageClick((page - 1) * imagesPerPage + index)}
                    >
                      <CardMedia
                        component="img"
                        image={image}
                        alt={`${selectedItem} ${index + 1}`}
                        sx={{ height: '90px',width:"90px", objectFit: 'fill' }}
                      />
                      <CardContent sx={{ p: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Image {(page - 1) * imagesPerPage + index + 1}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={Math.ceil(safetyImages[selectedItem].length / imagesPerPage)}
                page={page}
                onChange={handlePageChange}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AIScreenView;