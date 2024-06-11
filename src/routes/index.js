import Home from "../pages/home";
import Order from "../pages/order";
import Products from "../pages/products";
import NotFound from "../pages/notFound";
import TypeProductPage from "../pages/typeproduct";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ProductDetail from "../pages/productdetail";

const routes = [
    {
        path: '/',
        page: Home,
        isShowHeader: true
    },
    {
        path: '/order',
        page: Order,
        isShowHeader: true
    },
    {
        path: '/products',
        page: Products,
        isShowHeader: true
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/log-in',
        page: Login,
        isShowHeader: true
    },
    {
        path: '/sign-up',
        page: Signup,
        isShowHeader: true
    },
    {
        path: '/product-detail',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFound
    },
]

export default routes