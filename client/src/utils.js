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

const compactIngredients = (is) => {
  let str = '';
  const concatenate = s => str = `${str};${s.replace(' ', '_')}`;
  is.forEach(concatenate);
  return str.substring(1);
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
        self.setState({ loading: false });
        if (res.data.error) {
          self.error(res.data.message);
        } else {
          const ingredients = compactIngredients(res.data.response);
          console.log(ingredients);
          window.location.href = `${window.location.origin}/recipe?ingredients=${ingredients}`;
        }
      })
      .catch(self.error);
};
