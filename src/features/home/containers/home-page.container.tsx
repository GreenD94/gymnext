'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const HomePageContainer = () => {
  const t = useTranslations('home');
  
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Typography variant="h2" component="h1">
        {t('welcome')}
      </Typography>
    </Box>
  );
}; 