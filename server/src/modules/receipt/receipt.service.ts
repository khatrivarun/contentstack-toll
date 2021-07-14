import { CreateReceiptDto } from './../../dto/create-reciept.dto';
import { Receipt, ReceiptType } from './../../models/receipt.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
  ) {}

  public async createReceipt(
    createReceiptDto: CreateReceiptDto,
  ): Promise<Receipt> {
    const receipt = new Receipt();
    receipt.vehicleRegistrationNumber =
      createReceiptDto.vehicleRegistrationNumber;

    receipt.receiptType =
      createReceiptDto.amountPayed === 100
        ? ReceiptType.ONE_WAY
        : ReceiptType.RETURN;

    return await this.receiptRepository.save(receipt);
  }

  public async validateReceipt(
    vehicleRegistrationNumber: string,
  ): Promise<boolean> {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0);

    const receipt = await this.receiptRepository.findOne({
      where: {
        vehicleRegistrationNumber: vehicleRegistrationNumber,
        receiptType: ReceiptType.RETURN,
        createdAt: MoreThanOrEqual(todayDate),
      },
    });

    if (receipt) {
      return true;
    } else {
      return false;
    }
  }
}
