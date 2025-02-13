export function formatToBRL(value: number): string {
    const formattedValue = value / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(formattedValue);
  }
  