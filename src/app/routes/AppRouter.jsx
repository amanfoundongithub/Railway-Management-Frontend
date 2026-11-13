import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import the PageTransition wrapper you created
import { PageTransition } from '../providers/PageTransisitionProvider';

// Import Pages (following Feature-Sliced Design paths)
import { HomePage } from '../../pages/home/ui/HomePage';
import { SearchResultsPage } from '../../pages/search-results/ui/SearchResultsPage';
import { BookingPage } from '../../pages/booking/ui/BookingPage';
import { TicketConfirmationPage } from '../../pages/ticket-confirmation/ui/TicketConfirmationPage';
import { LiveStatusPage } from '../../pages/live-status/ui/LiveStatusPage';
import { AdminDashboardPage } from '../../pages/admin-dashboard/ui/AdminDashboardPage';
import { PnrStatusPage } from '../../pages/pnr-status/ui/PnrStatusPage';
import { LoginPage } from '../../pages/auth/ui/LoginPage';
import { MyTicketsPage } from '../../pages/my-tickets/ui/MyTicketsPage';
import { PaymentPage } from '../../pages/payment/ui/PaymentPage';
import { TrainSchedulePage } from '../../pages/train-schedule/ui/TrainSchedulePage';
import { CancellationPage } from '../../pages/cancellation/ui/CancellationPage';
import { UserProfilePage } from '../../pages/profile/ui/UserProfilePage';
import { TrainWizardPage } from '../../pages/admin-train-wizard/ui/TrainWizardPage';
import { RegisterPage } from '../../pages/auth/ui/RegisterPage';
import { ECateringPage } from '../../pages/e-catering/ui/ECateringPage';

// Inner component that has access to the router context (useLocation)
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 1. The Landing Page (Search Widget) */}
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