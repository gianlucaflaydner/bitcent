import { useCallback, useState } from "react";

export default function useForm<T = any>(initialData?: T) {
  const [data, setData] = useState<T>(initialData ?? {} as T);

  function changeAttribute(attribute: any, func?: Function) {
    return (valueOrEvent: any) => {
      const v = valueOrEvent?.target?.value ?? valueOrEvent;
      setData({ ...data, [attribute]: func?.(v) ?? v });
    };
  }

  const updateData = useCallback(function (dados: T) {
    setData(dados)
}, [])

  return {
    data,
    setData,
    changeAttribute,
    updateData
  };
}
