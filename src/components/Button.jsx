import PropTypes from 'prop-types';
import '../styles/recipesButton.css';
import '../styles/logoutButton.css'; 

const Button = ({ text, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
