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

export const postPhoto = (data) => {
  return axios.post(
    'http://localhost:8081/calories/ingredients',
    {
      'image_base64': data,
    },
    { headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
};
