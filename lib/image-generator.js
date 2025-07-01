// Image generation for social sharing
export const generateResultImage = async (resultData, userName) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size for social media (1200x630 for optimal sharing)
  canvas.width = 1200
  canvas.height = 630

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  if (resultData.score >= 70) {
    gradient.addColorStop(0, "#1e3a8a") // blue-800
    gradient.addColorStop(1, "#312e81") // indigo-800
  } else if (resultData.score >= 50) {
    gradient.addColorStop(0, "#374151") // gray-700
    gradient.addColorStop(1, "#1f2937") // gray-800
  } else {
    gradient.addColorStop(0, "#7f1d1d") // red-900
    gradient.addColorStop(1, "#450a0a") // red-950
  }

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add subtle pattern overlay
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
  for (let i = 0; i < canvas.width; i += 40) {
    for (let j = 0; j < canvas.height; j += 40) {
      if ((i + j) % 80 === 0) {
        ctx.fillRect(i, j, 20, 20)
      }
    }
  }

  // Add MusicIQ branding
  ctx.fillStyle = "#60a5fa"
  ctx.font = "bold 48px Arial"
  ctx.textAlign = "center"
  ctx.fillText("MusicIQ", canvas.width / 2, 80)

  ctx.fillStyle = "#9ca3af"
  ctx.font = "20px Arial"
  ctx.fillText("NEURAL MUSIC INTELLIGENCE", canvas.width / 2, 110)

  // Add user name
  ctx.fillStyle = "#ffffff"
  ctx.font = "32px Arial"
  ctx.fillText(`${userName}'s Musical Assessment`, canvas.width / 2, 180)

  // Add main score circle
  const centerX = canvas.width / 2
  const centerY = 320
  const radius = 80

  // Score circle background
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
  ctx.fill()

  // Score circle border
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = resultData.score >= 50 ? "#60a5fa" : "#f87171"
  ctx.lineWidth = 6
  ctx.stroke()

  // Score text
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 48px Arial"
  ctx.textAlign = "center"
  ctx.fillText(resultData.score, centerX, centerY + 15)

  // Title and classification
  ctx.fillStyle = resultData.score >= 50 ? "#60a5fa" : "#f87171"
  ctx.font = "bold 36px Arial"
  ctx.fillText(resultData.title, centerX, centerY + 120)

  ctx.fillStyle = "#d1d5db"
  ctx.font = "24px Arial"
  ctx.fillText(resultData.classification, centerX, centerY + 155)

  // Add breakdown bars
  const breakdownY = 480
  const barWidth = 200
  const barHeight = 20
  const barSpacing = 250

  const breakdownEntries = Object.entries(resultData.breakdown)
  const startX = (canvas.width - (breakdownEntries.length * barSpacing - 50)) / 2

  breakdownEntries.forEach(([key, value], index) => {
    const x = startX + index * barSpacing

    // Bar background
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    ctx.fillRect(x, breakdownY, barWidth, barHeight)

    // Bar fill
    const fillWidth = (value / 10) * barWidth
    ctx.fillStyle = value >= 7 ? "#10b981" : value >= 4 ? "#f59e0b" : "#ef4444"
    ctx.fillRect(x, breakdownY, fillWidth, barHeight)

    // Label
    ctx.fillStyle = "#ffffff"
    ctx.font = "16px Arial"
    ctx.textAlign = "left"
    ctx.fillText(key.charAt(0).toUpperCase() + key.slice(1), x, breakdownY - 8)

    // Value
    ctx.textAlign = "right"
    ctx.fillText(`${value}/10`, x + barWidth, breakdownY - 8)
  })

  // Add website URL
  ctx.fillStyle = "#6b7280"
  ctx.font = "18px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Get your MusicIQ score at musiciq.ai", centerX, 580)

  return canvas.toDataURL("image/png")
}

export const downloadImage = (dataUrl, fileName) => {
  const link = document.createElement("a")
  link.download = fileName
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const shareToSocialMedia = async (platform, imageDataUrl, resultData, userName) => {
  switch (platform) {
    case "download":
      downloadImage(imageDataUrl, `${userName.replace(/\s+/g, "_")}_MusicIQ_Result.png`)
      break

    case "copy":
      try {
        // Convert data URL to blob
        const response = await fetch(imageDataUrl)
        const blob = await response.blob()

        // Copy to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ])

        alert("Image copied to clipboard! You can now paste it anywhere.")
      } catch (err) {
        // Fallback: copy text
        const text = `I scored ${resultData.score}% on MusicIQ! I'm a ${resultData.title} 🎵 #MusicIQ`
        await navigator.clipboard.writeText(text)
        alert("Text copied to clipboard!")
      }
      break

    case "twitter":
      // Open Twitter with text (image needs to be uploaded separately)
      const twitterText = `I just got my MusicIQ score: ${resultData.score}% - ${resultData.title}! 🎵 Get yours at musiciq.ai #MusicIQ`
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, "_blank")
      // Also download image for manual upload
      downloadImage(imageDataUrl, `${userName.replace(/\s+/g, "_")}_MusicIQ_Twitter.png`)
      break

    case "instagram":
      // Download image for Instagram stories
      downloadImage(imageDataUrl, `${userName.replace(/\s+/g, "_")}_MusicIQ_Instagram.png`)
      alert("Image downloaded! Upload it to your Instagram story and tag @musiciq.ai")
      break

    case "facebook":
      // Open Facebook with text
      const fbText = `I scored ${resultData.score}% on MusicIQ - ${resultData.title}! Check out your musical intelligence at musiciq.ai`
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(fbText)}`,
        "_blank",
      )
      downloadImage(imageDataUrl, `${userName.replace(/\s+/g, "_")}_MusicIQ_Facebook.png`)
      break
  }
}
