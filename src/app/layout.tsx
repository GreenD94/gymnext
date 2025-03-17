import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootProvider } from '@/features/core/providers';
import { NavBar } from '@/features/core/navigation/nav-bar.component';
import { Box } from '@mui/material';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GymNext",
  description: "Modern gym management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <RootProvider>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                mt: '64px', // Height of AppBar
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {children}
            </Box>
          </Box>
        </RootProvider>
      </body>
    </html>
  );
}
