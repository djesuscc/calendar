import { fetchNoToken, fetchToken } from '../../helpers/fetch';

describe('Test helper Fetch', () => {
  let token = '';

  test('fetch without token should work', async () => {
    const resp = await fetchNoToken('auth', {
      "email": "dan@correo.com",
      "password": "123456"
    }, 'POST');
    const body = await resp.json();
    expect(resp instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
    token = body.token;
  });


  test('fetch with token should work', async () => {
    localStorage.setItem('token', token);
    const resp = await fetchToken('auth/renew');
    const { ok } = await resp.json();
    expect(resp instanceof Response).toBe(true);
    expect(ok).toBe(true);
  });
  
})