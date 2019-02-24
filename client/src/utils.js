import axios from 'axios';

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
};

export const setCookie = (key, value) => {
  let cookies = {};
  try {
    cookies = JSON.parse(document.cookie);
  } catch {
    // do nothing
  }
  cookies[key] = value;
  document.cookie = JSON.stringify(cookies);
};

export const getCookie = (key) => {
  try {
    const cookies = JSON.parse(document.cookie);
    return cookies[key];
  } catch {
    return false;
  }
};

export const postPhoto = (data, self) => {
  return axios.post(
    'http://localhost:8081/calories/ingredients',
    {
      'image_base64': data,
    },
    { headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.data.error) {
          self.error(res.data.message);
        } else {
          const ingredients = JSON.stringify(res.data.response);
          window.location.href = `${window.location.origin}/recipe?ingredients=${ingredients}`;
        }
      })
      .catch(self.error);
};

export const postIngredients = (list, self) => {
  return axios.post(
    'http://localhost:8081/calories/count',
    {
      'ingredients_list': list,
    },
    { headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.data.error) {
        self.error(res.data.message);
      } else {
        const ingredients = JSON.stringify(res.data.response['ingredients']);
        window.location.href = `${window.location.origin}/preview?ingredients=${ingredients}`;
      }
    })
    .catch(self.error);
};

export const commit = (list, self) => {
  console.log(list);
  console.log(getCookie('user'));
  return axios.post(
    'http://localhost:8081/calories/confirm',
    {
      'ingredients_list': list,
      'user_id': getCookie('user'),
    },
    { headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.data.error) {
        self.error(res.data.message);
      } else {
        window.location.href = `${window.location.origin}/dashboard`;
      }
    })
    .catch(self.error);
};

var sjcl = require('sjcl');

const BASE_URL = "http://localhost:8081/";


const utils = {

    postUser: function(username, firstName, lastName, email, password) {
        const out = sjcl.hash.sha256.hash(password);
        const hash = sjcl.codec.hex.fromBits(out);
        return axios.post(BASE_URL + 'user', {
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: hash
        });
      },

    postGetUsers: function(username, password) {
        const out = sjcl.hash.sha256.hash(password);
        const hash = sjcl.codec.hex.fromBits(out);
        return axios.post(BASE_URL + 'user/login', { username: username, password: hash });
    },

}
export default utils;

