'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";

const AllProducts = () => {
    const { products } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set loading to false once products are available
        if (products && products.length > 0) {
            setLoading(false);
        }
        
        // Fallback in case products array is empty but loading should end
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, [products]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
                
                {loading ? (
                    <div className="w-full flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                        {products.map((product, index) => <ProductCard key={index} product={product} />)}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
