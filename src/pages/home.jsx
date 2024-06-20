import React from "react";
import TypeProduct from "../components/layout/typeProduct";
import { WrapperTypeProduct, WrapperSlider, WrapperButtonMore, WrapperProducts } from "../style";
import SliderComponent from "../components/layout/slider";
import slide1 from '../assets/images/slide1.jpg'
import slide2 from '../assets/images/slide2.jpg'
import slide3 from '../assets/images/slide3.jpg'
import CardComponent from "../components/layout/card";
import NavbarComponent from "../components/layout/navbar";
import ButtonComponent from "../components/layout/button";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import Banner from "../components/layout/banner";
import Banner_img from '../assets/images/slider-nike-1.png'
import CarouselComponent from "../components/layout/carousel";
import Nike_Just_Do_It from '../assets/images/nike-just-do-it.jpg'

const Home = () => {
    const typeproducts = ['Air Force', 'Max', 'Jordan', 'Basketball', 'Nike SB', 'Dunk', 'Running', 'Lifestyle'];
    return (
        <div style={{}}>
            <CarouselComponent/>
            <Banner image={Banner_img}/>
            <div style={{padding: '0 4rem', marginTop: '8rem'}}>
                {/* <SliderComponent Images={[slide1, slide2, slide3]}/> */}
                <Banner image={Nike_Just_Do_It}/>
                <WrapperProducts>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </WrapperProducts> 
                <div className="d-flex justify-content-center">
                    <WrapperButtonMore
                        txtBtn='Xem thêm' 
                        type='outline' 
                        icon={0} 
                        styleButton={{
                            border: '1px solid rgb(11, 116, 229)', 
                            color: 'rgb(11, 116, 229)', 
                            width: '240px', height: '38px',
                            borderRadius: '0.5rem',
                            fontWeight: 500
                        }}
                    />
                </div>
               {/* <NavbarComponent/>  */}
            </div>
        </div>
    )
}

export default Home