import React from "react";
import TypeProduct from "../components/layout/typeProduct";
import { WrapperTypeProduct, WrapperSlider, WrapperButtonMore } from "../style";
import SliderComponent from "../components/layout/slider";
import slide1 from '../assets/images/slide1.jpg'
import slide2 from '../assets/images/slide2.jpg'
import slide3 from '../assets/images/slide3.jpg'
import CardComponent from "../components/layout/card";
import NavbarComponent from "../components/layout/navbar";
import ButtonComponent from "../components/layout/button";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const Home = () => {
    const typeproducts = ['TV', 'Laptop', 'Tủ lạnh'];
    return (
        <div style={{backgroundColor: '#efefef'}}>
            <div style={{backgroundColor: '#fff'}}> 
                <WrapperTypeProduct className="container">
                    {typeproducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item}></TypeProduct>
                        )
                    })}
                </WrapperTypeProduct>
            </div>  
            <div className="container px-0" style={{backgroundColor: '#efefef'}}>
                <SliderComponent Images={[slide1, slide2, slide3]}/>
                <div className="d-flex align-items-center mt-5" style={{gap: '1.5rem', flexWrap: 'wrap'}}>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </div> 
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