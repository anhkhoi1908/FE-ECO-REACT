import React, { Fragment } from "react";
import Header from "./header";

const NotFound = ({children}) => {
    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    )
}

export default NotFound