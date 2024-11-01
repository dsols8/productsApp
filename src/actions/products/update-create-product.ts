import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";



export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = Number(product.stock);
    product.price = Number(product.stock);


    if (!product.id) {
        return updateProduct(product);
    }

    throw new Error('Creation not implemented');

};




const updateProduct = async (product: Partial<Product>) => {

    console.log({ product });

    const { id, images = [], ...rest } = product;


    try {
        const checkedImages = prepareImages(images);
        console.log({ checkedImages });

        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        })

        return data;

    } catch (error) {

        if (isAxiosError(error)) {
            console.log(error.response?.data)
        }

        console.log(error)
        throw new Error('Error al actualizar el producto')
    }





}


const prepareImages = (images: string[]) => {

    return images.map(
        image => image.split('/').pop()
    )

}