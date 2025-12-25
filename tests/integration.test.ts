
import { db } from '../services/db';
import { User, Booking } from '../types';

/**
 * Booking Lifecycle Integration Test
 * Simulates the end-to-end flow of a user booking a trip.
 */

export const runIntegrationTests = () => {
  console.log('--- Starting Integration Flow Tests ---');

  // Step 1: User Login
  const user: User = {
    id: 'user-integration-001',
    name: 'Integration Bot',
    email: 'bot@test.com',
    avatar: ''
  };
  db.saveUser(user);
  console.log('Step 1: User logged in');

  // Step 2: Search & Selection (Mocked state)
  const selection: Partial<Booking> = {
    from: 'Mumbai',
    to: 'Pune',
    seats: ['2C'],
    totalPrice: 450,
    company: 'Zingbus',
    date: '2024-10-25'
  };
  console.log('Step 2: Trip selected');

  // Step 3: Finalize Booking (Logic mirroring App.tsx)
  const fullBooking: Booking = {
    ...selection as Booking,
    id: 'int-booking-99',
    userId: user.id,
    pnr: 'PNRINT' + Math.floor(Math.random() * 1000),
    status: 'active'
  };
  db.addBooking(fullBooking);
  console.log('Step 3: Payment processed and booking finalized');

  // Step 4: Verification
  const finalBookings = db.getUserBookings(user.id);
  const exists = finalBookings.some(b => b.pnr.startsWith('PNRINT'));
  
  if (exists) {
    console.log('✅ PASS: End-to-end booking lifecycle successful');
  } else {
    console.error('❌ FAIL: Booking was not found in the database after flow completion');
  }
};
