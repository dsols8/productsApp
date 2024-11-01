import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { ProductMapper } from "../../infrastructure/mappers/product-mapper";



export const getProductById = async(id: string):Promise<Product> => {


    try {
        
        const {data} = await tesloApi.get(`/products/${id}`);

        return ProductMapper.tesloProductToEntity(data);


    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id: ${id}`);
    }
}