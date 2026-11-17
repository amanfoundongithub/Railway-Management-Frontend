import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { PageTransition } from './PageTransisitionProvider';

// Import the AI Concierge Widget (Adjust the path if necessary based on your folder structure)
import { AiConciergeWidget } from '../screens/ai-concierge/ui/AiConciergeWidget';

// Home screen
import { HomePage } from '../screens/home/ui/HomePage';

// Booking screens
import { SearchResultsPage }      from '../screens/booking/train-search-results/ui/SearchResultsPage';
import { BookingPage }            from '../screens/booking/passenger-booking/ui/BookingPage';
import { PaymentPage }            from '../screens/booking/payment/ui/PaymentPage';
import { TicketConfirmationPage } from '../screens/booking/ticket-confirmation/ui/TicketConfirmationPage';

// PNR Status screen
import { PnrStatusPage } from '../screens/pnr-status/ui/PnrStatusPage';

// Train Live status screen
import { LiveStatusPage } from '../screens/live-map/ui/LiveStatusPage';

// Authentication screen
import { LoginPage }    from '../screens/auth/ui/LoginPage';
import { RegisterPage } from '../screens/auth/ui/RegisterPage';

// User profile screen
import { UserProfilePage } from '../screens/my-profile/ui/UserProfilePage';
import { MyTicketsPage } from '../screens/my-tickets/ui/MyTicketsPage';

// E Catering screen
import { ECateringPage } from '../screens/e-catering/ui/ECateringPage';

// Train Schedule screen
import { TrainSchedulePage } from '../screens/get-train-schedule/ui/TrainSchedulePage';

// Cancellation screen
import { CancellationPage } from '../screens/cancel-tickets/ui/CancellationPage';

// Admin Dashboard screen
import { AdminDashboardPage } from '../screens/admin/ui/AdminDashboardPage';

// Train creation screen
import { TrainWizardPage } from '../screens/admin/ui/TrainWizardPage';

// Cab booking screen
import { CabBookingPage } from '../screens/cabs/ui/CabBookingPage';

// Hotel booking screen
import { HotelBookingPage } from '../screens/hotels/ui/HotelBookingPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/search-results" element={<PageTransition><SearchResultsPage /></PageTransition>} />
        <Route path="/book" element={<PageTransition><BookingPage /></PageTransition>} />
        <Route path="/ticket/confirmation" element={<PageTransition><TicketConfirmationPage /></PageTransition>} />
        <Route path="/live-status" element={<PageTransition><LiveStatusPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminDashboardPage /></PageTransition>} />
        <Route path="/pnr-status" element={<PageTransition><PnrStatusPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/my-tickets" element={<PageTransition><MyTicketsPage /></PageTransition>} />
        <Route path="/payment" element={<PageTransition><PaymentPage /></PageTransition>} />
        <Route path="/schedule" element={<PageTransition><TrainSchedulePage /></PageTransition>} />
        <Route path="/cancel" element={<PageTransition><CancellationPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><UserProfilePage /></PageTransition>} />
        <Route path="/admin/add-train" element={<PageTransition><TrainWizardPage /></PageTransition>} />
        <Route path="/e-catering" element={<PageTransition><ECateringPage /></PageTransition>} />
        <Route path="/cabs" element={<PageTransition><CabBookingPage /></PageTransition>} />
        <Route path="/hotels" element={<PageTransition><HotelBookingPage /></PageTransition>} />
        
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
      <AiConciergeWidget />
    </BrowserRouter>
  );
};

export default AppRouter;