import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DeliveryCharge,
  DeliveryChargeDocument,
} from './delivery-charge.schema';

@Injectable()
export class DeliveryChargesService {
  constructor(
    @InjectModel(DeliveryCharge.name)
    private readonly deliveryChargeModel: Model<DeliveryChargeDocument>,
  ) {}

  private assertValidPincode(pincode: string) {
    if (!/^[0-9]{6}$/.test(pincode)) {
      throw new BadRequestException('Pincode must be a 6 digit string');
    }
  }

  private isSixDigitPincode(pincode: string) {
    return /^[0-9]{6}$/.test(pincode);
  }

  async listAll() {
    return this.deliveryChargeModel.find().sort({ pincode: 1 }).lean();
  }

  async upsert(pincode: string, charge: number) {
    this.assertValidPincode(pincode);

    const updated = await this.deliveryChargeModel
      .findOneAndUpdate(
        { pincode },
        { $set: { pincode, charge } },
        { new: true, upsert: true },
      )
      .lean();

    return updated;
  }

  async remove(pincode: string) {
    this.assertValidPincode(pincode);
    const res = await this.deliveryChargeModel.deleteOne({ pincode });
    return { deletedCount: res.deletedCount };
  }

  async getChargeForPincode(pincode: string): Promise<number> {
    // Booking flows may pass zipCode values that aren't 6-digit pincodes.
    // In that case, don't block booking; just apply no delivery charge.
    if (!this.isSixDigitPincode(pincode)) {
      return 0;
    }
    const rule = await this.deliveryChargeModel.findOne({ pincode }).lean();
    return rule?.charge ?? 0;
  }
}
