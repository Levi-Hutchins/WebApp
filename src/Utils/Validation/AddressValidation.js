import axios from 'axios';

const validateAddress = async (address, postCode) => {
    const params = {
      access_key: process.env.APIKEY,
      query: address
    };

    try {
      const response = await axios.get('https://api.positionstack.com/v1/forward', {params});

      if(response.data.data){
        const addressesFound = response.data.data;

        const postCodesFound = addressesFound.map(address => address.postal_code);
        if (postCodesFound.includes(postCode)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
};

export { validateAddress };
