import React from "react";
import TypeProduct from "../components/layout/typeProduct";
import { WrapperTypeProduct, WrapperSlider } from "../style";
import SliderComponent from "../components/layout/slider";
import slide1 from '../assets/images/slide1.jpg'
import slide2 from '../assets/images/slide2.jpg'
import slide3 from '../assets/images/slide3.jpg'

const Home = () => {
    const typeproducts = ['TV', 'Laptop', 'Tủ lạnh'];
    return (
        <div>
            <div> 
                <WrapperTypeProduct className="container">
                    {typeproducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item}></TypeProduct>
                        )
                    })}
                </WrapperTypeProduct>
            </div>  
            <div className="container">
                <SliderComponent Images={[slide1, slide2, slide3]}/>
            </div>
        </div>
    )
}

export default Home