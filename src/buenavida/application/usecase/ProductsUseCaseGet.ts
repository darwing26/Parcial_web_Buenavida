import ProductServiceGetPort from "../../domain/interfaces/services/ProductServiceGetInterface";
import NullProduct  from "../../domain/model/Products/NullProduct";
import Product from "../../domain/model/Products/Product";
import ProductUseCaseGetPort from "../../domain/port/driver/usecase/ProductUseCaseGetPort";
import path from 'path'
import { promises as fs } from 'fs'


export default class ProductUseCaseGet implements ProductUseCaseGetPort {

    constructor(
        private readonly productGetServicePort: ProductServiceGetPort,
    ){}

    public getAllProduct = async () : Promise<Product[]> => {
        const products = await this.productGetServicePort.getAllProduct();
        if(products.length > 0) {
            return products;
        }
        return [new NullProduct()]
    }

    public getProductById = async (id: number) : Promise<Product> => {
        const product = await this.productGetServicePort.getProductById(id)
        return product;   
    }

    public async getProductImage(file: string): Promise<string> {
        
        const absolutePath = path.join(__dirname, '../../../../assets/images/');
        const defaultImage = 'not-icon.png'; 
        try {
            
            await fs.access(absolutePath + file, fs.constants.F_OK);

            
            const stats = await fs.stat(absolutePath + file);

            if (stats.isFile()) {
                return absolutePath + file;
            }

            return path.join(absolutePath, defaultImage);
        } catch (err) {
            
            return path.join(absolutePath, defaultImage);
        }
    }
    public async searchProduct(name: string): Promise<Product[]> {
        const products = await this.productGetServicePort.getAllProduct();
        if (products.length > 0) {
            
            const filteredProducts = products.filter(product => 
                product.nombre.toLowerCase().includes(name.toLowerCase())
            );
            return filteredProducts.length > 0 ? filteredProducts : [new NullProduct()];
        }
        return [new NullProduct()];
    }

    public async filterByPrice(price: number): Promise<Product[]> {
        const products = await this.productGetServicePort.getAllProduct();
        if (products.length > 0) {
            const filteredProducts = products.filter(product => 
                product.precio <= price
            );
            return filteredProducts.length > 0 ? filteredProducts : [new NullProduct()];
        }
        return [new NullProduct()];
    }

    public async pagination(page: number): Promise<Product[]> {
        const products = await this.productGetServicePort.getAllProduct();
        if (products.length > 0) {
           
            const pageSize = 12;
    
            
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
    
            
            const paginatedProducts = products.slice(startIndex, endIndex);
    
            
            return paginatedProducts.length > 0 ? paginatedProducts : [new NullProduct()];
        }
        return [new NullProduct()];
    }
} 