import React from "react";
import "./BookCardLoadingComponent.css";
function BookCardLoadingComponent() {
  return (
    <div className="book-card-loader">
      <div className="loader-wrapper">
        <div className="circle"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>
    </div>
  );
}

export default BookCardLoadingComponent;
