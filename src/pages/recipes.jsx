import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import NotFound from './notfound.jsx';
import Button from '../components/Button.jsx';
import RecipeCard from '../components/RecipeCard.jsx';
import RecipeUploadForm from '../components/RecipeUploadForm.jsx';
import PropTypes from 'prop-types';
import '../styles/recipes.css';

const Recipes = ({ isLoggedIn, onLogout }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipesPerPage, setRecipesPerPage] = useState(3);
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const backendUrl = 'https://gastrographbackend.onrender.com';
    fetch(`${backendUrl}/recipes`, {
        credentials: 'include',
        method: 'GET',
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
    })
    .then(data => {
      setRecipes(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    });
  }, [recipesPerPage]);

  const handleLogout = () => {
    onLogout(); 
    navigate('/'); 
  };

  const displayedRecipes = loading ? 
    <div className="loading-container">
      <div className="spinner"></div>
    </div> : 
    recipes.slice(0, recipesPerPage).map((recipe) => (
      <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </Link>
    ));

  const handleLoadMore = () => {
    setRecipesPerPage(prev => prev + 3);
  };

  const handleRecipeSubmit = (newRecipe) => {
    const backendUrl = 'https://gastrographbackend.onrender.com';
    fetch(`${backendUrl}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(addedRecipe => {
      setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
    })
    .catch(error => {
      console.error("Error submitting new recipe:", error.message);
    });
  };

  const selectedRecipe = recipes.find((r) => r.id === recipeId);

  if (recipeId && !selectedRecipe) {
    return <NotFound />;
  }

  const logoutButton = isLoggedIn ? (
    <div className="logout-button-container">
      <Button text="Log Out" onClick={handleLogout} className="button" />
    </div>
  ) : null;

  return (
    <>
      <div className='logoutBtn'>{logoutButton}</div>
      {isLoggedIn && <RecipeUploadForm onRecipeSubmit={handleRecipeSubmit} />}
      <div className="recipe-page">
        {recipeId && selectedRecipe ? (
          <div className="expanded-recipe-card">
            <img className="expanded-recipe-card-img" src={selectedRecipe.imageURL} alt={selectedRecipe.title} />
            <div className="expanded-recipe-card-details">
              <h1>{selectedRecipe.title}</h1>
              <h3>Ingredients:</h3>
              <ul>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <ul>
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <h3>Author:</h3>
              <p>{selectedRecipe.author}</p>
              <h3>Date Shared:</h3>
              <p>{new Date(selectedRecipe.date).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="recipe-page-wrapper">
              {displayedRecipes}
            </div>
            <div className="centered-button-container">
              <Button text="See More Recipes" onClick={handleLoadMore} className="centered-button" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

Recipes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Recipes;






// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import NotFound from './notfound.jsx';
// import Button from '../components/Button.jsx';
// import RecipeCard from '../components/RecipeCard.jsx';
// import '../styles/recipes.css';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import RecipeUploadForm from '../components/RecipeUploadForm.jsx';


// const Recipes = ({ isLoggedIn, onLogout }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [recipesPerPage, setRecipesPerPage] = useState(3);
//   const [loading, setLoading] = useState(true);
//   const { recipeId } = useParams();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     onLogout(); 
//     navigate('/'); 
//   };


//   useEffect(() => {
//       const backendUrl = 'https://gastrographbackend.onrender.com'; 

//   fetch(`${backendUrl}/recipes`, {
//       credentials: 'include',
//       method: 'GET',
//     })
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//         }
//       })
//       .then(data => {
//         console.log("Fetched Data: ", data); 
//         setRecipes(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error.message);
//         console.error("Stack trace:", error.stack);
//         setLoading(false);
//       });
    
//   }, [recipesPerPage]);
  

//   const displayedRecipes = recipes.slice(0, recipesPerPage);

//   const handleLoadMore = () => {
//     setRecipesPerPage(prev => prev + 3);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   const selectedRecipe = recipes.find((r) => r.id === recipeId);

//   if (recipeId && selectedRecipe) {
//     return (
//       <div className="expanded-recipe-card">
//         <img className="expanded-recipe-card-img" src={selectedRecipe.imageURL} alt={selectedRecipe.title} />
//         <div className="expanded-recipe-card-details">
//           <h1>{selectedRecipe.title}</h1>
//           <h3>Ingredients:</h3>
//           <ul>
//             {selectedRecipe.ingredients.map((ingredient, index) => (
//               <li key={index}>{ingredient}</li>
//             ))}
//           </ul>
//           <h3>Instructions:</h3>
//           <ul>
//             {selectedRecipe.instructions.map((instruction, index) => (
//               <li key={index}>{instruction}</li>
//             ))}
//           </ul>
//           <h3>Author:</h3>
//           <p>{selectedRecipe.author}</p>
//           <h3>Date Shared:</h3>
//           <p>{new Date(selectedRecipe.date).toLocaleDateString()}</p>
//         </div>
//       </div>
//     );
//   } else if (recipeId && !selectedRecipe) {
//     return <NotFound />;
//   }

//   const logoutButton = isLoggedIn ? (
//     <div className="logout-button-container">
//       <Button text="Log Out" onClick={handleLogout} className="button" />
//     </div>
//   ) : null; 
  
//   const handleRecipeSubmit = (newRecipe) => {

//     const backendUrl = 'https://gastrographbackend.onrender.com'; 

// fetch(`${backendUrl}/recipes`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newRecipe),
// })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(addedRecipe => {
//       setRecipes(prevRecipes => [...prevRecipes, addedRecipe]);
//     })
//     .catch(error => {
//       console.error("Error submitting new recipe:", error.message);
//     });
//   };

//   return (
//     <>
//       <div className='logoutBtn'>{logoutButton}</div>
//       {isLoggedIn && (
//       <>
//         <RecipeUploadForm onRecipeSubmit={handleRecipeSubmit} />
//       </>
//     )}
//       <div className="recipe-page">
//         <div className="recipe-page-wrapper">
//           {displayedRecipes.map((recipe) => (
//             <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
//               <RecipeCard recipe={recipe} />
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div className="centered-button">
//         <Button text="See More Recipes" onClick={handleLoadMore} className="button" />
//       </div>
//     </>
//   );
// };

// Recipes.propTypes = {
//   isLoggedIn: PropTypes.bool.isRequired,
//   onLogout: PropTypes.func.isRequired,
// };

// export default Recipes;
