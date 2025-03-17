# GymNext 🏋️‍♂️

A modern, feature-rich gym management system built with Next.js and Material UI. GymNext helps gyms streamline their operations while providing an engaging experience for members and trainers.

## 🌟 Features

### For Members
- Easy QR code check-in system
- Daily exercise tracking with Instagram-style feed
- Streak tracking and achievements
- Customizable avatar selection
- Bilingual support (English/Spanish)
- Dark/Light mode themes

### For Trainers
- Real-time attendance tracking
- Exercise assignment system
- Client progress monitoring
- Customizable workout plans

### For Administrators
- Comprehensive member management
- Payment tracking and billing history
- News and announcements system
- Member status management
- QR code generation for check-ins

## 🚀 Getting Started

### Prerequisites
- Node.js (version specified in .nvmrc)
- npm or yarn
- Supabase account

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/gymnext.git
cd gymnext
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials and other required variables.

4. Run the development server:
```bash
npm run dev
```

## 🎨 Theme Configuration

### Light Theme
- Background: Deep Navy Blue (#0A1A3F)
- Text: White (#FFFFFF)
- Accent: Bright Cyan Blue (#00B7FF)

### Dark Theme
- Background: Rich Black (#0A0C10)
- Text: Light Silver (#E8E9EA)
- Accent: Dark Steel Blue (#2A3544)

## 🏗️ Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── auth/         # Authentication
│   ├── profile/      # User profiles
│   ├── workouts/     # Workout management
│   └── billing/      # Payment handling
├── core/             # Shared utilities
└── public/           # Static assets
    ├── avatars/      # User avatars
    └── exercises/    # Exercise videos
```

## 🔑 User Roles

1. **Super Admin**
   - Complete system access
   - System configuration

2. **Admin**
   - Member management
   - Payment processing
   - News management

3. **Trainer**
   - Client management
   - Workout assignments
   - Attendance tracking

4. **Client**
   - Workout tracking
   - Check-in system
   - Profile management

## 🧪 Testing

```bash
npm run test
```

We focus on unit testing for:
- Utility functions
- Server actions
- Business logic

## 🌐 Internationalization

The app supports both English and Spanish languages. To add translations:

1. Add new strings to `/locales/{lang}/common.json`
2. Use the translation hook in components

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices, providing a seamless experience across all screen sizes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Follow our coding standards
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material UI for the component library
- TanStack Query for data management
- Supabase for backend services
