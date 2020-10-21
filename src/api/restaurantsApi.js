import { handleResponse, handleError } from "./apiUtils";
//const baseUrl = process.env.REACT_APP_API_URL + "/restaurants/";
const baseUrl = "https://code-challenge.spectrumtoolbox.com/api/restaurants/";

export function getRestaurants() {
  return fetch(baseUrl, {
      headers: {
          Authorization: "Api-Key q3MNxtfep8Gt",
      },
  })
    .then(handleResponse)
    .catch(handleError);
}


export function getRestaurantsBySlug(slug) {
  return fetch(baseUrl + "?slug=" + slug)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(restaurants => {
        if (restaurants.length !== 1) throw new Error("Restaurants not found: " + slug);
        return restaurants[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}