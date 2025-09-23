
// Your Google Safe Browsing API key in .env
const GOOGLE_SAFE_BROWSING_KEY = process.env.GOOGLE_SAFE_BROWSING_KEY!;
const GOOGLE_API = "https://safebrowsing.googleapis.com/v4/threatMatches:find";

export async function isSpamUrl(url: string): Promise<boolean> {
  if (!url) throw new Error("No URL provided");

  const body = {
    client: { clientId: "nextjs-url-shortener", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION",
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  const res = await fetch(`${GOOGLE_API}?key=${GOOGLE_SAFE_BROWSING_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return !!data.matches;
}
