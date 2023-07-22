// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDOyGjfTGgnksacoO8nUZpWJMflD3ic1yJyAlAIxzogCdhGrYiJPgK22LVa6gpbUKZoNzQ_ml3GBQVSl13ppc27BnD3Ck9ZxEhEi3Ho-zHlU6ddvYOXhd2R8mZ7dmLnWnc0apVAMu9fLWqkwLYXAdfic-9u9qePuoCVuYa_8firC9uvz46LQ7ac87gW5JpEF33xYO4B7h6NpGQTUtoj724N3FbNKv0qwxvbpV3nJJnXvLTnemV-t4veqC2I1Wa23nh5gNjrCtPDVg80sKdGFAqK';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:0IVkP59yJ9GFF6B7IrvrxA','spotify:track:1PV9UUMqvIFD5uMWyWer3T','spotify:track:45sDAlchNqqkfyneNI7Gxj','spotify:track:2pDKE8Q40TDGPl1O11DKKn','spotify:track:5JeZZtqY0loM9UHQVIChby','spotify:track:76cqRw0ed5YdOFaQhrwkxE','spotify:track:0WDARMlKHcDBm1r0PGaFCI','spotify:track:4Um1HwUfRGSJGVChlcWgmK','spotify:track:6ZQgooEk8PvsLxedYaT6Oa','spotify:track:4aCnN8VmKVqX4PnSB1Ie07'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
