import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    products(): Promise<Product[]>;
    createProduct(data: CreateProductInput): Promise<Product>;
    updateProduct(id: number, data: UpdateProductInput): Promise<Product>;
    deleteProduct(id: number): Promise<Product>;
}
