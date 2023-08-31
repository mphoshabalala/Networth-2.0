const api = {
  //request assets
  fetchAssets: function (uri, token) {
    return fetch(uri + "/user-assets", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json();
    });
  },

  fetchLoggedInUserData: function (uri, token) {
    return fetch(uri + "/user-data", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json();
    });
  },

  // fetch data from the admin server
  fetchAdminData: function (uri) {
    return fetch(uri + "/admin")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Unable to get data from the server, Error: " + response.message
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  },
  postData: function (uri, phoneData) {
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phoneData),
    });
  },
};

export default api;
