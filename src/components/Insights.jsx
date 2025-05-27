import React, { useState, useEffect } from 'react';
import { 
  Assessment as AssessmentIcon,
  FilterList as FilterIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  CalendarMonth
} from '@mui/icons-material';
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import { 
  Tab, 
  Pagination, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Stack,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const Insights = () => {
  const [dashboardData, setDashboardData] = useState({
    date: '',
    total_people: 0,
    compliance_count: 0,
    remaining: 0,
    remaining_percentage: 0,
    active_hazards: 0,
    hazard_wise_counts: [],
    hazard_wise_counts_7_days: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const facilities = [
    'All Facilities',
    'Facility 1',
    'Facility 2',
    'Facility 3'
  ];

  useEffect(() => {
    fetchDashboardData();
  }, [selectedFacility, selectedDate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.0.147:8000/api/dashboard/');
      console.log('Dashboard API Response:', response.data);
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Process data for the chart
  const processChartData = () => {
    const dates = dashboardData.hazard_wise_counts_7_days.map(day => day.date);
    const hazardTypes = new Set();
    
    // Get all unique hazard types
    dashboardData.hazard_wise_counts_7_days.forEach(day => {
      Object.keys(day.hazards).forEach(hazard => {
        hazardTypes.add(hazard);
      });
    });

    // Create series for each hazard type
    const series = Array.from(hazardTypes).map(hazardType => {
      const data = dashboardData.hazard_wise_counts_7_days.map(day => 
        day.hazards[hazardType] || 0
      );
      return {
        data,
        label: hazardType,
        stack: 'total'
      };
    });

    return {
      dates,
      series
    };
  };

  // Calculate compliance percentage
  const compliancePercentage = dashboardData.total_people > 0 
    ? Math.round((dashboardData.remaining / dashboardData.total_people) * 100) 
    : 0;

  // Format date safely
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  const handleFacilityChange = (event) => {
    setSelectedFacility(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const chartData = processChartData();

  return (
    <div className="p-4 sm:p-6">
      {/* Header Card with Stats */}
      <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-6 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side with title */}
          <div className="flex items-center gap-2">
            <AssessmentIcon className="text-blue-600" />
            <h1 className="text-xl font-semibold">Insights</h1>
          </div>

          {/* Right side with filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Facility Dropdown
            <FormControl size="small" className="w-full sm:w-[200px] bg-white rounded-md">
              <InputLabel>Facility</InputLabel>
              <Select
                value={selectedFacility}
                label="Facility"
                onChange={handleFacilityChange}
                className="bg-white"
              >
                {facilities.map((facility) => (
                  <MenuItem key={facility} value={facility}>
                    {facility}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            {/* Date Picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: "small",
                    className: "w-full sm:w-[200px] bg-white rounded-md",
                    InputProps: {
                      startAdornment: <CalendarMonth className="text-gray-400 mr-2" />,
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Workskpace Compliance Card */}
        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Workspace Compliance</h3>
            <CheckCircleIcon className="text-green-200" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-800">{dashboardData.remaining}</h3>
            <span className="text-gray-500">/ {dashboardData.total_people}</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-700 h-2 rounded-full" 
                style={{ width: `${compliancePercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{compliancePercentage}% Compliant</p>
          </div>
        </div>

         {/* Personal Compliance Card */}
        <div className="bg-gradient-to-br from-green-300 to-green-200 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Personal Compliance</h3>
            <CheckCircleIcon className="text-green-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-800">{dashboardData.remaining}</h3>
            <span className="text-gray-500">/ {dashboardData.total_people}</span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-700 h-2 rounded-full" 
                style={{ width: `${compliancePercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{compliancePercentage}% Compliant</p>
          </div>
        </div>

        {/* Active Hazards Card */}
        <div className="bg-gradient-to-br from-red-300 to-red-200 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Active Hazards</h3>
            <WarningIcon className="text-red-500" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{dashboardData.active_hazards}</h3>
          <p className="text-sm text-gray-600 mt-2">Current active hazards</p>
        </div>

        {/* Remaining Card */}
        <div className="bg-gradient-to-br from-orange-200 to-orange-200 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Compliance Rate</h3>
            <ErrorIcon className="text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{dashboardData.remaining_percentage}</h3>
          <p className="text-sm text-gray-600 mt-2">Above Target</p>
        </div>
      </div>

      {/* Stacked Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Hazard Trends (Last 7 Days)</h3>
        <div className="h-[400px]">
          <BarChart
            height={300}
            series={chartData.series}
            xAxis={[{
              data: chartData.dates,
              scaleType: 'band',
            }]}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          />
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading dashboard data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-4 text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default Insights; 