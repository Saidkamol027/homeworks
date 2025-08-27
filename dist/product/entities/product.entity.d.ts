import { Model } from 'sequelize-typescript';
import { Category } from '../../category/entities/category.entity';
import { Sale } from '../../sale/entities/sale.entity';
export declare class Product extends Model<Product> {
    name: string;
    categoryId: number;
    category: Category;
    sales: Sale[];
}
