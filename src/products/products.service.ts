/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument, DiscountType } from './product.schema';
import { calculateFinalPrice } from './pricing';
import { CreateProductDto } from './dto/create-product.dto';
import { AddOfferDto } from './dto/add-offer.dto';

/* ================= LEAN TYPES ================= */

type LeanOffer = {
  type: DiscountType;
  value: number;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
};

type LeanProduct = {
  _id: Types.ObjectId;
  storeId: Types.ObjectId;
  name: string;
  description?: string;
  images?: string[];
  quantity: number;
  price: string;
  category?: string;
  offers: LeanOffer[];
};

/* ================= SERVICE ================= */
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  /* ========== STORE (ADMIN = STOREKEEPER) ========== */
  async create(storeId: string, dto: CreateProductDto) {
    return this.productModel.create({
      ...dto,
      storeId: new Types.ObjectId(storeId),
    });
  }

  private async findProductByQuery(
    query: Record<string, unknown>,
  ): Promise<LeanProduct> {
    const product = await this.productModel.findOne(query).lean<LeanProduct>();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getStoreProductById(storeId: string, productId: string) {
    const product = await this.findProductByQuery({
      _id: new Types.ObjectId(productId),
      storeId: new Types.ObjectId(storeId),
    });
    return {
      ...product,
      finalPrice: calculateFinalPrice(product),
    };
  }

  async updateProduct(storeId: string, productId: string, dto: any) {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(productId),
        storeId: new Types.ObjectId(storeId),
      },
      { $set: dto },
      { new: true, runValidators: true },
    );
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  async deleteProduct(storeId: string, productId: string) {
    const product = await this.productModel.findOneAndDelete({
      _id: productId,
      storeId: new Types.ObjectId(storeId),
    });
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }

  async updateStock(storeId: string, productId: string, quantity: number) {
    const product = await this.productModel.findOneAndUpdate(
      { _id: productId, storeId: new Types.ObjectId(storeId) },
      { $set: { quantity } },
      { new: true, runValidators: true },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async addOffer(productId: string, dto: AddOfferDto) {
    const offer: LeanOffer = {
      type: dto.type,
      value: dto.value,
      isActive: true,
      startDate: dto.startDate ? new Date(dto.startDate) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    };
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      { $push: { offers: offer } },
      { new: true },
    );
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  /* ================= CUSTOMER ================= */
  async findById(id: string) {
    const product = await this.findProductByQuery({
      _id: new Types.ObjectId(id),
    });
    return {
      ...product,
      finalPrice: calculateFinalPrice(product),
    };
  }

  async findAll(filters?: { search?: string; category?: string }) {
    const query: Record<string, unknown> = {};
    if (filters?.search) {
      query['name'] = { $regex: filters.search, $options: 'i' };
    }
    if (filters?.category) {
      query['category'] = filters.category;
    }
    const products = await this.productModel.find(query).lean<LeanProduct[]>();
    return products.map((product) => ({
      ...product,
      finalPrice: calculateFinalPrice(product),
    }));
  }

  async getStores() {
    return this.productModel.distinct('storeId');
  }

  /**
   * SINGLE SOURCE OF TRUTH
   * Used by BOTH customer & store/admin
   */
  async getProductsByStore(storeId: string) {
    const products = await this.productModel
      .find({ storeId: new Types.ObjectId(storeId) })
      .lean<LeanProduct[]>();

    return products.map((product) => ({
      ...product,
      finalPrice: calculateFinalPrice(product),
    }));
  }

  async removeSingleOffer(productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    if (!product.offers || product.offers.length === 0) {
      throw new NotFoundException('No offers to delete');
    }

    // Remove the only offer (or the first one if multiple)
    product.offers.splice(0, 1);
    await product.save();

    return product;
  }

  async getCategoryWithStores(category: string, userPincodes: string[]) {
    return this.productModel.aggregate([
      { $match: { category } },

      {
        $group: {
          _id: '$category',
          storeIds: { $addToSet: '$storeId' },
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'storeIds',
          foreignField: '_id',
          as: 'stores',
        },
      },

      {
        $project: {
          _id: 0,
          category: '$_id',
          stores: {
            $filter: {
              input: '$stores',
              as: 'store',
              cond: {
                $and: [
                  { $eq: ['$$store.role', 'ADMIN'] },
                  {
                    $gt: [
                      {
                        $size: {
                          $setIntersection: [
                            '$$store.serviceablePincodes',
                            userPincodes,
                          ],
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
  }
}
