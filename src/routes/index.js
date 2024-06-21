import Home from "../pages/home";
import Order from "../pages/order";
import Products from "../pages/products";
import NotFound from "../pages/notFound";
import TypeProductPage from "../pages/typeproduct";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ProductDetail from "../pages/productdetail";
import AdminPage from "../pages/adminPage";
import Profile from "../pages/profile";

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
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: Signup,
        isShowHeader: false
    },
    {
        path: '/product-detail',
        page: ProductDetail,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: Profile,
        isShowHeader: false,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFound
    },
]

export default routes