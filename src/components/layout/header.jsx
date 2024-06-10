import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";
import {
    ShoppingCartOutlined, 
    UserOutlined}
from '@ant-design/icons'
import BtnInputSearch from "./btnInputSearch";

const Header = () => {
    return (
        <div>
            <header className="container text-center my-4 px-0">
                <div className="row d-flex align-items-center">
                    <div className="col-2 text-start">
                        <Link to='/'><img src={Logo} alt="" width={100} height={40}/></Link>   
                    </div>
                    <div className="col-8">
                        <BtnInputSearch size='large' txtBtn='Tìm kiếm' placeholder='Bạn tìm gì hôm nay'/> 
                    </div>
                    <div className="col-2 d-flex justify-content-end" style={{fontSize: '1.4rem'}}>
                        <div style={{marginRight: '1rem'}}>
                            <UserOutlined style={{fontSize: '2.5rem'}}/>
                            <span>Tài khoản</span>
                        </div>
                        <ShoppingCartOutlined style={{fontSize: '2.5rem'}}/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header