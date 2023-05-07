import React from 'react';
export async function getData(accessToken,url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
  });
  const reader = response.body.getReader();
  let data = '';
  await reader.read().then(function processResult(result) {
    if (result.done) {
      return;
    }
    data += new TextDecoder('utf-8').decode(result.value);
    return reader.read().then(processResult);
  });
  return  JSON.parse(data);
}
