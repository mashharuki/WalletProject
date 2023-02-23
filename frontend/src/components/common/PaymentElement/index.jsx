import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useRef, useState } from 'react';
import PaymentForm from '../PaymentForm';
import { baseURL } from "./../../common/Constant";
import './PaymentElement.CSS';

// API Secret key
const { REACT_APP_STRIPE_API_KEY } = process.env;

/**
 * PaymentElement Component
 * @returns 
 */
const PaymentElement = () => {
      const hasAPICalledRef = useRef(false);
      const [piClientSecret, setPiClientSecret] = useState('');
      
      /**
       * 副作用フック
       */
      useEffect(() => {
            if (hasAPICalledRef.current) return

            hasAPICalledRef.current = true;

            fetch(`${baseURL}/create-payment-intent`, {
                  method: 'post'
            }).then(data => data.json())
                  .then(response => setPiClientSecret(response.clientSecret))
      }, [])

      if (!piClientSecret) return null;

      return (
            <Elements
                  stripe={loadStripe(REACT_APP_STRIPE_API_KEY)}
                  options={{
                        clientSecret: piClientSecret,
                  }}
            >
                  <PaymentForm/>
            </Elements>
      )
};

export default PaymentElement;