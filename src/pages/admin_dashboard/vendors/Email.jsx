import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_h2mlmhi',    // Replace with your Service ID
      'template_xzbblvs',   // Replace with your Template ID
      form.current,
      'rSp77G2t_DHdB51bD'        // Replace with your User ID (found in EmailJS Dashboard)
    )
    .then((result) => {
      console.log(result.text);
      alert('Email sent successfully!');
    })
    .catch((error) => {
      console.log(error.text);
      alert('Failed to send email. Please try again.');
    });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className='bg-success p-3'>
      <label>Name</label>
      <input type="text" name="user_name" style={{width:'100%'}} required />

      <label>Email</label>
      <input type="email" name="user_email" style={{width:'100%'}} required />

      <label>Message</label>
      <textarea name="message" style={{width:'100%'}} required />

      <button type="submit" className='bg-primary p-2'>Send</button>
    </form>
  );
};

export default ContactForm;
