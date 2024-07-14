import React from 'react';
import StyleLoader from '../components/StyleLoader.jsx';


function About() {
  return (
    <div className="about">
      <StyleLoader href="/styles/About.css" />
      <h2>About Us</h2>
      <p>This is the about page content.</p>
    </div>
  );
}

export default About;
