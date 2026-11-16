# Railway Management

This is the frontend for Railway Management, a full-stack railway booking and operations platform. The backend for this project is available [here](https://github.com/amanfoundongithub/Railway-Management-backend).

## Overview

Railway Management is a modern railway reservation application that helps users search trains, book tickets, manage bookings, and access additional travel services. It supports both passenger-facing workflows and admin operations for railway inventory and service administration.

## Key Features

- Train search and filtering by source, destination, date, class, and quota
- Passenger booking flow with seat selection and fare summary
- Payment and booking confirmation workflow
- PNR status checking and ticket lookup
- Ticket history and management for users
- Ticket cancellation support
- E-catering ordering for train journeys
- Cab and hotel booking add-ons
- Live train status and schedule pages
- Admin dashboard for system overview and train inventory management
- Role-based access for customer and admin workflows

## Tech Stack

- React 19
- React Router DOM
- Material UI (MUI)
- Framer Motion
- Axios
- js-cookie
- react-to-pdf

## Project Structure

```text
src/
  app/                  # routing, theming, transitions
  header/              # shared navbar and auth actions
  screens/
    admin/             # admin dashboard and train setup
    auth/              # login and registration
    booking/           # search, booking, payment, confirmation flow
    cancel-tickets/    # cancellation workflow
    e-catering/        # catering UI
    get-train-schedule/# train schedule pages
    home/              # landing page and search form
    hotels/            # hotel booking UI
    live-map/          # live status pages
    my-profile/        # user profile
    my-tickets/        # ticket history
    pnr-status/        # PNR lookup
    cabs/              # cab booking flow
  utils/                # shared API and cookie helpers
```

## Application Routes

- `/` — home page and search
- `/search-results` — train results with filters
- `/book` — booking and passenger form
- `/payment` — payment flow
- `/ticket/confirmation` — booking confirmation and ticket PDF
- `/pnr-status` — PNR status lookup
- `/live-status` — live train status
- `/schedule` — train schedule
- `/cancel` — cancel booking
- `/my-tickets` — user booking list
- `/profile` — profile page
- `/login` — login
- `/register` — register
- `/e-catering` — e-catering
- `/cabs` — cab booking
- `/hotels` — hotel booking
- `/admin` — admin dashboard
- `/admin/add-train` — add train wizard

## Environment Setup

This app expects a backend API URL in an environment variable:

```bash
cp .env.example .env
```

Then update `.env` if needed:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

The Axios client uses this value as the base URL and attaches the auth token from cookies when present.

## Local Development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm start      # run the app in development mode
npm test       # run tests
npm run build  # create a production build
npm run eject  # expose CRA configuration (not usually needed)
```

## Notes

- This frontend is designed to work with the backend project linked above.
- Authentication and role checks are handled in the UI for protected admin and user flows.
- The app uses a booking context to persist selected train and booking state during the reservation journey.
