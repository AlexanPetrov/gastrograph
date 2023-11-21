import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      // try {
      //   const response = await fetch('http://127.0.0.1:3000/recipes');
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   const data = await response.json();
      //   setRecipes(data);
      // } catch (error) {
      //   console.error('Error fetching recipes:', error);
      // }

      const backendUrl = 'https://gastrographbackend.onrender.com'; 

try {
    const response = await fetch(`${backendUrl}/recipes`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setRecipes(data);
} catch (error) {
    console.error('Error fetching recipes:', error);
}
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [recipes.length]);

  return (
    <>
      <div className="home-container">
        <div className="image-gallery">
          {recipes.length > 0 && (
            <Link to={`/recipes/${recipes[currentImage].id}`}>
              <img src={recipes[currentImage].imageURL} 
                   alt={recipes[currentImage].title} 
                   title={recipes[currentImage].title}/>
            </Link>
          )}
          <div className="dots">
            {recipes.map((_, index) => (
              <span
                key={index}
                className={index === currentImage ? 'active-dot' : 'dot'}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="welcome-text">
          <p>
          Welcome to Gastrograph! Explore delicious recipes and culinary delights from kitchens around the world. At Gastrograph, we believe in more than just food; we believe in stories, connections, and flavors that bring people together. Every recipe you find here carries a personal touch, a unique blend of tradition, innovation, and love. Whether you are a seasoned chef or a culinary novice, our hand-picked recipes are designed to inspire creativity and joy in your kitchen. From hearty family favorites to elegant gourmet creations, you will discover a world of tastes waiting to be explored. So why wait? Let your culinary journey begin with Gastrograph, where every dish tells a story.
          </p>
        </div>
      </div>
      <div className='home-moral-class'>
        <p>{'"To the ruler, the people are heaven; to the people, food is heaven." - Ancient Chinese Proverb'}</p>
      </div>
    </>
  )
}

export default Home;
