import React from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';

const SliderComponent = ({Images}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      };
    return (
        <div>
            <Slider {...settings}>
                {Images.map((item) => {
                    return (
                        <Image src={item} alt='slider' preview={false} width='100%' height='274px'/>
                    )
                })}
            </Slider>
        </div>
    );
};

export default SliderComponent;