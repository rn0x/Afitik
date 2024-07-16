import React from "react";
import { Helmet } from "react-helmet-async";

export default function Workouts() {
  return (
    <>
      <Helmet>
        <title>Workouts Page</title>
        <meta name="description" content="Description Workouts Page" />
      </Helmet>
      <div>Workouts</div>
    </>
  );
}
