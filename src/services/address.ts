import { GET_HTTP } from "@/lib/http-request";
import { TAddress } from "@/types/general.types";

type AddressType = 
  | 'provinces'
  | 'cities'
  | 'districts'
  | 'postcodes';

export const getAddressById = async (addressType: AddressType, targetId: string, query?: Record<string, string>) => {
  const url = `/address/${addressType}`;
  try {
    const data = await GET_HTTP(url, '', query);
    if (data.status !== 200) throw new Error(`Failed to fetch ${addressType} list`);
    const result = data.result.find((item: TAddress) => item.id === targetId)
    return result?.text ?? '-';
  } catch (error) {
    console.log(error);
    return '-';
  }
};