import React from "react";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Description Home Page" />
      </Helmet>
      <h2>Welcome to Home Page</h2>
      <p>This is the home page content.</p>
    </>
  );
}
