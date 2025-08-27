import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
export declare class CategoryResolver {
    private categoryService;
    constructor(categoryService: CategoryService);
    categories(): Promise<Category[]>;
    category(id: number): Promise<Category | null>;
    createCategory(data: CreateCategoryInput): Promise<Category>;
    updateCategory(data: UpdateCategoryInput): Promise<Category>;
    removeCategory(id: number): Promise<Category>;
}
