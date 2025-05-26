import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Insights from './components/Insights';
import Reports from './components/Reports';
import Header from './components/Header';
import AIScreenView from './components/AIScreenView';
import Settings from './components/Settings';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  // Check if user is authenticated (you can implement your own auth logic)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 lg:ml-64 flex flex-col">
          <Header />
          <main className="p-4 lg:p-6 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-screen-view"
          element={
            <ProtectedRoute>
              <AIScreenView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
