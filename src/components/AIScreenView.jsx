import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

const AIScreenView = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const imagesPerPage = 6;
   const [safetyItems, setSafetyItems] = useState([]);
  
console.log(safetyItems)
  // Fetch safety items (hazards) on component mount
  const fetchSafetyItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found. Please log in.');
      }

      const response = await axios.get('http://142.93.214.65:8000/api/hazard/', {
       headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.data) {
        setSafetyItems(response.data.data.filter(item => item.is_active));
      } else {
        setError('No safety items found.');
      }
    } catch (err) {
      setError('Failed to fetch safety items.');
      console.error('Error fetching safety items:', err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchSafetyItems();
  }, []);

  // // Map safety items to hazard IDs for API
  // const safetyItems = [
  //   {
  //     "id": 4,
  //     "hazard_name": "safety eye glass",
  //     "is_active": true
  //   },
  //   {
  //     "id": 3,
  //     "hazard_name": "safety jacket",
  //     "is_active": true
  //   },
  //   {
  //     "id": 2,
  //     "hazard_name": "Safety helmet",
  //     "is_active": true
  //   },
  //   {
  //     "id": 1,
  //     "hazard_name": "Safety gloves",
  //     "is_active": true
  //   }
  // ];

  const handleItemChange = async (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setSelectedItem(selectedValue);
    setCurrentImageIndex(0);
    setPage(1);
    setError(null);

    if (selectedValue) {
      const selectedHazard = safetyItems.find(item => item.id === selectedValue);
      if (selectedHazard) {
        fetchImages(selectedHazard.id);
      }
    } else {
      setImages([]);
    }
  };

  const fetchImages = async (hazardId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found. Please log in.');
      }

      const response = await axios.get(`http://142.93.214.65:8000/api/report/?hazard=${hazardId}`, {
        headers: {
          'accept': 'application/json'
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (response.data && response.data.data) {
        const fetchedImages = response.data.data.map(report => ({
          image: report.image,
          id: report.id,
        }));
        setImages(fetchedImages);
      } else {
        setImages([]);
        setError('No images found for the selected hazard.');
      }
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
      console.error('Fetch error:', err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedImages = images.slice((page - 1) * imagesPerPage, page * imagesPerPage);

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
                <MenuItem key={item.id} value={item.id}>
                  {item.hazard_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ my: 4 }}>
          {error}
        </Typography>
      ) : selectedItem && images.length > 0 ? (
        <Grid
          container
          spacing={2}
          sx={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
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
                {images.map((item, index) => (
                  <div key={item.id}>
                    <img
                      src={item.image}
                      alt={`Image ${index + 1}`}
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
            <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 1, p: 2, minWidth: '360px', minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
              <Grid container spacing={2}>
                {paginatedImages.map((item, index) => (
                  <Grid item xs={6} key={item.id}>
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
                        image={item.image}
                        alt={`Image ${index + 1}`}
                        sx={{ height: '90px', width: '90px', objectFit: 'fill' }}
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
                count={Math.ceil(images.length / imagesPerPage)}
                page={page}
                onChange={handlePageChange}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          </Grid>
        </Grid>
      ) : selectedItem ? (
        <Typography align="center" sx={{ my: 4 }}>
          No images available for the selected item.
        </Typography>
      ) : null}
    </Box>
  );
};

export default AIScreenView;