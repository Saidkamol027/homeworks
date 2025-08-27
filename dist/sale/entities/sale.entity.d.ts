import { Product } from './../../product/entities/product.entity';
import { Model } from 'sequelize-typescript';
export declare class Sale extends Model<Sale> {
    id: number;
    amount: number;
    productId: number;
    product: Product;
}
