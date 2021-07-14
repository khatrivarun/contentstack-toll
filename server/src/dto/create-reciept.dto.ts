import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateReceiptDto {
  @IsNotEmpty()
  vehicleRegistrationNumber: string;

  @IsNotEmpty()
  @IsIn([100, 200])
  amountPayed: number;
}
