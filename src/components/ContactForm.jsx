import '../styles/contactForm.css';
import { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
  
    // try {
    //   const response = await fetch('http://localhost:3000/contact/submit', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name, email, message }),
    //   });

    const backendUrl = 'https://gastrographbackend.onrender.com'; 

try {
    const response = await fetch(`${backendUrl}/contact/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    });
  
      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');

        alert('Message sent successfully!');
        
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Submission failed', await response.text());
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };  

  return (
    <>
      <h3 className='contact-form-title'>gastrograph</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          placeholder="Enter your name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />

        <label htmlFor="message">Message:</label>
        <textarea 
          id="message" 
          placeholder="Enter your message (Free instance types will spin down with inactivity. Please, be patient!)" 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
        />

        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ContactForm;
