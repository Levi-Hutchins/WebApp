// // const axios = require('axios');
// // const params = {
// //   access_key: '6d66b0ff28b0b391e607aac56f2bce71',
// //   query: '722 the road '
// // }

// // axios.get('https://api.positionstack.com/v1/forward', {params})
// //   .then(response => {
// //     console.log(response.data);
// //   }).catch(error => {
// //     console.log(error);
// //   });

// // const formData = require('form-data');
// // const Mailgun = require('mailgun.js');
// // const mailgun = new Mailgun(formData);
// // const mg = mailgun.client({username: 'api', key: "54bd737fda6749b8b045bccf6970dae6-777a617d-579a69d8"});
  
// //   mg.messages.create('sandbox-123.mailgun.org', {
// //   	from: "Excited User <mailgun@sandbox28a78a074c564bcaaa49708b2a973641.mailgun.org>",
// //   	to: ["ofingy101@gmail.com"],
// //   	subject: "Hello",
// //   	text: "Testing some Mailgun awesomeness!",
// //   	html: "<h1>Testing some Mailgun awesomeness!</h1>"
// //   })
// //   .then(msg => console.log(msg)) // logs response data
// //   .catch(err => console.log(err)); // logs any error

// require('dotenv').config()

// const validateAddress = (address, postCode) => {
//     const axios = require('axios');
//     const params = {
//       access_key: process.env.APIKEY,
//       query: address
//     }
  
//     axios.get('https://api.positionstack.com/v1/forward', {params})
//       .then(response => {

//         if(response.data.data){
//             const addressesFound = response.data.data


//             postCodesFound = addressesFound.map(address => address.postal_code)
//             if(postCodesFound.includes(postCode)){
//                 return true
//             }

//         }
//       }).catch(error => {
//         return false;
//         console.log(error);
//       });
  
//   }
//   validateAddress("722 the entrance road", "2261").then(isFound => {
//     if (isFound) {
//       console.log("found");
//     } else {
//       console.log("not found");
//     }
//   });