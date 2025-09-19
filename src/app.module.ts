import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { InventoryModule } from './module/inventory/inventory.module'
import { NotificationsModule } from './module/notifications/notifications.module'
import { OrdersModule } from './module/orders/orders.module'
import { PaymentsModule } from './module/payments/payments.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		OrdersModule,
		InventoryModule,
		PaymentsModule,
		NotificationsModule,
	],
})
export class AppModule {}
