import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
export declare class ProductService {
    private productModel;
    constructor(productModel: typeof Product);
    create(data: CreateProductInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, data: UpdateProductInput): Promise<Product>;
    remove(id: number): Promise<Product>;
}
