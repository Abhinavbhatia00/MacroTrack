# MacroTrack

MacroTrack is a responsive calorie and macro tracker built with React, Vite and Tailwind CSS. It supports USDA FoodData Central search, Supabase email and Google authentication, editable nutrition targets, weekly history and daily body-weight logging.

## Technologies

- React
- Vite
- JavaScript
- Tailwind CSS
- Supabase Auth
- USDA FoodData Central API
- Fetch API
- Lucide React

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Add your Supabase URL, Supabase publishable key and USDA API key.
4. Run the project with `npm run dev`.

For Supabase redirects, allow both `http://localhost:5173/**` and your deployed URL. For Google OAuth, use your Supabase callback URL as the authorized redirect URI.
