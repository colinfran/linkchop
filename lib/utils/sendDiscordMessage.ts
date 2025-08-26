export const sendDiscordNotification = async (newUrl: string): Promise<void> => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL // keep it secret in .env.local

  if (!webhookUrl) {
    console.error("❌ Missing DISCORD_WEBHOOK_URL env variable")
    return
  }

  const payload = {
    content: `🔗 New URL added: ${newUrl}`,
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("❌ Discord webhook error:", res.status, await res.text())
    } else {
      console.log("✅ Notification sent to Discord!")
    }
  } catch (err) {
    console.error("❌ Failed to send Discord notification:", err)
  }
}
