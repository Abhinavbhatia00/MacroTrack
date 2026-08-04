# MacroTrack

MacroTrack is a responsive calorie and macronutrient tracking application that helps users monitor daily nutrition, log food using USDA nutrition data, set personal targets, review previous meals, and track body weight.

## Live Website

[https://macrotrack-countyourcalories.vercel.app](https://macrotrack-countyourcalories.vercel.app)

## GitHub Repository

[https://github.com/Abhinavbhatia00/MacroTrack](https://github.com/Abhinavbhatia00/MacroTrack)

## Features

- Email and password authentication using Supabase
- Google OAuth login
- USDA food search with nutrition information
- Food logging based on quantity in grams
- Daily calorie, protein, carbohydrate and fibre tracking
- Custom calorie and macronutrient targets
- Visual progress indicators for nutrition targets
- Calorie balance and macronutrient distribution charts
- Daily body-weight tracking
- Weekly meal history with previous-week navigation
- Individual meal deletion
- Persistent goals, meals and weight entries using browser storage
- Responsive dark-themed interface
- Reusable React components and custom hooks

## Technology Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- HTML5
- CSS3

### Authentication and Services

- Supabase Authentication
- Google OAuth 2.0
- USDA FoodData Central API

### Libraries and Tools

- Lucide React
- React Hooks
- Fetch API
- Local Storage
- ESLint
- Git and GitHub
- Vercel

## Project Structure

The application is divided into reusable components and custom hooks to keep `App.jsx` clean and make the code easier to maintain.

```text
src/
├── components/
│   ├── CalorieBalance.jsx
│   ├── DashboardHeader.jsx
│   ├── DashboardOverview.jsx
│   ├── FoodForm.jsx
│   ├── GoalsModal.jsx
│   ├── Header.jsx
│   ├── History.jsx
│   ├── LoginModal.jsx
│   ├── MacroCard.jsx
│   ├── MacroDistribution.jsx
│   ├── MacroGrid.jsx
│   └── WeightCard.jsx
├── constants/
│   └── nutrition.js
├── hooks/
│   ├── useAuth.js
│   └── useStoredState.js
├── lib/
│   └── supabase.js
├── services/
│   └── usda.js
├── App.jsx
├── index.css
└── main.jsx
```

## Problems Solved

### Broad food-data retrieval

The USDA FoodData Central API provides access to a much wider range of foods than a small predefined food list.

### Quantity-based nutrition calculation

USDA nutrition values are converted according to the quantity entered by the user, allowing calculations for specific servings in grams.

### Authentication across environments

Supabase handles email/password accounts and Google OAuth sessions, with separate localhost and production redirect URLs.

### Persistent application state

Custom storage hooks preserve meals, nutrition goals and weight entries when the page is refreshed.

### Maintainable component structure

Interface sections are separated into reusable React components, while authentication and storage logic are handled through custom hooks.

### Responsive dashboard

The dashboard reorganizes its navigation, cards, charts, food form and history according to the available screen width.

### Historical tracking

Meals are grouped by date and displayed as weekly history, allowing users to review current and previous weeks.

## Current Limitations

- Tracking data is stored in the browser rather than in the user's Supabase account.
- Clearing browser data removes locally stored tracking information.
- Data is not synchronized across devices.
- USDA's `DEMO_KEY` has stricter request limits than a personal API key.
- Nutrition accuracy depends on the selected USDA food entry.
- The application does not provide medical or dietary advice.

## Future Improvements

- Store meals, goals and weight entries in Supabase
- Synchronize user data across devices
- Add user profile settings
- Add favourite and recently used foods
- Add reusable meal templates
- Add barcode scanning
- Add water-intake tracking
- Add longer-range nutrition reports
- Add downloadable weekly and monthly reports
- Add password reset
- Improve USDA search filtering and serving-size selection
- Add Progressive Web App support
- Add automated authentication and nutrition-calculation tests

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_USDA_API_KEY=your_usda_api_key
```

Sensitive values are not committed to the repository and are configured separately in the deployment environment.

## Author

**Abhinav Bhatia**

Frontend Developer focused on building responsive React applications with practical API integrations and maintainable component-based interfaces.
