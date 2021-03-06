import { rawClient, client } from "../ajax";

export const postLogin = data =>
  rawClient.request({
    method: "POST",
    url: "/login",
    data
  });

// export const postForgotPassword = data =>
//   client.request({
//     method: 'POST',
//     url: '/forgot/password',
//     data,
//   });

// export const postResetPassword = data =>
//   client.request({
//     method: 'POST',
//     url: '/reset/password',
//     data,
//   });

export const getProfile = () =>
  client.request({
    method: "GET",
    url: "/get/profile"
  });

// // update profile data
export const postProfile = data =>
  client.request({
    method: "PUT",
    url: "/update/profile",
    data
  });

export const postFarmDetails = (farmId, data) =>
  client.request({
    method: "PUT",
    url: `update/farm/${farmId}`,
    data
  });

export const getFarm = farmId =>
  client.request({
    method: "GET",
    url: `get/farm`
  });

export const getFarmById = farmId =>
  client.request({
    method: "GET",
    url: `get/farm/${farmId}`
  });

// export const postAvatar = data =>
//   client.request({
//     method: 'PUT',
//     url: '/update/avatar',
//     data,
//   });

// export const getCode = data =>
//   client.request({
//     method: 'GET',
//     url: `/email/${data}/activation`,
//   });

export const postSignup = data =>
  rawClient.request({
    method: "POST",
    url: "/signup",
    data
  });

// export const postActivateuser = data =>
//   rawClient.request({
//     method: 'POST',
//     url: '/activateuser',
//     data,
//   });

// export const getNotifications = () =>
//   client.request({
//     method: 'GET',
//     url: '/activity',
//   });

// export const postExpoToken = token =>
//   client.request({
//     method: 'POST',
//     url: '/expo/token',
//     data: {
//       token,
//     },
//   });

// export const getExistEmail = params =>
//   client.request({
//     method: 'GET',
//     url: `/exist/${params.email}`,
//   });

export const getItems = data =>
  client.request({
    method: "GET",
    url: `/get/items/market/${data}`
  });

export const getFarmItems = data =>
  client.request({
    method: "GET",
    url: `/get/items/${data}`
  });

export const getMarkets = data =>
  client.request({
    method: "GET",
    url: `/get/markets/${data}`
  });

export const getItem = data =>
  client.request({
    method: "GET",
    url: `/get/item/${data}`
  });

export const postFarmItem = (data, farm) =>
  client.request({
    method: "POST",
    url: `/add/item/${farm}`,
    data
  });

export const putFarmItem = (data, id) =>
  client.request({
    method: "PUT",
    url: `/update/item/${id}`,
    data
  });

export const getCart = () =>
  client.request({
    method: "GET",
    url: `/get/cart`
  });

export const postItemToCart = (item, data) =>
  client.request({
    method: "POST",
    url: `/add/cart/${item}`,
    data
  });

export const putItemInCart = (item, data) =>
  client.request({
    method: "PUT",
    url: `/update/cart/${item}`,
    data
  });

export const deleteItemFromCart = item =>
  client.request({
    method: "DELETE",
    url: `/delete/cart/${item}`
  });

export const deleteItemById = (id, farm) =>
  client.request({
    method: "DELETE",
    url: `/delete/item/${id}/${farm}`
  });

export const postCard = data =>
  client.request({
    method: "POST",
    url: `/add/card`,
    data
  });

export const getCard = () =>
  client.request({
    method: "GET",
    url: "/get/card"
  });

export const putCard = data =>
  client.request({
    method: "PUT",
    url: "/update/card",
    data
  });

export const deleteCard = () =>
  client.request({
    method: "DELETE",
    url: "/delete/card"
  });

// FAVORITES

export const postFavorite = data =>
  client.request({
    method: "POST",
    url: "/add/favorite",
    data
  });

export const getFavorite = () =>
  client.request({
    method: "GET",
    url: "/get/favorites"
  });

export const removeFavorite = data =>
  client.request({
    method: "DELETE",
    url: "/delete/favorite",
    data
  });

export const getAllFavorites = () =>
  client.request({
    method: "GET",
    url: "/get/favorite/items"
  });

// ACH

export const getACHDetails = () =>
  client.request({
    method: "GET",
    url: "/get/ach/details"
  });

export const postACH = ({ code }) =>
  client.request({
    method: "POST",
    url: `/add/ach/${code}`,
    data: {
      code
    }
  });

export const getACHBalance = () =>
  client.request({
    method: "GET",
    url: "/get/ach/balance"
  });

export const putACH = () =>
  client.request({
    method: "PUT",
    url: "/update/ach"
  });

export const getACHTransactions = () =>
  client.request({
    method: "GET",
    url: "/get/ach/transactions"
  });

export const getConsumerOrder = () =>
  client.request({
    method: "GET",
    url: `/orders/consumer/current`
  });

export const getPastConsumerOrders = () =>
  client.request({
    method: "GET",
    url: `/orders/consumer/past`
  });

export const getAllMarketOrders = marketId =>
  client.request({
    method: "GET",
    url: `orders/market/${marketId}`
  });

export const getAllMarketFarms = marketId =>
  client.request({
    method: "GET",
    url: `get/farms/${marketId}`
  });

export const postOrder = () =>
  client.request({
    method: "POST",
    url: "/create/order"
  });

export const getFarmOrders = farm =>
  client.request({
    method: "GET",
    url: `/orders/farmer/current/${farm}`
  });

export const getPastFarmOrders = farm =>
  client.request({
    method: "GET",
    url: `/orders/farmer/past/${farm}`
  });

export const fullfillOrder = (order, data) =>
  client.request({
    method: "PUT",
    url: `/update/order/status/${order}`,
    data
  });

export const getVerifyEmail = email =>
  client.request({
    method: "GET",
    url: `/verify/email/${email}`
  });
