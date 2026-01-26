'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Category } from '@/shared/types/marketplace';
import Image from 'next/image';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: '72px',
        height: '72px',
        background: category.gradient,
        borderRadius: '16px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '12px',
          lineHeight: '1.3',
          color: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1,
        }}
      >
        {category.label}
      </Typography>
      {category.icon && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <Image
            src={category.icon}
            alt={category.label}
            width={50}
            height={50}
            style={{
              objectFit: 'contain',
              transform: category.id === 'debts' ? 'scaleY(-1)' : 'none',
            }}
          />
        </Box>
      )}
    </Box>
  );
};
