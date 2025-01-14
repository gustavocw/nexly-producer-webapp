export function formatDateToString(date?: any): string {
  try {
    if (!date) {
      throw new Error("Date is undefined or null");
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    return "Invalid Date";
  }
}
