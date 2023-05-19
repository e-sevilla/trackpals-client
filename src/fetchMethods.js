import { ref } from "vue";

export const alertMessage = ref();
export const alertShow = ref(false);

export default function fetchMethods() {

  const urlBase = "http://localhost:8080";

  const get = async (url) => {
    let resultado = await fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data == undefined || data.hasOwnProperty("status")) {
          return Promise.reject(data.message);
        }
        return data;
      })
      .catch(error => {
        alertMessage.value = error
        alertShow.value = true
      });
    return resultado;
  };

  const post = async (url, objeto) => {
    let resultado = await fetch(url, {
        method: "POST",
        // Pasar el obejto a json
        body: JSON.stringify(objeto),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data == undefined || data.hasOwnProperty("status")) {
          return Promise.reject(data.message);
        }
        return data;
      })
      .catch(error => {
        alertMessage.value = error
        alertShow.value = true
      });
    return resultado;
  };

  return { urlBase, alertMessage, alertShow, get, post };
  
}