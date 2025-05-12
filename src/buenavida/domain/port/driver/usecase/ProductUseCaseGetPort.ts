import Product from "../../../model/Products/Product";

export default interface ProductUseCaseGetPort {
    getAllProduct(): Promise<Product[]>
    getProductById(id :number): Promise<Product>
    getProductImage(file: string): Promise<string>
    searchProduct(name: string): Promise<Product[]>
    filterByPrice(price: number): Promise<Product[]>
    pagination(page: number): Promise<Product[]>
}