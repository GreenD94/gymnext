'use client';

import { Box, Typography, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function LandingPageContainer() {
  const t = useTranslations('landing');
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {t('welcome')}
      </Typography>
      <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
        {t('subtitle')}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push('/login')}
          sx={{ mr: 2 }}
        >
          {t('login')}
        </Button>
      </Box>
    </Box>
  );
} 