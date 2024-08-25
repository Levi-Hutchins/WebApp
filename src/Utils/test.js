const axios = require('axios');
const params = {
  access_key: '6d66b0ff28b0b391e607aac56f2bce71',
  query: '722 the road '
}

axios.get('https://api.positionstack.com/v1/forward', {params})
  .then(response => {
    console.log(response.data);
  }).catch(error => {
    console.log(error);
  });