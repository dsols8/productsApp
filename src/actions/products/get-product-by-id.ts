import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product";
import { ProductMapper } from "../../infrastructure/mappers/product-mapper";


const emptyProduct: Product = {
    id: '',
    title: 'New Product',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: [],
}


export const getProductById = async(id: string):Promise<Product> => {

    if (id === 'new') return emptyProduct;

    try {
        
        const {data} = await tesloApi.get(`/products/${id}`);

        return ProductMapper.tesloProductToEntity(data);


    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id: ${id}`);
    }
}