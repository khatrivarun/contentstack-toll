import { Receipt } from './../../models/receipt.model';
import { ReceiptService } from './receipt.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateReceiptDto } from 'src/dto/create-reciept.dto';
import { Response } from 'express';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  public async createReceipt(
    @Body() createReceiptDto: CreateReceiptDto,
  ): Promise<Receipt> {
    return await this.receiptService.createReceipt(createReceiptDto);
  }

  @Post('/validate')
  public async validateReceipt(
    @Body('vehicleRegistrationNumber') vehicleRegistrationNumber: string,
    @Res() response: Response,
  ): Promise<Response> {
    const result = await this.receiptService.validateReceipt(
      vehicleRegistrationNumber,
    );

    return response.json({
      status: result ? 'OK' : 'NOT_FOUND_OR_EXPIRED',
    });
  }
}
