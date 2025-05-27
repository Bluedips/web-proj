// /api/tmdb.js

export default async function handler(req, res) {
  const { personId } = req.query;
  const accessToken = process.env.TMDB_API_KEY; // Vercel 환경변수에 저장

  if (!personId) {
    res.status(400).json({ error: "personId required" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${personId}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      res.status(response.status).json(error);
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
