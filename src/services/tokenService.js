export default async function getToken(utoken, userId, role, roomId) {
  const response = await fetch("/.netlify/functions/token", {
    method: "POST",
    headers: { Authorization: `Bearer ${utoken}` },
    //TODO remove env
    body: JSON.stringify({
      role: role,
      room_id: roomId,
      user_id: userId,
    }),
  });

  const { token } = await response.json();

  return token;
}
