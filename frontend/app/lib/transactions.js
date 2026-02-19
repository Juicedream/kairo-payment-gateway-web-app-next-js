export const getAllTransactions = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/all`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}