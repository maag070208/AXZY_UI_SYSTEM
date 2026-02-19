export const formatCurrencyMX = (value: number) => {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
};

export const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};
