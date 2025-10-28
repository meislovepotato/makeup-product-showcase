import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { styles } from "./styles";
import { useState, useRef } from "react";

const slides = [
  {
    bgColor: "#6ec6ccff",
    title: "Crunch Makeup Brush",
    img: "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
    extras: [
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
    ],
  },
  {
    bgColor: "#D47E1B",
    title: "Revlon Lipstick",
    img: "https://www.pngall.com/wp-content/uploads/4/Without-Brand-Lipstick-PNG-Free-Download.png",
    extras: [
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://www.freepnglogos.com/uploads/brush-png/makeup-brush-png-transparent-image-pngpix-14.png",
    ],
  },
  {
    bgColor: "#1B82D4",
    title: "JC Perfume",
    img: "https://www.pngall.com/wp-content/uploads/17/Elegant-Scented-Liquid-Bottle-PNG.png",
    extras: [
      "https://www.pngall.com/wp-content/uploads/4/Makeup-Brush-PNG-Clipart.png",
      "https://banner2.cleanpng.com/20180527/gpj/kisspng-lipstick-5b0a9f51af8299.2629088515274228017189.jpg",
    ],
  },
];

// Floating animation component using CSS classes
const FloatingElement = ({ children, delay = 0, isAnimating = true }) => {
  const getFloatingClass = () => {
    if (!isAnimating) return "";
    if (delay === 500) return "floating-delay-1";
    if (delay === 1000) return "floating-delay-2";
    return "floating";
  };

  return <div className={getFloatingClass()}>{children}</div>;
};

const ProductSlide = ({ slide, isActive }) => {
  const [isClicked, setIsClicked] = useState(false);
  const productRef = useRef(null);
  const extrasRef = useRef([]);

  const handleProductClick = () => {
    if (!isActive) return;
    const newState = !isClicked;
    setIsClicked(newState);

    if (productRef.current) {
      productRef.current.style.transition = "transform 0.5s ease";
      productRef.current.style.transform = newState ? "scale(1.4)" : "scale(1)";
    }
  };

  const getExtraPosition = (index, total) => {
    // Use larger radius when clicked, smaller when not
    const baseRadius = isClicked ? 600 : 300;

    const startAngle = (-Math.PI * 4.9) / 4;
    const endAngle = (Math.PI * 1.7) / 4;
    const angle = startAngle + (index / total) * (endAngle - startAngle);

    const x = Math.cos(angle) * baseRadius;
    let y = Math.sin(angle) * baseRadius;

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(30% + ${y}px)`,
      transform: "translate(-50%, 150%)",
    };
  };

  return (
    <div style={styles.slideContent(slide.bgColor)}>
      {/* Floating Extras - positioned around the product */}
      {slide.extras.map((extra, extraIndex) => (
        <div
          key={extraIndex}
          className="floating-extra"
          style={{
            animationDelay: `${extraIndex * 0.7}s`,
          }}
        >
          <img
            ref={(el) => (extrasRef.current[extraIndex] = el)}
            src={extra}
            alt={`extra-${extraIndex}`}
            style={{
              ...styles.floatingExtra,
              ...getExtraPosition(extraIndex, slide.extras.length),
              position: "absolute",
              filter: isClicked ? "blur(3px)" : "blur(0px)",
              opacity: isClicked ? 0.6 : 0.85,
            }}
          />
        </div>
      ))}

      {/* Title - disappears when clicked */}
      {!isClicked && (
        <FloatingElement delay={500} isAnimating={!isClicked}>
          <h1 style={styles.slideTitle}>{slide.title}</h1>
        </FloatingElement>
      )}

      <div style={styles.centerContent} data-swiper-parallax="-200">
        {/* Product Image with Floating Animation - Clickable */}
        <FloatingElement isAnimating={!isClicked}>
          <div
            ref={productRef}
            style={styles.productContainer}
            onClick={handleProductClick}
          >
            <img src={slide.img} alt="product" style={styles.productImg} />
          </div>
        </FloatingElement>

        {/* Regular View Button - disappears when clicked */}
        {!isClicked && (
          <FloatingElement delay={1000} isAnimating={!isClicked}>
            <button
              style={styles.viewBtn}
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
          </FloatingElement>
        )}

        {/* Detail View Button - appears in middle when clicked */}
        {isClicked && (
          <div style={styles.detailButtonContainer}>
            <button
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
};

export default function ProductSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={styles.swiperContainer}>
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        mousewheel={true}
        speed={1200}
        parallax={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        modules={[Parallax, Pagination, Mousewheel]}
        style={{ width: "100%", height: "100%" }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <ProductSlide slide={slide} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
