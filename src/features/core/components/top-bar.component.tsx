'use client';

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useTheme } from '../providers/theme.provider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export function TopBar() {
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Toolbar>
        <FitnessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          GymNext
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
} 