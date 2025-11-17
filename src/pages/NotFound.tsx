import React from "react";
import "./notfound.css"; // your rover styles

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1>Rover Lost the Signal</h1>
      <p>The page you're looking for does not exist on Mars.</p>

      <a href="/" className="btn">Return to Base</a>

      {/* ROVER V3 ANIMATION */}
      <div className="rover-wrap">
        <div className="ground-line"></div>
        <div className="scan-grid"></div>
        <div className="grid-spot"></div>

        <div className="rover-shadow"></div>

        <div className="rover">
          <div className="rover-body"></div>
          <div className="sensor-bar"></div>
          <div className="rover-top"></div>

          <div className="camera-head">
            <div className="camera-lens"></div>
          </div>

          <div className="arm-base"></div>
          <div className="arm-seg1"></div>
          <div className="arm-seg2"></div>
          <div className="arm-grip"></div>

          <div className="rover-chassis"></div>

          <div className="wheel front-left"></div>
          <div className="wheel front-right"></div>

          <div className="dust">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
