import { Product } from './../../product/entities/product.entity';
import { Model } from 'sequelize-typescript';
export declare class Category extends Model<Category> {
    id: number;
    name: string;
    products?: Product[];
}
