import type { PlasmoCSConfig } from "plasmo"

import { relayMessage } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["*://*/*"]
}

relayMessage({
  name: "cookies-extractor"
})

const runtimeId = chrome.runtime.id

window.addEventListener("load", () => {
  const el = document.getElementById("__ce_retriever__")
  el && el.setAttribute("data-runtime-id", runtimeId)
})
