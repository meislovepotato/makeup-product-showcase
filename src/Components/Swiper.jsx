import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Parallax } from "swiper/modules";
import { useState } from "react";
import { styles } from "./styles";
import { slides } from "./slides";
import Header from "./Header";
import "swiper/css";
import "swiper/css/pagination";
import ProductSlide from "./ProductSlide";

export default function ProductSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={styles.swiperContainer}>
      <Header />
      <Swiper
        direction="vertical"
        pagination={{ clickable: true }}
        mousewheel={true}
        speed={1200}
        parallax={true}
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
