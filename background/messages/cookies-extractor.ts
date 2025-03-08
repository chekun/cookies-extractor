import type { PlasmoMessaging } from "@plasmohq/messaging"

const getCookies = async (domain: string, format: string = "http-header") => {
  const cookies = await chrome.cookies.getAll({
    domain
  })
  if (format === "http-header") {
    return cookies.map((i) => `${i.name}=${i.value}`).join(";")
  } else if (format === "json") {
    return JSON.stringify(cookies)
  }
  throw new Error("Unsupported format")
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if (req.body.domain.trim() !== "") {
    return res.send(
      await getCookies(req.body.domain, req.body.format || "http-header")
    )
  }
  throw new Error("Unsupported request")
}

export default handler
