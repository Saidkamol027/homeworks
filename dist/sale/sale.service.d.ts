import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { Sale } from './entities/sale.entity';
export declare class SaleService {
    private readonly saleModel;
    constructor(saleModel: typeof Sale);
    create(data: CreateSaleInput): Promise<Sale>;
    findAll(): Promise<Sale[]>;
    update(id: number, data: UpdateSaleInput): Promise<Sale>;
    remove(id: number): Promise<boolean>;
}
