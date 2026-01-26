'use client';

import React from 'react';
import { Box, IconButton } from '@mui/material';
import Image from 'next/image';

interface MarketplaceHeaderProps {
  onMenuClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  onMenuClick,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '24px 24px',
        width: '100%',
      }}
    >
      {/* Menu Icon */}
      <IconButton
        onClick={onMenuClick}
        sx={{
          width: '40px',
          height: '40px',
          padding: 0,
        }}
      >
        <Image
          src="/images/marketplace/menu-icon.png"
          alt="Menu"
          width={40}
          height={40}
        />
      </IconButton>

      {/* Search Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: '#FFFFFF',
          border: '1px solid #DFE1E6',
          borderRadius: '12px',
          padding: '12px',
          height: '40px',
          flex: '1 0 0',
        }}
      >
        <Box
          component="input"
          placeholder="Найти юриста"
          sx={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter',
            fontSize: '10px',
            fontWeight: 400,
            color: '#8E939D',
            background: 'transparent',
            '&::placeholder': {
              color: '#8E939D',
            },
          }}
        />
        <Image
          src="/images/marketplace/search-icon.png"
          alt="Search"
          width={12}
          height={12}
        />
      </Box>

      {/* Filter Icons */}
      <IconButton sx={{ width: '21.5px', height: '21.5px', padding: 0 }}>
        <Image
          src="/images/marketplace/filter-icon-1.png"
          alt="Filter 1"
          width={21.5}
          height={21.5}
        />
      </IconButton>
      <IconButton sx={{ width: '21.5px', height: '21.5px', padding: 0 }}>
        <Image
          src="/images/marketplace/filter-icon-2.png"
          alt="Filter 2"
          width={21.5}
          height={21.5}
        />
      </IconButton>
      <IconButton sx={{ width: '21.5px', height: '21.5px', padding: 0 }}>
        <Image
          src="/images/marketplace/filter-icon-3.png"
          alt="Filter 3"
          width={21.5}
          height={21.5}
        />
      </IconButton>
    </Box>
  );
};
