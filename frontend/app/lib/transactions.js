export const getAllTransactions = async (userId) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/all`;
    const response = await fetch(url);
    const data = await response.json();
    
  if (data?.transactions.length < 1) {
    return data?.transactions;
  }
  let userData = data?.transactions.filter((transaction) => transaction?.userId === userId );
  return userData;
}