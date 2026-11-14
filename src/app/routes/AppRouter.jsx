import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { PageTransition } from '../providers/PageTransisitionProvider';

// Home screen
import { HomePage } from '../../screens/home/ui/HomePage';

// Booking screens
import { SearchResultsPage }      from '../../screens/booking/train-search-results/ui/SearchResultsPage';
import { BookingPage }            from '../../screens/booking/passenger-booking/ui/BookingPage';
import { PaymentPage }            from '../../screens/booking/payment/ui/PaymentPage';
import { TicketConfirmationPage } from '../../screens/booking/ticket-confirmation/ui/TicketConfirmationPage';

// PNR Status screen
import { PnrStatusPage } from '../../screens/pnr-status/ui/PnrStatusPage';

// Train Live status screen
import { LiveStatusPage } from '../../screens/live-map/ui/LiveStatusPage';

// Authentication screen
import { LoginPage }    from '../../screens/auth/ui/LoginPage';
import { RegisterPage } from '../../screens/auth/ui/RegisterPage';

// User profile screen
import { UserProfilePage } from '../../screens/my-profile/ui/UserProfilePage';





import { AdminDashboardPage } from '../../pages/admin-dashboard/ui/AdminDashboardPage';
import { MyTicketsPage } from '../../pages/my-tickets/ui/MyTicketsPage';
import { TrainSchedulePage } from '../../pages/train-schedule/ui/TrainSchedulePage';
import { CancellationPage } from '../../pages/cancellation/ui/CancellationPage';
import { TrainWizardPage } from '../../pages/admin-train-wizard/ui/TrainWizardPage';
import { ECateringPage } from '../../pages/e-catering/ui/ECateringPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* 1. The Landing Page */}
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        
        {/* 2. The List of Trains based on search params */}
        <Route path="/search-results" element={<PageTransition><SearchResultsPage /></PageTransition>} />
        
        {/* 3. The Dynamic Passenger Form, Seat Map, & Fare Summary */}
        <Route path="/book" element={<PageTransition><BookingPage /></PageTransition>} />
        
        {/* 4. Digital Ticket & Booking Success Screen */}
        <Route path="/ticket/confirmation" element={<PageTransition><TicketConfirmationPage /></PageTransition>} />

        {/* 5. Live Train Running Status & Timeline */}
        <Route path="/live-status" element={<PageTransition><LiveStatusPage /></PageTransition>} />

        <Route path="/admin" element={<PageTransition><AdminDashboardPage /></PageTransition>} />

        <Route path="/pnr" element={<PageTransition><PnrStatusPage /></PageTransition>} />

        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />

        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />

        <Route path="/my-tickets" element={<PageTransition><MyTicketsPage /></PageTransition>} />

        <Route path="/payment" element={<PageTransition><PaymentPage /></PageTransition>} />

        <Route path="/schedule" element={<PageTransition><TrainSchedulePage /></PageTransition>} />

        <Route path="/cancel" element={<PageTransition><CancellationPage /></PageTransition>} />

        <Route path="/profile" element={<PageTransition><UserProfilePage /></PageTransition>} />

        <Route path="/admin/add-train" element={<PageTransition><TrainWizardPage /></PageTransition>} />

        <Route path="/e-catering" element={<PageTransition><ECateringPage /></PageTransition>} />
        
        {/* Fallback route for 404s */}
        <Route path="*" element={
          <PageTransition>
            <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>
                Return to Home
              </a>
            </div>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;