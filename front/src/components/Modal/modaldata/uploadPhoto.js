
export async function uploadPhoto(data, token) {
  const headers = new Headers();
  headers.append('Authorization', token);
  const body = new FormData();

  body.append('photo', data.photo[0]);

  return await fetch('http://localhost:8337/update/upload', { method: 'PUT', headers, body });
}
