var request = require('request-promise');
var diff = require('deep-diff').diff;

var URL = 'https://jsonplaceholder.typicode.com/users/';

// TEST

  sendRequestWithHeader(URL, 'GET', {}).then(function (response) {
    console.log('\nCheck status code');
      var statusCode = response.statusCode;
      assertEquals(2004, statusCode, 'Status code is wrong')
  });

  sendRequestWithHeader(URL, 'GET', {}).then(function (response) {
    console.log('\nCheck type');
    var type = response.headers['content-type'];
    assertEquals('application/json; charset=utf-8', type, 'Wrong type')
  });

  sendRequestWithHeader(URL, 'GET', {}).then(function (response) {
    console.log('\nCheck length');
    var arr = JSON.parse(response.body);
    assertEquals(10, arr.length, 'Wrong array length')
  });


// FUNCTIONS

function assertEquals(expected, actual, msg) {
  var differencies = diff(expected, actual);

  if(differencies !== undefined) {
    throw new Error (msg + '\n' + JSON.stringify(differencies, null, ' '));
  } else {
    console.log('assertion succeded:', actual);
  }
}

function sendRequestWithHeader(URI, method, header) {
  
  var options = {
      uri: URI,
      method: method,
      headers: header,
      resolveWithFullResponse: true //!!!!
  };

  return request(options).then(function (response) {
    return response;
  });
};
