import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';

const Settings = () => {
  const [value, setValue] = useState('hazard');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Data states
  const [hazardData, setHazardData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [cameraData, setCameraData] = useState([]);
  // const [peopleCountData, setPeopleCountData] = useState([]);

  // Form states
  const [newItem, setNewItem] = useState({
    hazard_name: '',
    location_name: '',
    plant_name: '',
    priority_name: '',
    status_name: '',
    camera_name: '',
    color_code: '#000000',
    is_active: true
  });

  // Fetch data based on selected tab
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (value) {
        case 'hazard':
          const hazardResponse = await axios.get('https://ai-safety.indusvision.ai/api/hazard/');
          setHazardData(hazardResponse.data.data);
          break;
        case 'location':
          const locationResponse = await axios.get('https://ai-safety.indusvision.ai/api/location/');
          setLocationData(locationResponse.data.data);
          break;
        case 'plant':
          const plantResponse = await axios.get('https://ai-safety.indusvision.ai/api/plant/');
          setPlantData(plantResponse.data.data);
          break;
        case 'priority':
          const priorityResponse = await axios.get('https://ai-safety.indusvision.ai/api/priority/');
          setPriorityData(priorityResponse.data.data);
          break;
        case 'status':
          const statusResponse = await axios.get('https://ai-safety.indusvision.ai/api/status/');
          setStatusData(statusResponse.data.data);
          break;
        case 'camera':
          const cameraResponse = await axios.get('https://ai-safety.indusvision.ai/api/camera/');
          setCameraData(cameraResponse.data.data);
          break;
        case 'total-people-count':
          const peopleCountResponse = await axios.get('https://ai-safety.indusvision.ai/api/total_people_count/');
          setPeopleCountData(peopleCountResponse.data.data);
          break;
      }
    } catch (err) {
      console.error(`Error fetching ${value} data:`, err);
      setError(`Failed to fetch ${value} data`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setNewItem({
      hazard_name: '',
      location_name: '',
      plant_name: '',
      priority_name: '',
      status_name: '',
      camera_name: '',
      color_code: '#000000',
      is_active: true
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewItem({
      hazard_name: '',
      location_name: '',
      plant_name: '',
      priority_name: '',
      status_name: '',
      camera_name: '',
      color_code: '#000000',
      is_active: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: name === 'is_active' ? checked : value
    }));
  };

  const handleAddItem = async () => {
    try {
      let endpoint = '';
      let payload = {};

      switch (value) {
        case 'hazard':
          endpoint = 'https://ai-safety.indusvision.ai/api/hazard/';
          payload = { hazard_name: newItem.hazard_name, is_active: newItem.is_active };
          break;
        case 'location':
          endpoint = 'https://ai-safety.indusvision.ai/api/location/';
          payload = { location_name: newItem.location_name, is_active: newItem.is_active };
          break;
        case 'plant':
          endpoint = 'https://ai-safety.indusvision.ai/api/plant/';
          payload = { plant_name: newItem.plant_name, is_active: newItem.is_active };
          break;
        case 'priority':
          endpoint = 'https://ai-safety.indusvision.ai/api/priority/';
          payload = {
            priority_name: newItem.priority_name,
            color_code: newItem.color_code,
            is_active: newItem.is_active
          };
          break;
        case 'status':
          endpoint = 'https://ai-safety.indusvision.ai/api/status/';
          payload = {
            status_name: newItem.status_name,
            color_code: newItem.color_code,
            is_active: newItem.is_active
          };
          break;
        case 'camera':
          endpoint = 'https://ai-safety.indusvision.ai/api/camera/';
          payload = { camera_name: newItem.camera_name, is_active: newItem.is_active };
          break;
      }

      await axios.post(endpoint, payload);
      setSuccess(`${value.charAt(0).toUpperCase() + value.slice(1)} added successfully`);
      fetchData();
      handleCloseDialog();
    } catch (err) {
      console.error(`Error adding ${value}:`, err);
      setError(`Failed to add ${value}`);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      let endpoint = '';
      switch (value) {
        case 'hazard':
          endpoint = `https://ai-safety.indusvision.ai/api/hazard/${id}/`;
          break;
        case 'location':
          endpoint = `https://ai-safety.indusvision.ai/api/location/${id}/`;
          break;
        case 'plant':
          endpoint = `https://ai-safety.indusvision.ai/api/plant/${id}/`;
          break;
        case 'priority':
          endpoint = `https://ai-safety.indusvision.ai/api/priority/${id}/`;
          break;
        case 'status':
          endpoint = `https://ai-safety.indusvision.ai/api/status/${id}/`;
          break;
        case 'camera':
          endpoint = `https://ai-safety.indusvision.ai/api/camera/${id}/`;
          break;
      }

      await axios.delete(endpoint);
      setSuccess(`${value.charAt(0).toUpperCase() + value.slice(1)} deleted successfully`);
      fetchData();
    } catch (err) {
      console.error(`Error deleting ${value}:`, err);
      setError(`Failed to delete ${value}`);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      let endpoint = '';
      switch (value) {
        case 'hazard':
          endpoint = `https://ai-safety.indusvision.ai/api/hazard/${id}/`;
          break;
        case 'location':
          endpoint = `https://ai-safety.indusvision.ai/api/location/${id}/`;
          break;
        case 'plant':
          endpoint = `https://ai-safety.indusvision.ai/api/plant/${id}/`;
          break;
        case 'priority':
          endpoint = `https://ai-safety.indusvision.ai/api/priority/${id}/`;
          break;
        case 'status':
          endpoint = `https://ai-safety.indusvision.ai/api/status/${id}/`;
          break;
        case 'camera':
          endpoint = `https://ai-safety.indusvision.ai/api/camera/${id}/`;
          break;
      }

      await axios.patch(endpoint, { is_active: !currentStatus });
      setSuccess(`Status updated successfully`);
      fetchData();
    } catch (err) {
      console.error(`Error updating ${value} status:`, err);
      setError(`Failed to update status`);
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return (
        <Alert severity="error" className="my-4">
          {error}
        </Alert>
      );
    }

    let data = [];
    let columns = [];

    switch (value) {
      case 'hazard':
        data = hazardData;
        columns = ['ID', 'Hazard Name', 'Status', 'Actions'];
        break;
      case 'location':
        data = locationData;
        columns = ['ID', 'Location Name', 'Status', 'Actions'];
        break;
      case 'plant':
        data = plantData;
        columns = ['ID', 'Plant Name', 'Status', 'Actions'];
        break;
      case 'priority':
        data = priorityData;
        columns = ['ID', 'Priority Name', 'Color', 'Status', 'Actions'];
        break;
      case 'status':
        data = statusData;
        columns = ['ID', 'Status Name', 'Color', 'Status', 'Actions'];
        break;
      case 'camera':
        data = cameraData;
        columns = ['ID', 'Camera Name', 'Status', 'Actions'];
        break;
      case 'total-people-count':
        data = peopleCountData;
        columns = ['ID', 'Department', 'Count', 'Actions'];
        break;
    }

    return (
      <TableContainer 
        component={Paper} 
        className="mt-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-lg shadow-md"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-gray-100 to-gray-200">
              {columns.map((column) => (
                <TableCell key={column} className="font-bold text-gray-700 py-4">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow 
                key={item.id} 
                hover 
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <TableCell className="py-3">{item.id}</TableCell>
                <TableCell className="py-3">
                  {item.hazard_name || item.location_name || item.plant_name || 
                   item.priority_name || item.status_name || item.camera_name || item.department}
                </TableCell>
                {(value === 'priority' || value === 'status') && (
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: item.color_code }}
                      />
                      <span className="text-sm text-gray-600">{item.color_code}</span>
                    </div>
                  </TableCell>
                )}
                {value !== 'total-people-count' && (
                  <TableCell className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                )}
                <TableCell className="py-3">
                  <div className="flex gap-2">
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteItem(item.id)}
                        className="hover:bg-red-50"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getDialogTitle = () => {
    const titles = {
      hazard: 'Add New Hazard',
      location: 'Add New Location',
      plant: 'Add New Plant',
      priority: 'Add New Priority',
      status: 'Add New Status',
      camera: 'Add New Camera',
      'total-people-count': 'Add New Department'
    };
    return titles[value];
  };

  const renderDialogContent = () => {
    switch (value) {
      case 'hazard':
        return (
          <TextField
            autoFocus
            margin="dense"
            name="hazard_name"
            label="Hazard Name"
            type="text"
            fullWidth
            value={newItem.hazard_name}
            onChange={handleInputChange}
          />
        );
      case 'location':
        return (
          <TextField
            autoFocus
            margin="dense"
            name="location_name"
            label="Location Name"
            type="text"
            fullWidth
            value={newItem.location_name}
            onChange={handleInputChange}
          />
        );
      case 'plant':
        return (
          <TextField
            autoFocus
            margin="dense"
            name="plant_name"
            label="Plant Name"
            type="text"
            fullWidth
            value={newItem.plant_name}
            onChange={handleInputChange}
          />
        );
      case 'priority':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              name="priority_name"
              label="Priority Name"
              type="text"
              fullWidth
              value={newItem.priority_name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="color_code"
              label="Color Code"
              type="color"
              fullWidth
              value={newItem.color_code}
              onChange={handleInputChange}
            />
          </>
        );
      case 'status':
        return (
          <>
            <TextField
              autoFocus
              margin="dense"
              name="status_name"
              label="Status Name"
              type="text"
              fullWidth
              value={newItem.status_name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="color_code"
              label="Color Code"
              type="color"
              fullWidth
              value={newItem.color_code}
              onChange={handleInputChange}
            />
          </>
        );
      case 'camera':
        return (
          <TextField
            autoFocus
            margin="dense"
            name="camera_name"
            label="Camera Name"
            type="text"
            fullWidth
            value={newItem.camera_name}
            onChange={handleInputChange}
          />
        );
      case 'total-people-count':
        return (
          <TextField
            autoFocus
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            value={newItem.department}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
        <Box sx={{ width: '100%' }}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Settings</h1>
              <p className="text-gray-500">Manage your application settings</p>
            </div>
            <div className="flex gap-3">
              <Tooltip title="Refresh">
                <IconButton 
                  onClick={fetchData} 
                  color="primary"
                  className="bg-blue-50 hover:bg-blue-100"
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
              >
                Add New
              </Button>
            </div>
          </div>

          {success && (
            <Alert 
              severity="success" 
              className="mb-4 rounded-lg shadow-sm" 
              onClose={() => setSuccess(null)}
            >
              {success}
            </Alert>
          )}

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-1 mb-6">
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="settings tabs"
              className="border-b-0"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  minWidth: 100,
                  '&.Mui-selected': {
                    color: '#1e40af',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  },
                },
              }}
            >
              <Tab value="hazard" label="Hazard" />
              <Tab value="location" label="Location" />
              <Tab value="priority" label="Priority" />
              <Tab value="plant" label="Plant" />
              <Tab value="status" label="Status" />
              <Tab value="camera" label="Camera" />
              {/* <Tab value="total-people-count" label="Total People Count" /> */}
            </Tabs>
          </div>
        </Box>

        {renderTable()}
      </div>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-xl shadow-2xl"
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
          <h2 className="text-xl font-semibold text-gray-800">{getDialogTitle()}</h2>
        </DialogTitle>
        <DialogContent className="bg-white">
          {renderDialogContent()}
        </DialogContent>
        <DialogActions className="bg-gray-50 px-6 py-4">
          <Button 
            onClick={handleCloseDialog}
            className="text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            disabled={!newItem[`${value}_name`]?.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings; 