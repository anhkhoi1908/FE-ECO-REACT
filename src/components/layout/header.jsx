import React, { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from '../../assets/images/logo.png'
import LogoJor from '../../assets/images/Logo-2.png'
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCartOutlined, 
    HeartOutlined}
from '@ant-design/icons'
import BtnInputSearch from "./btnInputSearch";
import { Badge, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { WrapperContentPopOver, WrapperTypeProduct } from "../../style";
import TypeProduct from './typeProduct';
import * as userService from '../../services/userService'
import { resetUser } from "../../redux/slice/userSlide";
import Loading from "./loading";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/log-in')
    }

    // Hiển thị tên người dùng sau khhi login thành công
    const user = useSelector((state) => state.user)
    console.log('user', user)

    // Type product
    const typeproducts = ['Air Force', 'Max', 'Jordan', 'Basketball', 'Nike SB', 'Dunk'];

    // Popover user after login
    const handleLogout = async () => {
        setLoading(true)
        await userService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    const content = (
        <div>
          <WrapperContentPopOver onClick={handleLogout}>Logout</WrapperContentPopOver>
          <WrapperContentPopOver>Infor User</WrapperContentPopOver>
        </div>
    );


    return (
        <div>
            <header className="text-center header-jor" style={{padding: '0.5rem 4rem', backgroundColor: '#f5f5f5'}}>
                <div className="row d-flex align-items-center justify-content-between">
                    <div className="col-2 text-start">
                        <Link to='/'><img src={LogoJor} alt="" width={80} height={30}/></Link>   
                    </div>
                    <div className="col-2 d-flex justify-content-between" style={{fontSize: '1.2rem', fontWeight: '700'}}>
                        <span>Find a Store</span>
                        <span>Help</span>   
                        <span>Join Us</span>
                        <Loading isPending={loading}>
                            <div onClick={handleNavigateLogin} style={{cursor: 'pointer', alignItems: 'center'}}>
                                {user?.name ? (
                                    <>
                                    <Popover content={content} trigger="hover">
                                        <div style={{cursor: 'pointer'}}>{user.name}</div>
                                    </Popover>
                                    </>
                                ): ( 
                                    <span style={{borderLeft: '0.1rem solid #000'}}>Sign In</span>
                                )}
                            </div>
                        </Loading>
                    </div>
                </div>
            </header>
            
            <header className="text-center" style={{padding: '0 4rem'}}>
                <div className="row d-flex align-items-center justify-content-between" style={{padding: '1rem 0'}}>
                    <div className="col-2 text-start">
                        <Link to='/'><img src={Logo} alt="" width={70} height={30}/></Link>   
                    </div>
                    
                    <div className="col-7">
                        <WrapperTypeProduct style={{margin: '0 4rem'}}>
                            {typeproducts.map((item) => {
                                return (
                                    <TypeProduct name={item} key={item}></TypeProduct>
                                )
                            })}
                        </WrapperTypeProduct>
                    </div>

                    <div className="col-3 d-flex justify-content-between" style={{fontSize: '1.4rem'}}>
                        <div>
                            <BtnInputSearch size='large' placeholder='Search' bgInput='#f5f5f5' bordered='100rem' padding='1rem 4rem'/> 
                        </div>
                        <div style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                            <HeartOutlined style={{fontSize: '2.5rem', marginRight: '1rem'}}/>
                            <Badge count={4}>
                                <ShoppingCartOutlined style={{fontSize: '2.5rem'}}/>
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header