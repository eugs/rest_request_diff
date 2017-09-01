var request = require('request-promise');
var diff = require('deep-diff').diff;

function sendRequestWithHeader(URI, method, header) {
  var options = {
    uri: URI,
    method: method,
    headers: header,
    resolveWithFullResponse: true //!!!!
  };

  return request(options).then(function (response) {
    // console.log("inner resp", response);
    return response;
  });
};

var URL = 'https://jsonplaceholder.typicode.com/users/';
var HEADER = {
  // 'Accept-Language': 'en_GB',
  // 'Client-ID': 'AEM',
  // 'User-Agent': 'chrome'
};

sendRequestWithHeader(URL, 'GET', HEADER).then(function (response) {
  // console.log("response:", response.headers);

  var statusCode = response.statusCode;
  var arr = JSON.parse(response.body);
  var type = response.headers['content-type'];

  console.log("headers", response.headers);
  console.log('length', arr.length);
  console.log("status code:", statusCode);
  console.log("type:", type);

  // Object.getOwnPropertyNames(string).forEach(
  //   function (val, idx, array) {
  //     console.log(val + ' -> ' + string[val]);
  //   }
  // );

  // var differencies = diff(JSON.stringify(person), response);
  //
  // if(differencies !== undefined) {
  //   var errMsg = 'The two JSON do not match!\n' + JSON.stringify(differencies, null, ' ');
  //   throw new Error (errMsg);
  // } else {
  //   console.log('JSON comparison succeed');
  // }

});
