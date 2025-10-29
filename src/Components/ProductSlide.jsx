import { useState, useRef } from "react";
import { styles } from "./styles";

export default function ProductSlide({ slide, isActive }) {
  const [isClicked, setIsClicked] = useState(false);
  const productRef = useRef(null);
  const extrasRef = useRef([]);

  const handleProductClick = () => {
    if (!isActive) return;
    setIsClicked((prev) => !prev);
  };

  const getExtraPosition = (index, total) => {

    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    let baseRadius = isClicked ? 600 : 320;

    if (vw <= 1024) {
      baseRadius = isClicked ? 450 : 220;
    }
    if (vw <= 768) {
      baseRadius = isClicked ? 380 : 180;
    }
    if (vw <= 425) {
      baseRadius = isClicked ? 320 : 140;
    }
    if (vw <= 375) {
      baseRadius = isClicked ? 280 : 120;
    }
    if (vw <= 319) {
      baseRadius = isClicked ? 240 : 100;
    }

    const startAngle = (-Math.PI * 4.9) / 4;
    const endAngle = (Math.PI * 1.7) / 4;
    const angle = startAngle + (index / total) * (endAngle - startAngle);

    const x = Math.cos(angle) * baseRadius;
    let y = Math.sin(angle) * baseRadius;

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(30% + ${y}px)`,
      transform: "translate(-50%,-20%)",
    };
  };

  return (
    <div style={styles.slideContent(slide.bgColor)}>
      <div style={styles.glowLayer}></div>
      <div style={styles.vignetteLayer}></div>
      {/* Floating Extras - positioned around the product */}
      {slide.extras.map((extra, extraIndex) => {
        const floatNum = (extraIndex % 9) + 1; // choose one of float1–float4
        const duration = 8 + Math.random() * 3;
        return (
          <div
            key={extraIndex}
            style={{
              position: "absolute",
              animation: `floatExtra${floatNum} ${duration}s ease-in-out infinite alternate`,
            }}
          >
            <img
              ref={(el) => (extrasRef.current[extraIndex] = el)}
              src={extra}
              alt={`extra-${extraIndex}`}
              className="floatingExtra"
              style={{
                ...styles.floatingExtra,
                ...getExtraPosition(extraIndex, slide.extras.length),
                filter: isClicked ? "blur(3px)" : "blur(0px)",
                opacity: isClicked ? 0.6 : 0.85,
              }}
            />
          </div>
        );
      })}

      {/* Title - fade out when clicked to avoid layout reflow */}
      <h1 className={`slideTitle floatingTitle ${isClicked ? "hidden" : ""}`}>
        {slide.title}
      </h1>

      <div style={styles.centerContent} data-swiper-parallax="-200">
        {/* Product Image with Floating Animation - Clickable */}

        <div
          ref={productRef}
          style={styles.productContainer}
          onClick={handleProductClick}
          className={`productContainer ${!isClicked ? "floatingProduct" : ""}`}
        >
          <img
            src={slide.img}
            alt="product"
            style={styles.productImg}
            className={`productImage ${isClicked ? "zoomed" : ""}`}
          />
        </div>

        {/* Regular View Button - fade out when clicked to avoid reflow */}
        <button
          type="button"
          style={styles.viewBtn}
          className={`viewBtn ${isClicked ? "hidden" : ""}`}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "black";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "white";
          }}
        >
          View Product
        </button>

        {/* Detail View Button - appears in middle when clicked */}
        {isClicked && (
          <div style={styles.detailButtonContainer}>
            <button
              type="button"
              className="detailButton"
              style={styles.detailButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
