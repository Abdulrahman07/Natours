/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51LZfiPIkHSb996kIXn1fpynUqrhJYANE1U34XkcnG4Ryp3DihRInILwO0Cb0kWkB9qa5QTpa8amG2KaE4UkYZUkH00IE1mGigj'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create cheakout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
