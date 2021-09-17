const baseUrl = process.env.REACT_APP_API_URL;
const fetchNoToken = (path, data, method = 'GET') => {
  const url = `${baseUrl}/${path}`;
  if (method === 'GET') {
    return fetch(url);
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

const fetchToken = (path, data, method = 'GET') => {
  const url = `${baseUrl}/${path}`;
  const token = localStorage.getItem('token');

  if (method === 'GET') {
    return fetch(url, {
      headers: {
        'x-token': token
      }
    });
  }

  return fetch(url, {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-token': token
    },
    body: JSON.stringify(data)
  })
}

export {
  fetchNoToken,
  fetchToken,
}