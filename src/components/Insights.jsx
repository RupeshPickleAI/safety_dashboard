import React, { useState, useEffect } from 'react';
import {
  Assessment as AssessmentIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  CalendarMonth
} from '@mui/icons-material';
import {
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { BarChart } from '@mui/x-charts/BarChart';
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
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const fetchDashboardData = async () => {
    if (fromDate > toDate) {
      setError('From date cannot be greater than To date');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const formattedFromDate = fromDate.toISOString().split('T')[0];
      const formattedToDate = toDate.toISOString().split('T')[0];

      const response = await fetch(
        `https://ai-safety.indusvision.ai/api/dashboard/?from_date=${formattedFromDate}&to_date=${formattedToDate}`
      );
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [fromDate, toDate]);

  // Process data for the chart
  const processChartData = () => {
    const dates = dashboardData.hazard_wise_counts_7_days.map(day => day.date);
    const hazardTypes = new Set();

    dashboardData.hazard_wise_counts_7_days.forEach(day => {
      Object.keys(day.hazards).forEach(hazard => {
        hazardTypes.add(hazard);
      });
    });

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

  const chartData = processChartData();

  const compliancePercentage =
    dashboardData.total_people > 0
      ? Math.round((dashboardData.remaining / dashboardData.total_people) * 100)
      : 0;

  return (
    <div className="p-4 sm:p-6">
      {/* Header Card with Stats */}
      <div className="bg-gradient-to-br from-blue-300 to-blue-200 rounded-lg p-6 shadow-sm overflow-hidden mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <AssessmentIcon className="text-blue-600" />
            <h1 className="text-xl font-semibold">Insights</h1>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'w-full sm:w-[200px] bg-white rounded-md',
                    InputProps: {
                      startAdornment: (
                        <CalendarMonth className="text-gray-400 mr-2" />
                      ),
                    },
                  },
                }}
              />
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'w-full sm:w-[200px] bg-white rounded-md',
                    InputProps: {
                      startAdornment: (
                        <CalendarMonth className="text-gray-400 mr-2" />
                      ),
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

        <div className="bg-gradient-to-br from-red-300 to-red-200 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Active Hazards</h3>
            <WarningIcon className="text-red-500" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">{dashboardData.active_hazards}</h3>
          <p className="text-sm text-gray-600 mt-2">Current active hazards</p>
        </div>

        <div className="bg-gradient-to-br from-orange-200 to-orange-200 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Compliance Rate</h3>
            <ErrorIcon className="text-orange-500" />
          </div>
          <h3 className="text-3xl font-bold text-gray-800">
            {dashboardData.remaining_percentage}%
          </h3>
          <p className="text-sm text-gray-600 mt-2">Above Target</p>
        </div>
      </div>

      {/* Stacked Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Hazard Trends (Last 7 Days)
        </h3>
        <div className="h-[400px]">
          <BarChart
            height={300}
            series={chartData.series}
            xAxis={[
              {
                data: chartData.dates,
                scaleType: 'band',
              },
            ]}
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

      {error && <div className="text-center py-4 text-red-500">{error}</div>}
    </div>
  );
};

export default Insights;
