import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MusicIQ - AI-Powered Music Taste Analysis",
  description:
    "Advanced AI analysis of your Spotify listening habits and musical preferences using machine learning algorithms.",
  keywords: ["AI", "music analysis", "spotify", "machine learning", "music intelligence"],
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
