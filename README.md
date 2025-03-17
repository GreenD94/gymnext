# GymNext 🏋️‍♂️

A modern, feature-rich gym management system built with Next.js, TypeScript, and Material-UI. GymNext helps gyms streamline their operations while providing an engaging experience for members and trainers.

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
- Node.js 18 or later
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

### Color Palette

- **Primary**: Blue (#2563eb)
- **Secondary**: Violet (#7c3aed)
- **Background**:
  - Light: Slate-50 (#f8fafc)
  - Dark: Slate-900 (#0f172a)
- **Surface**:
  - Light: White (#ffffff)
  - Dark: Slate-800 (#1e293b)

### Usage

```typescript
// Access theme in components
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  return (
    <div style={{ color: theme.palette.primary.main }}>
      Themed content
    </div>
  );
}

// Toggle theme
import { useTheme } from '@/features/core/providers/theme.provider';

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Current theme: {mode}
    </button>
  );
}
```

### Component Guidelines

1. Use Material-UI components with theme customization
2. Follow consistent spacing:
   - Buttons/Inputs: 8px border radius
   - Cards/Papers: 12px border radius
3. Typography:
   - Use theme typography variants (h1-h6, body1, body2)
   - Font family: Inter
4. Colors:
   - Use theme palette colors
   - Avoid hardcoded colors

## 🏗️ Project Structure

### Container Pattern 🎯

We follow a strict container pattern that separates concerns:

```
/app
  /login
    page.tsx  (thin wrapper)
    
/features
  /auth
    /containers     (business logic)
    /components    (UI components)
    /actions       (server actions)
    /utils        (utilities)
```

#### Key Principles:

1. **Pages are Simple** 📄
   - Only import and render containers
   - No business logic
   - Example:
   ```tsx
   export default function LoginPage() {
     return <LoginPageContainer />;
   }
   ```

2. **Containers are Smart** 🧠
   - Handle business logic
   - Manage state
   - Handle data fetching
   - Live in feature modules
   - Named as `{page-name}-page.container.tsx`

3. **Components are Dumb** 🎨
   - Pure presentational
   - Receive data via props
   - Reusable across features

### Directory Structure

```
src/
├── app/              # Next.js routes
├── features/         # Feature modules
│   ├── core/        # Shared utilities
│   ├── auth/        # Authentication
│   ├── profile/     # User profiles
│   └── workouts/    # Workout management
└── public/          # Static assets
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

### Branch Naming Convention 🌿

We follow a strict branch naming convention to maintain consistency and clarity:

```
username/type/task_name
```

- All branches must be created from `develop`
- Use only lowercase English letters and underscores
- Components:
  - `username`: Your developer name (e.g., hernando)
  - `type`: Either `feature` or `fix`
  - `task_name`: Brief description using underscores

Examples:
```bash
hernando/feature/create_login_form
john/fix/password_validation
maria/feature/add_exercise_tracker
```

### Contributing Steps
1. Fork the repository
2. Create your feature branch following the naming convention
3. Follow our coding standards
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material UI for the component library
- TanStack Query for data management
- Supabase for backend services

## 📦 Package Management

### Important Note ⚠️

To maintain package compatibility and version control, we follow these rules:

1. **Never Modify package.json Directly**
   - Don't manually edit version numbers
   - Don't add/remove packages by editing the file

2. **Installing Packages**
   ```bash
   # Production dependencies
   npm install package-name@version

   # Development dependencies
   npm install --save-dev package-name@version
   ```

3. **Version Control**
   - Always specify exact versions
   - Check peer dependencies
   - Test compatibility before committing

4. **Example**
   ```bash
   # ✅ Do this:
   npm install @mui/material@5.15.11

   # ❌ Don't do this:
   # - Don't edit package.json directly
   # - Don't use loose version ranges
   ```

## Internationalization

### Message Structure

Messages are organized by feature and stored in JSON files:

```typescript
// src/features/core/messages/en.json
{
  "app": {
    "name": "GymNext",
    "theme": {
      "light": "Light",
      "dark": "Dark"
    }
  },
  "auth": {
    "login": {
      "title": "Welcome Back"
    }
  }
}
```

### Using Translations

```typescript
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('feature.component');
  return <h1>{t('title')}</h1>;
}
```

### Language Switching

The application supports English and Spanish languages:
- Language can be changed via the top bar toggle
- Uses local state management
- No URL-based routing
- Persists user preference
