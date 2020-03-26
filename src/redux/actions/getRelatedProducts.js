import axios from "axios";
import { GET_RELATED_PRODUCTS } from "./actionTypes.js";
// import store from "../store.js"; // DO NOT NORMALLY LOAD STORE <- DONE FOR DEMONSTRATION PURPOSES

export function fetchRelatedProducts(id) {
  return function(dispatch) {
    return axios
      .get(`http://3.134.102.30/products/${id}/related`)
      .then(({ data }) => {
        // data is an array of ids
        console.log(`data for ${id}: `, data);
        return fetchProducts(data);
      })
      .then(responseArr => {
        let dataArray = responseArr.map(response => response.data);
        dispatch(getRelatedProducts(dataArray));
      })
      .catch(err => {
        console.log("err trying to fetch all related product data: ", err);
      });
  };
}

function getRelatedProducts(data) {
  return {
    type: GET_RELATED_PRODUCTS,
    payload: data
  };
}

export function fetchProducts(ids) {
  let requests = [];
  for (let id of ids) {
    requests.push(axios.get(`http://3.134.102.30/products/${id}`));
  }
  return axios.all(requests);
}