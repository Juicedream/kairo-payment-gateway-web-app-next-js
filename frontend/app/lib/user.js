export const loginUser = async (email, password) => {
const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}
export const registerUser = async (email, password, firstName, lastName, orgName) => {
const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, organizationName:orgName, firstName, lastName }),
  });
  const data = await response.json();
  return data;
}

export const userProfile = async (token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  return data;
}

export const apiKeyCreation = async (token) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/create-api-key`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
    }
  });
  const data = await response.json();
  return data;
}

