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
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AIScreenView = () => {
  const [selectedHazard, setSelectedHazard] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const imagesPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://ai-safety.indusvision.ai/api/report/');
      const data = await response.json();
      setApiData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Get unique hazards for dropdown
  const uniqueHazards = [...new Set(apiData.map(item => ({
    id: item.hazard,
    name: item.hazard_name
  })))].filter((hazard, index, self) => 
    index === self.findIndex(h => h.id === hazard.id)
  );

  const handleHazardChange = (event) => {
    setSelectedHazard(event.target.value);
    setCurrentImageIndex(0);
    setPage(1);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Filter images for selected hazard
  const filteredImages = selectedHazard 
    ? apiData.filter(item => item.hazard === selectedHazard && item.image)
    : [];

  const paginatedImages = filteredImages.slice((page - 1) * imagesPerPage, page * imagesPerPage);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
            <Select value={selectedHazard} label="Select Safety Item" onChange={handleHazardChange}>
              <MenuItem value="">
                <em>Select a safety item</em>
              </MenuItem>
              {uniqueHazards.map((hazard) => (
                <MenuItem key={hazard.id} value={hazard.id}>
                  {hazard.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Content */}
      {selectedHazard && filteredImages.length > 0 && (
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
                {filteredImages.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.image}
                      alt={`${item.hazard_name} ${index + 1}`}
                      style={{ height: '400px', width: '100%', borderRadius: '8px', objectFit: 'fill' }}
                    />
                    <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                      {item.hazard_name} - {item.location_name} - {item.plant_name}
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
                {paginatedImages.map((item, index) => (
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
                        image={item.image}
                        alt={`${item.hazard_name} ${index + 1}`}
                        sx={{ height: '90px',width:"90px", objectFit: 'fill' }}
                      />
                      <CardContent sx={{ p: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {item.location_name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Pagination
                count={Math.ceil(filteredImages.length / imagesPerPage)}
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