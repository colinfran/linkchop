import nacl from "tweetnacl"
import { NextResponse } from "next/server"
import { banUserByEmail } from "@/db/tasks"

type DiscordOption = {
  name: string
  type: number
  value?: string
}

type DiscordInteraction = {
  type: number
  member?: {
    user?: {
      id?: string
    }
  }
  data?: {
    name?: string
    options?: DiscordOption[]
  }
}

const DISCORD_PING_TYPE = 1
const DISCORD_APPLICATION_COMMAND_TYPE = 2
const DISCORD_PONG_RESPONSE_TYPE = 1
const DISCORD_CHANNEL_MESSAGE_WITH_SOURCE_TYPE = 4
const DISCORD_EPHEMERAL_FLAG = 1 << 6

const textResponse = (content: string, ephemeral = true): NextResponse => {
  return NextResponse.json({
    type: DISCORD_CHANNEL_MESSAGE_WITH_SOURCE_TYPE,
    data: {
      content,
      flags: ephemeral ? DISCORD_EPHEMERAL_FLAG : 0,
    },
  })
}

const hexToUint8Array = (hex: string): Uint8Array => {
  return new Uint8Array(Buffer.from(hex, "hex"))
}

const verifyDiscordRequest = (
  body: string,
  signature: string,
  timestamp: string,
  publicKey: string,
): boolean => {
  const message = new Uint8Array(Buffer.from(timestamp + body))
  const sig = hexToUint8Array(signature)
  const key = hexToUint8Array(publicKey)
  return nacl.sign.detached.verify(message, sig, key)
}

const getOption = (interaction: DiscordInteraction, optionName: string): string => {
  const option = interaction.data?.options?.find((item) => item.name === optionName)
  return (option?.value || "").trim()
}

const isAllowedModerator = (interaction: DiscordInteraction): boolean => {
  const allowedUsers = (process.env.DISCORD_BAN_ALLOWED_USER_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  // Empty list means unrestricted by user id (still requires valid Discord signature)
  if (allowedUsers.length === 0) {
    return true
  }

  const actorId = interaction.member?.user?.id
  if (!actorId) {
    return false
  }

  return allowedUsers.includes(actorId)
}

export async function POST(request: Request): Promise<Response> {
  const signature = request.headers.get("x-signature-ed25519") || ""
  const timestamp = request.headers.get("x-signature-timestamp") || ""
  const discordPublicKey = process.env.DISCORD_PUBLIC_KEY || ""

  if (!discordPublicKey) {
    return NextResponse.json({ error: "Missing DISCORD_PUBLIC_KEY" }, { status: 500 })
  }

  if (!signature || !timestamp) {
    return NextResponse.json({ error: "Missing Discord signature headers" }, { status: 401 })
  }

  const rawBody = await request.text()

  const validRequest = verifyDiscordRequest(rawBody, signature, timestamp, discordPublicKey)
  if (!validRequest) {
    return NextResponse.json({ error: "Invalid Discord signature" }, { status: 401 })
  }

  const interaction = JSON.parse(rawBody) as DiscordInteraction

  if (interaction.type === DISCORD_PING_TYPE) {
    return NextResponse.json({ type: DISCORD_PONG_RESPONSE_TYPE })
  }

  if (interaction.type !== DISCORD_APPLICATION_COMMAND_TYPE) {
    return textResponse("Unsupported interaction type.")
  }

  const commandName = interaction.data?.name || ""
  if (commandName !== "banuser" && commandName !== "ban") {
    return textResponse("Unsupported command.")
  }

  if (!isAllowedModerator(interaction)) {
    return textResponse("You are not allowed to run this command.")
  }

  const email = getOption(interaction, "email")
  if (!email) {
    return textResponse("Please provide an email. Example: /banuser email:user@example.com")
  }

  const banResult = await banUserByEmail(email)

  if (!banResult.success) {
    return textResponse(`Ban failed: ${banResult.message}`)
  }

  return textResponse(`Success: ${banResult.message}`)
}
