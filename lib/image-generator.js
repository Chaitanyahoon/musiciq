// Image generation for social sharing
// Image generation for social sharing
export const generateResultImage = async (resultData, userName) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size for social media (1200x630 for optimal sharing)
  canvas.width = 1200
  canvas.height = 630

  // Cyber-Noir Background (Deep Obsidian)
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, "#0a0a0c") // Deep Obsidian
  gradient.addColorStop(1, "#1a1a2e") // Dark Blue-Purple

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Add subtle neon glow blobs
  const drawBlob = (x, y, radius, color) => {
    const blobGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    blobGradient.addColorStop(0, color)
    blobGradient.addColorStop(1, "transparent")
    ctx.fillStyle = blobGradient
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }

  drawBlob(0, 0, 400, "rgba(139, 92, 246, 0.15)") // Purple top-left
  drawBlob(1200, 630, 500, "rgba(6, 182, 212, 0.15)") // Cyan bottom-right

  // Add grid pattern overlay
  ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
  for (let i = 0; i < canvas.width; i += 40) {
    ctx.fillRect(i, 0, 1, canvas.height)
  }
  for (let j = 0; j < canvas.height; j += 40) {
    ctx.fillRect(0, j, canvas.width, 1)
  }

  // Add MusicIQ branding
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 48px Arial"
  ctx.textAlign = "center"
  ctx.shadowColor = "rgba(139, 92, 246, 0.5)"
  ctx.shadowBlur = 20
  ctx.fillText("MusicIQ", canvas.width / 2, 80)
  ctx.shadowBlur = 0 // Reset shadow

  ctx.fillStyle = "#06b6d4" // Neon Cyan
  ctx.font = "bold 16px Arial"
  ctx.letterSpacing = "4px"
  ctx.fillText("NEURAL MUSIC INTELLIGENCE", canvas.width / 2, 110)

  // Add user name
  ctx.fillStyle = "#e2e8f0"
  ctx.font = "32px Arial"
  ctx.fillText(`${userName}'s Musical Assessment`, canvas.width / 2, 180)

  // Add main score circle
  const centerX = canvas.width / 2
  const centerY = 320
  const radius = 90

  // Score circle background
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
  ctx.fill()

  // Score circle border (Neon)
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = resultData.score >= 50 ? "#8b5cf6" : "#ec4899" // Violet or Pink
  ctx.lineWidth = 4
  ctx.shadowColor = resultData.score >= 50 ? "#8b5cf6" : "#ec4899"
  ctx.shadowBlur = 15
  ctx.stroke()
  ctx.shadowBlur = 0

  // Score text
  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 64px Arial"
  ctx.textAlign = "center"
  ctx.fillText(resultData.score, centerX, centerY + 20)

  // Title and classification
  ctx.fillStyle = resultData.score >= 50 ? "#8b5cf6" : "#ec4899"
  ctx.font = "bold 42px Arial"
  ctx.shadowColor = resultData.score >= 50 ? "rgba(139, 92, 246, 0.5)" : "rgba(236, 72, 153, 0.5)"
  ctx.shadowBlur = 10
  ctx.fillText(resultData.title, centerX, centerY + 140)
  ctx.shadowBlur = 0

  ctx.fillStyle = "#94a3b8"
  ctx.font = "24px Arial"
  ctx.fillText(resultData.classification, centerX, centerY + 180)

  // Add breakdown bars
  const breakdownY = 520
  const barWidth = 200
  const barHeight = 8
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
    ctx.shadowColor = ctx.fillStyle
    ctx.shadowBlur = 10
    ctx.fillRect(x, breakdownY, fillWidth, barHeight)
    ctx.shadowBlur = 0

    // Label
    ctx.fillStyle = "#94a3b8"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "left"
    ctx.fillText(key.toUpperCase(), x, breakdownY - 15)

    // Value
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "right"
    ctx.fillText(`${value}/10`, x + barWidth, breakdownY - 15)
  })

  // Add website URL
  ctx.fillStyle = "#475569"
  ctx.font = "16px Arial"
  ctx.textAlign = "center"
  ctx.fillText("Get your MusicIQ score at musiciq.ai", centerX, 600)

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
