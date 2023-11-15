import Form from '../components/Form.jsx';
import '../styles/join.css';
import PropTypes from 'prop-types';

const Join = ({ onLogin }) => {
  return (
    <div className="join-page-background"> 
      <h1 className="join-us-title">Welcome Friend</h1> 
      <div className="join-container">
        <div className="form-section">
          <Form formType="join" onLogin={onLogin} /> 
        </div>
        <div className="form-section">
          <Form formType="login" onLogin={onLogin} /> 
        </div>
      </div>
    </div>
  );
};

Join.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Join;
