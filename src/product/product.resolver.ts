import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { Product } from './entities/product.entity'
import { ProductService } from './product.service'

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(() => [Product])
	products() {
		return this.productService.findAll()
	}

	@Mutation(() => Product)
	createProduct(@Args('data') data: CreateProductInput) {
		return this.productService.create(data)
	}

	@Mutation(() => Product)
	updateProduct(
		@Args('id') id: number,
		@Args('data') data: UpdateProductInput
	) {
		return this.productService.update(id, data)
	}

	@Mutation(() => Boolean)
	deleteProduct(@Args('id') id: number) {
		return this.productService.remove(id)
	}
}
