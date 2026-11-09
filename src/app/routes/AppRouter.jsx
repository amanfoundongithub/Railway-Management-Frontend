import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. The Landing Page (Search Widget) */}
        <Route path="/" element={<HomePage />} />
        
        {/* 2. The List of Trains based on search params */}
        <Route path="/search-results" element={<SearchResultsPage />} />
        
        {/* 3. The Dynamic Passenger Form, Seat Map, & Fare Summary */}
        <Route path="/book" element={<BookingPage />} />
        
        {/* 4. Digital Ticket & Booking Success Screen */}
        <Route path="/ticket/confirmation" element={<TicketConfirmationPage />} />

        {/* 5. Live Train Running Status & Timeline */}
        <Route path="/live-status" element={<LiveStatusPage />} />

        <Route path="/admin" element={<AdminDashboardPage />} />

        <Route path="/pnr" element={<PnrStatusPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/my-tickets" element={<MyTicketsPage />} />

        <Route path="/payment" element={<PaymentPage />} />

        <Route path="/schedule" element={<TrainSchedulePage />} />

        <Route path="/cancel" element={<CancellationPage />} />

        <Route path="/profile" element={<UserProfilePage />} />
        
        {/* Fallback route for 404s */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>
              Return to Home
            </a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;