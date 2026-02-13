'use client';

import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, X } from 'lucide-react';
import { CategoryCard } from '@/components/marketplace/category-card';
import { LawyerCard } from '@/components/marketplace/lawyer-card';
import { categories, lawyers } from '@/shared/constants/marketplace-data';

export default function MarketplacePage() {
  const router = useRouter();
  const [marketplaceModalOpen, setMarketplaceModalOpen] = useState(true);

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
  };

  const handleLawyerContact = (lawyerId: string) => {
    console.log('Contact lawyer:', lawyerId);
  };

  const handleMenuClick = () => {
    router.push('/');
  };

  return (
    <>
      <Box
        sx={{
          background: '#FFFFFF',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          position: 'relative',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
        {/* Menu Icon */}
        <Box
          onClick={handleMenuClick}
          sx={{
            width: '40px',
            height: '40px',
            flexShrink: 0,
            cursor: 'pointer',
          }}
        >
          <Image
            src="/images/marketplace/menu-icon.png"
            alt="Menu"
            width={40}
            height={40}
          />
        </Box>

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
            flex: 1,
          }}
        >
          <Box
            component="input"
            placeholder="Найти юриста"
            sx={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
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
        <Box sx={{ width: '21.5px', height: '21.5px', flexShrink: 0, cursor: 'pointer' }}>
          <Image
            src="/images/marketplace/filter-icon-1.png"
            alt="Filter"
            width={21.5}
            height={21.5}
          />
        </Box>
        <Box sx={{ width: '21.5px', height: '21.5px', flexShrink: 0, cursor: 'pointer' }}>
          <Image
            src="/images/marketplace/filter-icon-2.png"
            alt="Filter"
            width={21.5}
            height={21.5}
          />
        </Box>
        <Box sx={{ width: '21.5px', height: '21.5px', flexShrink: 0, cursor: 'pointer' }}>
          <Image
            src="/images/marketplace/filter-icon-3.png"
            alt="Filter"
            width={21.5}
            height={21.5}
          />
        </Box>
      </Box>

      {/* Categories */}
      <Box
        sx={{
          padding: '16px 24px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          background: '#F3F5F9',
          flex: 1,
          borderRadius: '32px 32px 0 0',
          padding: '24px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Title */}
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '1.1',
            color: '#212121',
          }}
        >
          У нас только лучшие юристы
        </Typography>

        {/* Lawyers Grid */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1,
          }}
        >
          {/* First Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <LawyerCard
              lawyer={lawyers[0]}
              onContact={() => handleLawyerContact(lawyers[0].id)}
            />
            <LawyerCard
              lawyer={lawyers[1]}
              onContact={() => handleLawyerContact(lawyers[1].id)}
            />
          </Box>

          {/* Second Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <LawyerCard
              lawyer={lawyers[2]}
              onContact={() => handleLawyerContact(lawyers[2].id)}
            />
            <LawyerCard
              lawyer={lawyers[3]}
              onContact={() => handleLawyerContact(lawyers[3].id)}
            />
          </Box>
        </Box>
      </Box>
      </Box>

      <Modal
        open={marketplaceModalOpen}
        onClose={() => setMarketplaceModalOpen(false)}
        aria-labelledby="marketplace-unavailable-title"
      >
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: '24px',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '520px',
              borderRadius: '24px',
              bgcolor: '#FFFFFF',
              px: '24px',
              pt: '24px',
              pb: '32px',
              position: 'relative',
            }}
          >
            <Box
              component="button"
              onClick={() => setMarketplaceModalOpen(false)}
              sx={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                border: 'none',
                background: 'transparent',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#B6BBC5',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  bgcolor: '#EEF2FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8AA6F4',
                  mb: '20px',
                }}
              >
                <Lock size={28} />
              </Box>

              <Typography
                id="marketplace-unavailable-title"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '1.2',
                  color: '#212121',
                  textAlign: 'center',
                }}
              >
                Маркетплейс пока недоступен
              </Typography>

              <Typography
                sx={{
                  mt: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 400,
                  lineHeight: '1.3',
                  color: '#8E939D',
                  textAlign: 'center',
                  maxWidth: '340px',
                }}
              >
                Следите за обновлениями, совсем скоро здесь появится новый раздел
              </Typography>

              <Box
                component="button"
                onClick={() => router.push('/home-new')}
                sx={{
                  mt: '28px',
                  width: '100%',
                  maxWidth: '420px',
                  height: '40px',
                  borderRadius: '16px',
                  border: 'none',
                  bgcolor: '#F3F5F9',
                  color: '#8AA6F4',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  lineHeight: '1.3',
                  cursor: 'pointer',
                }}
              >
                Вернуться назад
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
