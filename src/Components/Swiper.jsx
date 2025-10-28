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
    const baseRadius = isClicked ? 600 : 320;

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

      {/* Title - disappears when clicked */}
      {!isClicked && (
        <h1 className="slideTitle floatingTitle">{slide.title}</h1>
      )}

      <div style={styles.centerContent} data-swiper-parallax="-200">
        {/* Product Image with Floating Animation - Clickable */}

        <div
          className={`title ${!isClicked ? "floatingProduct" : ""}`}
          ref={productRef}
          style={styles.productContainer}
          onClick={handleProductClick}
        >
          <img src={slide.img} alt="product" style={styles.productImg} />
        </div>

        {/* Regular View Button - disappears when clicked */}
        {!isClicked && (
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
