var sjcl = require('sjcl');
var axios = require('axios');

const BASE_URL = "http://0.0.0.0:8081/";


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