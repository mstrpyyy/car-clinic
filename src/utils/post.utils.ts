import { GET_HTTP } from "@/lib/http-request";
import { UseFormReturn } from "react-hook-form";

type address = {
  id: string,
  text:string
}

type AddressFetcherParams = {
  url: string;
  query?: Record<string, string>;
  currentId: string;
  setList: React.Dispatch<React.SetStateAction<address[] | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldName: string;
  resetFields?: string[];
};

export const fetchAddressData = async ({
  url,
  query,
  currentId,
  setList,
  form,
  fieldName,
  resetFields = [],
}: AddressFetcherParams) => {
  try {
    const res = await GET_HTTP(url, '', query);
    if (res.status !== 200) throw new Error(`Failed to fetch ${fieldName} list`);

    setList(res.result);

    const exists = res.result.some((item: address) => item.id === currentId);
    if (!exists) {
      form.setValue(fieldName, '');
      resetFields.forEach(field => form.setValue(field, ''));
    }
  } catch (error) {
      setList([]);
    console.error(error);
  }
};
