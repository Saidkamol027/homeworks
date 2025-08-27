import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateSaleInput } from './dto/create-sale.input'
import { UpdateSaleInput } from './dto/update-sale.input'
import { Sale } from './entities/sale.entity'
import { SaleService } from './sale.service'

@Resolver(() => Sale)
export class SaleResolver {
	constructor(private readonly saleService: SaleService) {}

	@Query(() => [Sale])
	sales() {
		return this.saleService.findAll()
	}

	@Mutation(() => Sale)
	createSale(@Args('data') data: CreateSaleInput) {
		return this.saleService.create(data)
	}

	@Mutation(() => Sale)
	updateSale(@Args('id') id: number, @Args('data') data: UpdateSaleInput) {
		return this.saleService.update(id, data)
	}

	@Mutation(() => Boolean)
	deleteSale(@Args('id') id: number) {
		return this.saleService.remove(id)
	}
}
