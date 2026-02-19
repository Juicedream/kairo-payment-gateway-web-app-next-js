export const getAllPayments = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/all`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const initiatePayment = async (email, amount) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/initiate`; 
    const response = await fetch(url, {
        method: 
        "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, amount}),
    });
    const data = await response.json();
    return data;
}
export const deletePaymentByPayID = async (payId) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/payments/delete-payment/${payId}`;
    const response = await fetch(url, {
        method: "DELETE",
    });
    
}