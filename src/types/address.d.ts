import type { AddressItem } from './common';

/** 添加收货地址: 请求参数 */
export type AddressParams = Omit<AddressItem, 'id' | 'fullLocation'>;
