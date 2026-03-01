'use client';

import React from 'react';
import { Box, InputBase } from '@mui/material';
import Image from 'next/image';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Найти юриста',
  value,
  onChange,
}) => {
  return (
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
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        sx={{
          flex: 1,
          fontFamily: 'Inter',
          fontSize: '10px',
          fontWeight: 400,
          color: '#8E939D',
          '& input::placeholder': {
            color: '#8E939D',
            opacity: 1,
          },
        }}
      />
      <Box
        component="img"
        src="/images/marketplace/search-icon.png"
        alt="Search"
        sx={{ width: '12px', height: '12px' }}
      />
    </Box>
  );
};
