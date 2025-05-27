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
  console.log(selectedHazard)
  const [selectedLocation, setSelectedLocation] = useState('');
  console.log(selectedLocation)
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

  // States for filter options
  const [hazards, setHazards] = useState([]);
  const [locations, setLocations] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [updateLoading, setUpdateLoading] = useState({});
const [queryParams, setQueryParams] = useState({});
console.log(queryParams)

  // Fetch all filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch hazards
        const hazardsResponse = await axios.get('http://142.93.214.65:8000/api/hazard/');
        if (hazardsResponse.data && hazardsResponse.data.data) {
          setHazards(hazardsResponse.data.data);
        }

        // Fetch locations
        const locationsResponse = await axios.get('http://142.93.214.65:8000/api/location/');
        if (locationsResponse.data && locationsResponse.data.data) {
          setLocations(locationsResponse.data.data);
        }

        // Fetch priorities
        const prioritiesResponse = await axios.get('http://142.93.214.65:8000/api/priority/');
        if (prioritiesResponse.data && prioritiesResponse.data.data) {
          setPriorities(prioritiesResponse.data.data);
        }

        // Fetch statuses
        const statusesResponse = await axios.get('http://142.93.214.65:8000/api/status/');
        if (statusesResponse.data && statusesResponse.data.data) {
          setStatuses(statusesResponse.data.data);
        }

        // Fetch initial reports
        const reportsResponse = await axios.get('http://142.93.214.65:8000/api/report/');
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

      const response = await axios.get('http://142.93.214.65:8000/api/report/', {
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

  const getPriorityStyle = (priorityColor) => {
    return {
      backgroundColor: priorityColor || '#FF0000',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      display: 'inline-block'
    };
  };

  const getStatusStyle = (statusColor) => {
    return {
      color: statusColor || '#FF0000',
      backgroundColor: 'white',
      padding: '4px 12px',
      borderRadius: '4px',
      display: 'inline-block'
    };
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      // Split the date string to get just the date part (in case there's time)
      const datePart = dateString.split('T')[0];
      return datePart; // This will return the date in YYYY-MM-DD format
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'N/A';
    }
  };

  const handleStatusChange = async (reportId, newStatusId) => {
    try {
      setUpdateLoading(prev => ({ ...prev, [reportId]: true }));
      
      // Make PUT request to update status
      const response = await axios.put(`http://142.93.214.65:8000/api/report/${reportId}/`, {
        status: newStatusId,
        is_active: true,
        compliance_count: 1
      });

      if (response.data) {
        // Update the local state with the new status
        // setReports(prevReports => 
        //   prevReports.map(report => 
        //     report.id === reportId 
        //       ? { 
        //           ...report, 
        //           status: newStatusId,
        //           status_name: statuses.find(s => s.status === newStatusId)?.status_name || report.status_name,
        //           status_color: statuses.find(s => s.status === newStatusId)?.status_color || report.status_color
        //         }
        //       : report
        //   )
        // );
        // setFilteredReports(prevReports => 
        //   prevReports.map(report => 
        //     report.id === reportId 
        //       ? { 
        //           ...report, 
        //           status: newStatusId,
        //           status_name: statuses.find(s => s.status === newStatusId)?.status_name || report.status_name,
        //           status_color: statuses.find(s => s.status === newStatusId)?.status_color || report.status_color
        //         }
        //       : report
        //   )
        // );
         // Fetch initial reports
        const reportsResponse = await axios.get('http://142.93.214.65:8000/api/report/');
        if (reportsResponse.data && reportsResponse.data.data) {
          setReports(reportsResponse.data.data);
          setFilteredReports(reportsResponse.data.data.slice(0, itemsPerPage));
      }
    }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    } finally {
      setUpdateLoading(prev => ({ ...prev, [reportId]: false }));
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-6 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side with title */}
          <div className="flex items-center gap-2">
            <AssessmentIcon className="text-blue-600" />
            <h1 className="text-xl font-semibold">Reports</h1>
          </div>

          {/* Right side with filter */}
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
      {/* Hazard Filter */}
      <FormControl fullWidth size="small">
        <InputLabel>Hazard Type</InputLabel>
        <Select
          value={selectedHazard?.id || ''}
          label="Hazard Type"
          onChange={(e) => {
            const selectedValue = e.target.value;
            const selectedHazardObj = hazards.find(h => String(h.id) === String(selectedValue));
            setSelectedHazard({
              id: selectedHazardObj?.id || '',
              name: selectedHazardObj?.hazard_name || ''
            });
            setQueryParams(prev => ({
              ...prev,
              hazard: selectedHazardObj?.id || undefined
            }));
          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {hazards.map(h => (
            <MenuItem key={h.id} value={h.id}>{h.hazard_name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Location Filter */}
      <FormControl fullWidth size="small">
        <InputLabel>Location</InputLabel>
        <Select
          value={selectedLocation?.id}
          label="Location"
          onChange={(e) => {
           console.log(locations)
            const selectedValue = e.target.value;
            console.log(selectedValue)
              const selectedLocationObj = locations.find(h => String(h.id) === String(selectedValue));
            setSelectedLocation({
              id: selectedLocationObj?.id || '',
              name: selectedLocationObj?.location_name || ''
            });
            setQueryParams(prev => ({
              ...prev,
              location: selectedLocationObj?.id || undefined
            }));
          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {locations.map(loc => (
            <MenuItem key={loc.id} value={loc.id}>
              {loc.location_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Priority Filter */}
      <FormControl fullWidth size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={selectedPriority?.id}
          label="Priority"
               onChange={(e) => {
           console.log(locations)
            const selectedValue = e.target.value;
            console.log(selectedValue)
              const selectedLocationObj = priorities.find(h => String(h.id) === String(selectedValue));
            setSelectedPriority({
              id: selectedLocationObj?.id || '',
              name: selectedLocationObj?.priority_name || ''
            });
            setQueryParams(prev => ({
              ...prev,
              priority: selectedLocationObj?.id || undefined
            }));
          }}
           
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {priorities.map(p => (
            <MenuItem key={p.id} value={p.id}>
              {p.priority_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Status Filter */}
      <FormControl fullWidth size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={selectedStatus?.id}
          label="Status"
             onChange={(e) => {
           console.log(locations)
            const selectedValue = e.target.value;
            console.log(selectedValue)
              const selectedLocationObj = statuses.find(h => String(h.id) === String(selectedValue));
            setSelectedStatus({
              id: selectedLocationObj?.id || '',
              name: selectedLocationObj?.status_name || ''
            });
            setQueryParams(prev => ({
              ...prev,
              status: selectedLocationObj?.id || undefined
            }));
          }}
      
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {statuses.map(s => (
            <MenuItem key={s.id} value={s.id}>
              {s.status_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date Filter */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Date"
    value={selectedDate}
    onChange={(newValue) => {
      setSelectedDate(newValue);
      const formatted = newValue
        ? newValue.toISOString().split('T')[0]  // YYYY-MM-DD format
        : '';
      setQueryParams(prev => ({ ...prev, uploaded_at: formatted || undefined }));
    }}
    renderInput={(params) => <TextField {...params} fullWidth size="small" />}
  />
</LocalizationProvider>

    </div>

    {/* Actions */}
    <div className="flex justify-end gap-4 p-4">
      <Button
        onClick={() => {
          setSelectedHazard({ id: '', name: '' });
          setSelectedLocation('');
          setSelectedPriority('');
          setSelectedStatus('');
          setSelectedDate(null);
          setQueryParams({ page_number: 1, data_per_page: 10 });
        }}
        variant="outlined"
      >
        Reset
      </Button>
      <Button
  onClick={async () => {
    const queryString = Object.entries(queryParams)
      .filter(([_, val]) => val !== undefined && val !== '')
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&');

    const fullURL = `http://142.93.214.65:8000/api/report/?${queryString}`;
    console.log('Final Filter URL:', fullURL);

    try {
      const reportsResponse = await axios.get(fullURL);

      if (reportsResponse.data && reportsResponse.data.data) {
        setReports(reportsResponse.data.data);
        setFilteredReports(reportsResponse.data.data.slice(0, itemsPerPage));
      }
      setIsFilterDialogOpen(false);
    } catch (error) {
      console.error('Error fetching filtered reports:', error);
      // Optionally, display an error notification here
    }
  }}
  variant="contained"
  color="primary"
>
  Apply Filters
</Button>

{/* 
      <Button
        onClick={() => {
          const queryString = Object.entries(queryParams)
            .filter(([_, val]) => val !== undefined && val !== '')
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');
            const fullURL = `http://142.93.214.65:8000/api/report/?${queryString}`;
            console.log('Final Filter URL:', fullURL);
              const reportsResponse =  axios.get(fullURL);
        if (reportsResponse.data && reportsResponse.data.data) {
          setReports(reportsResponse.data.data);
          setFilteredReports(reportsResponse.data.data.slice(0, itemsPerPage));
      }
          setIsFilterDialogOpen(false);
        }}
        variant="contained"
        color="primary"
      >
        Apply Filters
      </Button> */}
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
                      {updateLoading[row.id] ? (
                        <CircularProgress size={20} />
                      ) : (
                        <FormControl size="small" fullWidth>
                          <Select
                            value={row.status || 1} // Default to 1 (Resolved)
                            onChange={(e) => handleStatusChange(row.id, e.target.value)}
                            sx={{
                              color: row.status_color || '#008000', // Default to green for Resolved
                              '& .MuiSelect-select': {
                                color: row.status_color || '#008000',
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: row.status_color || '#008000',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: row.status_color || '#008000',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: row.status_color || '#008000',
                              }
                            }}
                            disabled={updateLoading[row.id]}
                          >
                            <MenuItem value={1} sx={{ color: '#008000' }}>Resolved</MenuItem>
                            <MenuItem value={2} sx={{ color: '#0000FF' }}>In Progress</MenuItem>
                            <MenuItem value={3} sx={{ color: '#FFA500' }}>Under Review</MenuItem>
                          </Select>
                        </FormControl>
                      )}
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
          
          {/* Pagination */}
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
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports; 