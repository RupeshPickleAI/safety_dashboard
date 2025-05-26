import React from 'react';
// import { Menu as MenuIcon } from '@mui/icons-material';

const Header = ({ title }) => {
  return (
    <div
      className="text-white shadow-lg"
      style={{
        background: 'linear-gradient(90deg, rgb(15, 10, 63), rgb(13, 20, 48), rgb(16, 35, 94), rgb(7, 34, 102))',
      }}
    >
      <div className="px-7 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <MenuIcon className="text-white" /> */}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Future right-side header items */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
