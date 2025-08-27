import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { Sale } from './entities/sale.entity';
import { SaleService } from './sale.service';
export declare class SaleResolver {
    private readonly saleService;
    constructor(saleService: SaleService);
    sales(): Promise<Sale[]>;
    createSale(data: CreateSaleInput): Promise<Sale>;
    updateSale(id: number, data: UpdateSaleInput): Promise<Sale>;
    deleteSale(id: number): Promise<boolean>;
}
