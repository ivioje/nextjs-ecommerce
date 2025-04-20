'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth();

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [orders, setOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get('/api/product/list')
            if(data.success) {
                setProducts(data.products)
            } else toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        };
    }

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                setOrders(data.orders.reverse());
                setOrderLoading(false)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const createUserIfNeeded = async () => {
        try {
            const token = await getToken();
            const userPayload = {
                name: `${user?.firstName} ${user?.lastName}`,
                email: user.primaryEmailAddress.emailAddress,
                imageUrl: user.imageUrl,
            };
            await axios.post('/api/user/create', userPayload, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error creating user:", error.message);
            toast.error("Failed to initialize user account.");
        }
    };
    
    
    const fetchUserData = async () => {
        try {
            if(user && user.publicMetadata.role === 'seller') {
                setIsSeller(true);
            }
            const token = await getToken();
            console.log('token', token)
            const { data } = await axios.get('/api/user/data', { headers: { Authorization: `Bearer ${token}` } });

            if(data.success) {
                setUserData(data.user);
                setCartItems(data.user.cartItems);
                toast.success('Login successful')
            } else { toast.error(data.message); }
            
        } catch (error){
            toast.error(error.message);
        }
    }
    
    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        const isNewItem = !cartData[itemId];
    
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
    
        setCartItems(cartData);
    
        if (user) {
            try {
                const token = await getToken();
                await axios.post('/api/cart/update', { cartData }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                toast.success(isNewItem ? 'Item added to cart' : 'Cart updated');
                console.log(cartData);
    
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
    
    
    const updateCartQuantity = async (itemId, quantity) => {
        
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);

        if(user) {
            try {
                const token = await getToken();
                await axios.post('/api/cart/update', { cartData }, { headers: { Authorization: `Bearer ${token}`}});
                toast.success('Cart updated');                
            } catch (error) {
                toast.error(error.message);
            }
        }
        
    }
    
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }
    
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }
    
    useEffect(() => {
        fetchProductData()
    }, [])
    
    useEffect(() => {
        const initializeUser = async () => {
            if (user) {
                await createUserIfNeeded();
                await fetchUserData();
            }
        };
        initializeUser();
    }, [user]);
    
    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        user, getToken, fetchOrders,
        orders, orderLoading
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}