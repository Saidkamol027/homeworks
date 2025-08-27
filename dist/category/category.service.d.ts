import { Category } from 'src/category/entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: typeof Category);
    create(data: CreateCategoryInput): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    update(data: UpdateCategoryInput): Promise<Category>;
    remove(id: number): Promise<Category>;
}
