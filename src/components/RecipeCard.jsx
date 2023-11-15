import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

const RecipeCard = ({ recipe: { title, imageURL, ingredients, instructions, author, date } }) => {
    const shouldShowEllipsis = ingredients.length > 3;

    return (
        <div className="recipe-card">
            <h2>{title}</h2>
            <img src={imageURL} alt={title} />
            <div className="ingredient-section">
                <h3>Ingredients:</h3>
                <ul>
                    {ingredients.slice(0, 3).map((ingredient, index) => (
                        <li key={index}>
                            {ingredient}{index === 2 && shouldShowEllipsis ? ' ...' : ''}
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Instructions:</h3>
            <p>{instructions.join(' ') || "Instructions not available."}</p>
            {author && <p>Author: {author}</p>}
            {date && <p>Date Shared: {new Date(date).toLocaleDateString()}</p>}
        </div>
    )
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
        instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
        author: PropTypes.string,
        date: PropTypes.string,
    }).isRequired
}

export default RecipeCard;




// import PropTypes from 'prop-types';
// import '../styles/recipeCard.css';

// const RecipeCard = ({ recipe: { title, imageURL, ingredients, instructions, author, date } }) => {
//     return (
//         <div className="recipe-card">
//             <h2>{title}</h2>
//             <img src={imageURL} alt={title} />
//             <div className="ingredient-section">
//                 <h3>Ingredients:</h3>
//                 <ul>
//                     {ingredients.map((ingredient, index) => (
//                         <li key={index}>{ingredient}</li>
//                     ))}
//                 </ul>
//             </div>
//             <h3>Instructions:</h3>
//             <p>{instructions || "Instructions not available."}</p>
//             {author && <p>Author: {author}</p>}
//             {date && <p>Date Shared: {new Date(date).toLocaleDateString()}</p>}
//         </div>
//     )
// }

// RecipeCard.propTypes = {
//     recipe: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         imageURL: PropTypes.string.isRequired,
//         ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
//         instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
//         author: PropTypes.string,
//         date: PropTypes.string, 
//     }).isRequired
// }

// export default RecipeCard;
