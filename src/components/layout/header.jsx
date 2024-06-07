import React, { Fragment } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from '../../assets/images/logo.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
    return (
        <Fragment>
            <header class="container text-center">
                <div class="row">
                    <div class="col-2">
                        <Link to='/'><img src={Logo} alt="" /></Link>
                    </div>
                    <div class="col-8">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Bạn tìm gì hôm nay" aria-label="Recipient's username" 
                             aria-describedby="basic-addon2"/>
                            <button className="text-primary bg-white">Tìm kiếm</button>
                        </div>
                    </div>
                    <div class="col-2">

                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header