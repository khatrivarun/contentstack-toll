import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ReceiptType {
  ONE_WAY = 'ONE_WAY',
  RETURN = 'RETURN',
}

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying', { nullable: false })
  vehicleRegistrationNumber: string;

  @Column('character varying', { default: ReceiptType.ONE_WAY })
  receiptType: ReceiptType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
