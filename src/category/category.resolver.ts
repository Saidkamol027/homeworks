import { Category } from 'src/category/entities/category.entity'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { CreateCategoryInput } from './dto/create-category.input'
import { UpdateCategoryInput } from './dto/update-category.input'

@Resolver(() => Category)
export class CategoryResolver {
	constructor(private categoryService: CategoryService) {}

	@Query(() => [Category])
	categories() {
		return this.categoryService.findAll()
	}

	@Query(() => Category)
	category(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.findOne(id)
	}

	@Mutation(() => Category)
	createCategory(@Args('data') data: CreateCategoryInput) {
		return this.categoryService.create(data)
	}

	@Mutation(() => Category)
	updateCategory(@Args('data') data: UpdateCategoryInput) {
		return this.categoryService.update(data)
	}

	@Mutation(() => Category)
	removeCategory(@Args('id', { type: () => Int }) id: number) {
		return this.categoryService.remove(id)
	}
}
