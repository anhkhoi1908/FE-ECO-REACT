import Home from "../pages/home";
import Order from "../pages/order";
import Products from "../pages/products";
import NotFound from "../pages/notFound";

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
        path: '*',
        page: NotFound
    },
]

export default routes