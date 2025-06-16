import React, {createContext, useContext, useState} from "react";

export interface Product{
    code: string;
    product_name:string;
    image_front_small_url: string;
    ingredients_text: string;
    nutriments: {
        energy_kcal: number;
        proteins_g: number;
        carbohydrate_g: number;
        fat_g: number;
    };
    nutriscore_grade: string;
    categories_tags: string[];
    labels_tag: string[];
}

interface ProductContextType{
    products: Product[];
    setProducts:React.Dispatch<React.SetStateAction<Product[]>>;
    filterCategory: string;
    setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;  // importing Dispatch causes typescript error
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}:{children:React.ReactNode})=>{
    const [products, setProducts] =useState<Product[]>([]);
    const [filterCategory,setFilterCategory] =useState('');
    const [searchTerm,setSearchTerm]= useState('');
    const [sortOption,setSortOption] = useState('');


    return(
        <ProductContext.Provider value={{products,setProducts,filterCategory,setFilterCategory,searchTerm,setSearchTerm,sortOption,setSortOption}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext =(): ProductContextType =>{
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error("useProductContext must be used within ProductProvider");
    }
    return context;
};