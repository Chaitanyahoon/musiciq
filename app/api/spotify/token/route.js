export async function POST(request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return Response.json({ error: "Authorization code is required" }, { status: 400 })
    }

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error("Missing Spotify credentials")
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Use production URL
    const redirectUri = "https://musiciq.vercel.app/callback"

    console.log("Exchanging code for token...")

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }).toString(),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error("Spotify token error:", tokenData)
      return Response.json(
        {
          error: tokenData.error_description || tokenData.error || "Token exchange failed",
        },
        { status: 400 },
      )
    }

    console.log("Token exchange successful")
    return Response.json(tokenData)
  } catch (error) {
    console.error("Token exchange error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
