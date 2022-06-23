import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div className="container">
    <div className="parent">
      <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="primary" role="status" className="opacity-10 position-relative" style={{top:'300px'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    </div>
  </div>
);
export default Loader;
