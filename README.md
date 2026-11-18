# NXT_RAIL Management Frontend

React client for the NXT_RAIL railway reservation and operations platform. It provides passenger booking journeys, PNR and live-status tools, travel add-ons, an AI concierge, and administrative inventory management.

**Related service:** [NXT_RAIL Backend](https://github.com/amanfoundongithub/Railway-Management-backend)

## Features

- Train search with source, destination, date, class, and quota filters
- Passenger details, seat selection, fare summary, payment, and confirmation flow
- PNR lookup, live train status, and train schedule views
- Booking history, ticket PDF generation, and cancellation
- E-catering, cab, and hotel booking flows
- Floating NXT_RAIL AI Concierge with PNR context
- Markdown responses, including lists, tables, and journey details
- Customer and admin navigation with role-aware UI controls
- Animated page transitions and responsive Material UI components

## Technology

| Category | Technology |
| --- | --- |
| UI | React 19, Material UI 9 |
| Routing | React Router DOM 7 |
| HTTP | Axios |
| Animation | Framer Motion |
| Maps | Leaflet / React Leaflet |
| Content | React Markdown, remark-gfm |
| Build | Create React App |

## Prerequisites

- Node.js 18 or newer
- npm
- A running instance of the NXT_RAIL backend

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

3. Set the backend API URL in `.env`:

   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000`.

Restart the React development server after changing environment variables.

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Search trains |
| `/search-results` | Filter and select train results |
| `/book` | Passenger and booking details |
| `/payment` | Payment flow |
| `/ticket/confirmation` | Booking confirmation and ticket PDF |
| `/pnr-status` | PNR lookup |
| `/live-status` | Live train status |
| `/schedule` | Train schedule |
| `/cancel` | Ticket cancellation |
| `/my-tickets` | Booking history |
| `/profile` | User profile |
| `/e-catering` | Station catering |
| `/cabs` | Cab booking |
| `/hotels` | Hotel and retiring-room booking |
| `/login` | Sign in |
| `/register` | Create an account |
| `/admin` | Admin dashboard |
| `/admin/add-train` | Add and configure a train |

## AI Concierge

The floating concierge can inspect PNR context and help users discover:

- Catering vendors and menus at upcoming stations
- Cab vendors and fare estimates
- Station hotels and retiring rooms
- Cab, hotel, and catering booking actions

It sends the active PNR and conversation history to `POST /api/ai-concierge/chat`. The assistant presents an exact selection and total before an action is confirmed. Frontend functionality does not require a Gemini key; concierge responses require the backend to be running and configured for Gemini.

## Project Structure

```text
src/
├── app/             # Router and application shell
├── header/          # Navigation and authentication controls
├── screens/         # Passenger and admin feature areas
├── utils/           # Axios and shared browser helpers
├── App.jsx
└── index.js
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the development server |
| `npm test` | Start the test runner |
| `npm run build` | Create an optimized production build |
| `npm run eject` | Export Create React App configuration (not reversible) |

## Production Build

```bash
npm run build
```

Deploy the generated `build/` directory with a static host configured to serve `index.html` for unknown routes. Set `REACT_APP_API_URL` to the public backend API URL before building.

## Notes

- Authentication tokens are stored in browser cookies and added to Axios requests.
- The booking context preserves selected journey and booking state across the reservation flow.
- UI role checks are convenience controls; the backend remains responsible for authorization.
