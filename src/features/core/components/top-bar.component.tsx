'use client';

import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import { useTheme } from '../providers/theme.provider';
import { useLanguage } from '../providers/language.provider';
import { useTranslations } from 'next-intl';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TranslateIcon from '@mui/icons-material/Translate';
import { useState } from 'react';
import type { Locale } from '../messages';

export function TopBar() {
  const { mode, toggleTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    handleLanguageClose();
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar>
        <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {t('app.name')}
        </Typography>
        
        <IconButton onClick={handleLanguageClick} color="inherit" sx={{ mr: 1 }}>
          <TranslateIcon />
        </IconButton>
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleLanguageClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem 
            onClick={() => handleLanguageSelect('en')}
            selected={locale === 'en'}
          >
            {t('app.language.en')}
          </MenuItem>
          <MenuItem 
            onClick={() => handleLanguageSelect('es')}
            selected={locale === 'es'}
          >
            {t('app.language.es')}
          </MenuItem>
        </Menu>

        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
} 