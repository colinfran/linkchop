export const sendDiscordNotification = async (
  newUrl: string,
  userEmail: string = "anonymous",
): Promise<void> => {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const channelId = process.env.DISCORD_BAN_CHANNEL_ID || process.env.DISCORD_CHANNEL_ID

  if (!botToken || !channelId) {
    console.error("❌ Missing DISCORD_BOT_TOKEN or DISCORD_CHANNEL_ID env variable")
    return
  }

  const payload = {
    content: `🔗 New URL added by ${userEmail}: <${newUrl}>`,
  }

  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${botToken}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      console.error("❌ Discord bot API error:", res.status, await res.text())
    } else {
      console.log("✅ Notification sent to Discord bot channel")
    }
  } catch (err) {
    console.error("❌ Failed to send Discord bot notification:", err)
  }
}
