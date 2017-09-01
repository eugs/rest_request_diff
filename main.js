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

  // console.log("headers", response.headers);
  console.log('length:', arr.length);
  console.log("status code:", statusCode);
  console.log("type:", type);

  assertEquals(200, statusCode, 'Status code is wrong')
  assertEquals('application/json; charset=utf-8', type, 'Wrong type')
  assertEquals(10, arr.length, 'Wrong array length')

});

function assertEquals(expected, actual, msg) {
  var differencies = diff(expected, actual);

  if(differencies !== undefined) {
    throw new Error (msg + '\n' + JSON.stringify(differencies, null, ' '));
  } else {
    console.log('assertion succeded:', actual);
  }

}
