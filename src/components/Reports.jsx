
import React, { useState, useEffect } from 'react';
import {
  Assessment as AssessmentIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
  CircularProgress
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const Reports = () => {
  const [selectedHazard, setSelectedHazard] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

    // Dummy data to replace API fetch
const dummyData = [
  {
    id: 1,
    hazard_name: 'Fire Hazard',
    location_name: 'Warehouse A',
    plant_name: 'Plant 1',
    priority_name: 'High',
    priority_color: '#ff0000',
    status_name: 'Under Review',
    status_color: '#ffa500',
    uploaded_at: '2025-05-25T10:30:00Z',
    image: '/src/assets/helmet2.jpg',
  },
  {
    id: 2,
    hazard_name: 'Chemical Spill',
    location_name: 'Lab B',
    plant_name: 'Plant 2',
    priority_name: 'Medium',
    priority_color: '#ffff00',
    status_name: 'In Progress',
    status_color: '#0000ff',
    uploaded_at: '2025-05-24T14:15:00Z',
    image: '/src/assets/helmet2.jpg',
  },
  {
    id: 3,
    hazard_name: 'Electrical Fault',
    location_name: 'Office C',
    plant_name: 'Plant 3',
    priority_name: 'Low',
    priority_color: '#008000',
    status_name: 'Resolved',
    status_color: '#008000',
    uploaded_at: '2025-05-23T09:00:00Z',
    image: '/src/assets/helmet2.jpg',
  },
  {
    id: 4,
    hazard_name: 'Slip Hazard',
    location_name: 'Factory Floor',
    plant_name: 'Plant 1',
    priority_name: 'Medium',
    priority_color: '#ffff00',
    status_name: 'Under Review',
    status_color: '#ffa500',
    uploaded_at: '2025-05-22T12:00:00Z',
    image: '/src/assets/helmet2.jpg',
  },
];
  // States for filter options and reports
  const [hazards, setHazards] = useState([]);
  const [locations, setLocations] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
    // const [filteredReports, setFilteredReports] = useState(dummyData);

  // Fetch filter options and initial reports
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch hazards
        const hazardsResponse = await axios.get('https://ai-safety.indusvision.ai/api/hazard/');
        if (hazardsResponse.data && hazardsResponse.data.data) {
          setHazards(hazardsResponse.data.data);
        }

        // Fetch locations
        const locationsResponse = await axios.get('https://ai-safety.indusvision.ai/api/location/');
        if (locationsResponse.data && locationsResponse.data.data) {
          setLocations(locationsResponse.data.data);
        }

        // Fetch priorities
        const prioritiesResponse = await axios.get('https://ai-safety.indusvision.ai/api/priority/');
        if (prioritiesResponse.data && prioritiesResponse.data.data) {
          setPriorities(prioritiesResponse.data.data);
        }

        // Fetch statuses
        const statusesResponse = await axios.get('https://ai-safety.indusvision.ai/api/status/');
        if (statusesResponse.data && statusesResponse.data.data) {
          setStatuses(statusesResponse.data.data);
        }

        // Fetch initial reports
        const reportsResponse = await axios.get('https://ai-safety.indusvision.ai/api/report/');
        if (reportsResponse.data && reportsResponse.data.data) {
          setReports(reportsResponse.data.data);
          setFilteredReports(reportsResponse.data.data.slice(0, itemsPerPage));
          const total = Math.ceil(reportsResponse.data.data.length / itemsPerPage);
          setTotalPages(total);
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
        setError('Failed to fetch filter options');
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilter = async () => {
    try {
      setLoading(true);
      const filterParams = {
        hazard: selectedHazard || '',
        location: selectedLocation || '',
        priority: selectedPriority || '',
        status: selectedStatus || '',
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : ''
      };

      const response = await axios.get('https://ai-safety.indusvision.ai/api/report/', {
        params: filterParams
      });

      if (response.data && response.data.data) {
        const filteredData = response.data.data;
        setFilteredReports(filteredData.slice(0, itemsPerPage));
        const total = Math.ceil(filteredData.length / itemsPerPage);
        setTotalPages(total);
        setPage(1);
      }
      setIsFilterDialogOpen(false);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedHazard('');
    setSelectedLocation('');
    setSelectedPriority('');
    setSelectedStatus('');
    setSelectedDate(null);
    setFilteredReports(reports.slice(0, itemsPerPage));
    setPage(1);
    setIsFilterDialogOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
    setSelectedImage(null);
  };

  const handlePageChange = (event, newValue) => {
    setPage(newValue);
    const startIndex = (newValue - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredReports(reports.slice(startIndex, endIndex));
  };

  const handleStatusChange = async (id, newStatus) => {
  
    try {
      setLoading(true);
      const statusObj = statuses.find(s => s.status_name == newStatus);
      const statusId = statusObj ? statusObj.id : null;
     
      if (!statusId) {
        throw new Error('Invalid status');
      }
      const response = await axios.put(`https://ai-safety.indusvision.ai/api/report/${id}/`, {
        status: statusId,
        
      });

      if (response.status == 200 || response.status == 201) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === id
              ? { ...report, status_name: newStatus, status_color: getStatusColor(newStatus) }
              : report
          )
        );
        setFilteredReports((prevFiltered) =>
          prevFiltered.map((report) =>
            report.id === id
              ? { ...report, status_name: newStatus, status_color: getStatusColor(newStatus) }
              : report
          )
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityStyle = (priorityColor) => ({
    backgroundColor: priorityColor || '#FF0000',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    display: 'inline-block'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#0000ff';
      case 'Resolved':
        return '#008000';
      case 'Under Review':
        return '#ffa500';
      default:
        return '#000000';
    }
  };

  const getStatusStyle = (statusColor) => ({
    color: statusColor || '#FF0000',
    backgroundColor: 'white',
    padding: '4px 12px',
    borderRadius: '4px',
    display: 'inline-block'
  });

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const datePart = dateString.split('T')[0];
      return datePart;
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'N/A';
    }
  };


  return (
    <div className="p-4 sm:p-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-6 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <AssessmentIcon className="text-blue-600" />
            <h1 className="text-xl font-semibold">Reports</h1>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsFilterDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <FilterIcon />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          <span>Filter Reports</span>
          <IconButton onClick={() => setIsFilterDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <FormControl fullWidth size="small">
              <InputLabel>Hazard Type</InputLabel>
              <Select
                value={selectedHazard?.hazard_name || ''}
                label="Hazard Type"
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedHazardObj = hazards.find(h => String(h.hazard_name) === String(selectedValue));
                  setSelectedHazard({
                    id: selectedHazardObj?.hazard || '',
                    name: selectedHazardObj?.hazard_name || ''
                  });
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {hazards.map((hazard) => (
                  <MenuItem key={hazard.hazard} value={hazard.hazard_name}>
                    {hazard.hazard_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location.location} value={location.location}>
                    {location.location_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedPriority}
                label="Priority"
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {priorities.map((priority) => (
                  <MenuItem key={priority.priority} value={priority.priority}>
                    {priority.priority_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status.status} value={status.status}>
                    {status.status_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth size="small" />}
              />
            </LocalizationProvider>
          </div>
          <div className="flex justify-end gap-4 p-4">
            <Button onClick={handleResetFilters} variant="outlined">
              Reset
            </Button>
            <Button onClick={handleFilter} variant="contained" color="primary">
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">
          {error}
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No reports found
        </div>
      ) : (
        <div>
          <TableContainer component={Paper} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">ID</TableCell>
                  <TableCell className="font-bold">Hazard Type</TableCell>
                  <TableCell className="font-bold">Location</TableCell>
                  <TableCell className="font-bold">Plant</TableCell>
                  <TableCell className="font-bold">Priority</TableCell>
                  <TableCell className="font-bold">Status</TableCell>
                  <TableCell className="font-bold">Reported Date</TableCell>
                  <TableCell className="font-bold">Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.hazard_name}</TableCell>
                    <TableCell>{row.location_name}</TableCell>
                    <TableCell>{row.plant_name}</TableCell>
                    <TableCell>
                      <span style={getPriorityStyle(row.priority_color)}>
                        {row.priority_name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                      value={row.status_name}
                        // value={row.id}
                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                        <MenuItem value="Under Review">Under Review</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{formatDate(row.uploaded_at)}</TableCell>
                    <TableCell>
                      {row.image && (
                        <img
                          src={row.image}
                          alt="Hazard"
                          className="w-16 h-16 object-cover rounded cursor-pointer"
                          onClick={() => handleImageClick(row.image)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              size="small"
            />
          </div>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog
        open={isImageDialogOpen}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Report Image</DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Report"
              className="w-full h-[460px] object-fill"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;