import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your test API key
const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = ({ toggle, modal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe.js has not loaded yet.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    } else {
      setErrorMessage('');
      setSuccessMessage('Payment successful!');
      // Send paymentMethod.id to your server to create a charge
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} style={{ maxWidth: '600px' }}>
      <ModalHeader toggle={toggle}>Payment Form</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup style={{ marginBottom: '20px' }}>
            <Label for="email" style={{ fontWeight: 'bold' }}>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                borderRadius: '5px', 
                border: '1px solid #ccc', 
                padding: '10px', 
                fontSize: '16px' 
              }}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: '20px' }}>
            <Label for="card" style={{ fontWeight: 'bold' }}>Card Details</Label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </FormGroup>
          {errorMessage && (
            <Alert color="danger" style={{ marginBottom: '20px' }}>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert color="success" style={{ marginBottom: '20px' }}>
              {successMessage}
            </Alert>
          )}
          <Button type="submit" color="danger" disabled={!stripe} style={{ width: '100%', padding: '15px', fontSize: '18px', borderRadius: '5px' }}>
            Pay Now
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const PaymentManagement = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Open Payment Modal
      </Button>
      <Elements stripe={stripePromise}>
        <CheckoutForm modal={modal} toggle={toggle} />
      </Elements>
    </div>
  );
};

export default PaymentManagement;
