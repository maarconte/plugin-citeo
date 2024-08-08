import React, { useEffect, useState } from "react";

export const Slideshow = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const goToPreviousSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="slideshow">
            <div className="slideshow-container">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? "active" : ""}`}>
                        <img
                            src={slide.url}
                            alt={slide.caption}
                        />
                        <div className="slide-caption">{slide.caption}</div>
                    </div>
                ))}
            </div>
            <div className="slideshow-controls">
                <button onClick={goToPreviousSlide}>Previous</button>
                <button onClick={goToNextSlide}>Next</button>
            </div>
        </div>
    );
};
