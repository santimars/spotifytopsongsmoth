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

const topTracksIds = [
  '0IVkP59yJ9GFF6B7IrvrxA','45sDAlchNqqkfyneNI7Gxj','5JeZZtqY0loM9UHQVIChby','0WDARMlKHcDBm1r0PGaFCI','6ZQgooEk8PvsLxedYaT6Oa'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
