'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Lawyer } from '@/shared/types/marketplace';
import Image from 'next/image';

interface LawyerCardProps {
  lawyer: Lawyer;
  onContact?: () => void;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onContact }) => {
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.06)',
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Photo */}
      <Box
        sx={{
          width: '100%',
          height: '112px',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#F3F5F9',
        }}
      >
        <Image
          src={lawyer.photo}
          alt={lawyer.name}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Experience Badge */}
        {lawyer.experience && (
          <Box
            sx={{
              background: 'rgba(138, 166, 244, 0.12)',
              color: '#8AA6F4',
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 400,
              lineHeight: '1.3',
              padding: '4px 8px',
              borderRadius: '80px',
              alignSelf: 'flex-start',
              whiteSpace: 'nowrap',
            }}
          >
            {lawyer.experience}
          </Box>
        )}

        {/* Name */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '1.2',
            color: '#212121',
          }}
        >
          {lawyer.name}
        </Typography>

        {/* Specialization */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '10px',
            lineHeight: '1.3',
            color: '#8E939D',
            whiteSpace: 'pre-wrap',
          }}
        >
          {lawyer.specialization}
        </Typography>
      </Box>

      {/* Price and Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '1.2',
            color: '#8AA6F4',
          }}
        >
          от {lawyer.priceFrom} ₽
        </Typography>
        <Box
          onClick={onContact}
          sx={{
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/marketplace/arrow-button.png"
            alt="Contact"
            width={32}
            height={32}
          />
        </Box>
      </Box>
    </Box>
  );
};
