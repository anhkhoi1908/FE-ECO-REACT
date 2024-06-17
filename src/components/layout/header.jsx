import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from '../../assets/images/logo.png'
import { Link, useNavigate } from "react-router-dom";
import {
    ShoppingCartOutlined, 
    UserOutlined}
from '@ant-design/icons'
import BtnInputSearch from "./btnInputSearch";
import { Badge } from "antd";

const Header = () => {
    const navigate = useNavigate()
    const handleNavigateLogin = () => {
        navigate('/log-in')
    }
    
    return (
        <div>
            <header className="text-center my-4" style={{padding: '0 12rem'}}>
                <div className="row d-flex align-items-center">
                    <div className="col-2 text-start">
                        <Link to='/'><img src={Logo} alt="" width={100} height={40}/></Link>   
                    </div>
                    <div className="col-8">
                        <BtnInputSearch size='large' txtBtn='Tìm kiếm' placeholder='Bạn tìm gì hôm nay'/> 
                    </div>
                    <div className="col-2 d-flex justify-content-end" style={{fontSize: '1.4rem'}}>
                        <div onClick={handleNavigateLogin} style={{marginRight: '1rem', cursor: 'pointer'}}>
                            <UserOutlined style={{fontSize: '2.5rem'}}/>
                            <span>Tài khoản</span>
                        </div>
                        <Badge count={4}>
                            <ShoppingCartOutlined style={{fontSize: '2.5rem'}}/>
                        </Badge>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header