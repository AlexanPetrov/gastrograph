import '../styles/contact.css';
import ContactForm from '../../components/ContactForm.jsx';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>
      <div className="contact-form">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
