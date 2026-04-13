let accessToken = "";

//here the token is send from the backend when the login is donw and get the session
export const setAccessToken = (token: string) => {
  accessToken = token;
  console.log(accessToken);
};

//this is the main function when we try to send request we will send every request from here
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  //here write the code for fetching the data
  let res = await fetch(url, {
    ...options, //here the option is here to define the method and body part of the request
    headers: {
      ...options.headers,
      Authorization: `Bearer${accessToken}`,
    },
    credentials: "include",
  });

  //if it throws the error then understand that it need a new access token
  if (res.status === 401) {
    //send the request to the backend refresh route
    const refresh = await fetch("http:localhost:5000/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = await refresh.json();
    accessToken = data.accessToken;
  }

  //here after sucessfully taking the access token we again fetch the req that was not done
  res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer${accessToken}`,
    },
    credentials: "include",
  });

  return res;
};
