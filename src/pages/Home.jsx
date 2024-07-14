import React from 'react';
import StyleLoader from '../components/StyleLoader.jsx';

function Home() {
  return (
    <div className="home" >
      <StyleLoader href="/styles/Home.css" />
      <div className="content">
        <h2>Welcome to Home Page</h2>
        <p>This is the home page content.</p>
      </div>
    </div>
  );
}

export default Home;
