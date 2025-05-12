import ProductServiceDeletePort from "../../domain/interfaces/services/ProductServiceDeleteInterface";
import ProductUseCaseDeletePort from "../../domain/port/driver/usecase/ProductUseCaseDeletePort";

export default class ProductUseCaseDelete implements ProductUseCaseDeletePort {

    constructor(private readonly productServiceDelete : ProductServiceDeletePort ) {}

    public async deleteProduct(id: number): Promise<void> {
        try {
            await this.productServiceDelete.deleteProduct(id);
        } catch (error) {
            console.error("Error en ProductUseCase:", error);
            throw new Error("Error al eliminar el producto");
        }
    }

}