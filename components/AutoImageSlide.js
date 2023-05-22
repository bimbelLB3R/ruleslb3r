import React from 'react';
import Slider from 'react-slick';

const AutoImageSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className="flex justify-center max-w-xl">
        <div>
          <img
            src="/image/image1.webp"
            alt="Image 1"
            className="h-[300px] w-[300px]"
          />
        </div>
        <div>
          <img
            src="/image/image2.webp"
            alt="Image 2"
            className="h-[300px] w-[300px]"
          />
        </div>
        <div>
          <img
            src="/image/image3.webp"
            alt="Image 3"
            className="h-[300px] w-[300px]"
          />
        </div>
      </div>
    </Slider>
  );
};

export default AutoImageSlide;
