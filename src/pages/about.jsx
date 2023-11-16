import '../styles/about.css'

// '../../public/romantic-couple.jpg'

const About = () => {
	return (
		<div className="about-container">
			<img src="./romantic-couple.jpg" alt="Couple at a dinner table" className="about-image" />
			<div className="about-text">
				<p>{"Once upon a time in a small, coastal town, two souls met in a place where magic happens every day - the local farmer's market. Surrounded by the vibrant colors of fresh produce and the inviting aromas of homemade pastries, their eyes locked. It was love at first sight. The world seemed to stop, and in that moment, they felt a connection that went beyond mere attraction."}</p>
				<p>{"Their first date was a culinary adventure, a homemade dinner where they laughed, shared stories, and discovered their shared passion for culinary delights. They enjoyed exploring different flavors from around the world, finding joy in the blend of spices, the sizzle of a pan, and the taste of something extraordinary. As they journeyed through various cuisines, their love for each other deepened, seasoned with affection, marinated in trust, and garnished with shared dreams."}</p>
				<p>{"Their kitchen became a sanctuary, a place where they danced to the rhythm of chopping knives and sizzling pans. From elegant gourmet creations to hearty family favorites, each dish they prepared was a labor of love, an edible testament to their journey together. They celebrated anniversaries with candlelit dinners, comforted each other with warm soups, and made breakfast in bed on lazy Sundays."}</p>
				<p>{"Over time, their kitchen walls were adorned with memories, photographs of them cooking together, handwritten recipes, and dried herbs. The scents of garlic, rosemary, and freshly baked bread filled their home, a constant reminder of their love story that started with a simple glance across a bustling market."}</p>
				<p>{"At Gastrograph, we bring you a piece of their story, a taste of their love. Our recipes are inspired by the romance that blooms in the kitchen and the joy that food can bring into our lives. Whether you're cooking for family, friends, or someone special, we invite you to explore, create, and savor these dishes. Every meal tells a story, and we hope it becomes a cherished part of yours. Come, join us in celebrating love, food, and the extraordinary connection they create."}</p>
				<p className='asterisk'>{"* * *"}</p>
			</div>
		</div>
	)
}

export default About
