import { useState } from 'react';
import '../styles/recipeUploadForm.css';
import PropTypes from 'prop-types';

const RecipeUploadForm = ({ onRecipeSubmit }) => {
    const [title, setTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            imageURL,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), 
            instructions: instructions.split('.').map(instruction => instruction.trim()).filter(instruction => instruction !== ''),
            author,
            date: new Date().toISOString()
        };
        onRecipeSubmit(newRecipe);
        setTitle('');
        setImageURL('');
        setIngredients('');
        setInstructions('');
        setAuthor('');
    };

    return (
        <form className="recipe-upload-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Recipe Title"
                required
            />
            <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Image URL"
                required
            />
            <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients (comma-separated)"
                required
            />
            <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Instructions (period-separated)"
                required
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
            />
            <button type="submit">Upload Recipe</button>
        </form>
    );
};

RecipeUploadForm.propTypes = {
    onRecipeSubmit: PropTypes.func.isRequired
};

export default RecipeUploadForm;


// import { useState } from 'react';
// import '../styles/recipeUploadForm.css';
// import PropTypes from 'prop-types';

// const RecipeUploadForm = ({ onRecipeSubmit }) => {
//     const [title, setTitle] = useState('');
//     const [imageURL, setImageURL] = useState('');
//     const [ingredients, setIngredients] = useState('');
//     const [instructions, setInstructions] = useState('');
//     const [author, setAuthor] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newRecipe = {
//             title,
//             imageURL,
//             ingredients: ingredients.split(',').map(ingredient => ingredient.trim()), 
//             instructions: instructions.split('.').map(instruction => instruction.trim()), 
//             author,
//             date: new Date().toISOString()
//         };
//         onRecipeSubmit(newRecipe);
//         setTitle('');
//         setImageURL('');
//         setIngredients('');
//         setInstructions('');
//         setAuthor('');
//     };

//     return (
//         <form className="recipe-upload-form" onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Recipe Title"
//                 required
//             />
//             <input
//                 type="text"
//                 value={imageURL}
//                 onChange={(e) => setImageURL(e.target.value)}
//                 placeholder="Image URL"
//                 required
//             />
//             <textarea
//                 value={ingredients}
//                 onChange={(e) => setIngredients(e.target.value)}
//                 placeholder="Ingredients (comma-separated)"
//                 required
//             />
//             <textarea
//                 value={instructions}
//                 onChange={(e) => setInstructions(e.target.value)}
//                 placeholder="Instructions (period-separated)"
//                 required
//             />
//             <input
//                 type="text"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//                 placeholder="Author"
//                 required
//             />
//             <button type="submit">Upload Recipe</button>
//         </form>
//     );
// };

// RecipeUploadForm.propTypes = {
//     onRecipeSubmit: PropTypes.func.isRequired
// };

// export default RecipeUploadForm;
