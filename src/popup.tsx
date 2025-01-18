import { useEffect, useState } from "react"

import { useTimeoutState } from "~utils"

import "./style.css"

const CookiesExtractor = () => {
  const [cookies, setCookies] = useState([])
  const [showCopied, setShowCopied] = useTimeoutState(false)

  const copyCookies = () => {
    const textarea = document.createElement("textarea")
    textarea.value = cookies.map((i) => `${i.name}=${i.value}`).join(";")
    textarea.setSelectionRange(0, textarea.value.length)
    textarea.style.visibility = "none"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    setShowCopied(true, { timeout: 1500 })
  }

  const fetchCookies = async () => {
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    const url = new URL(tab.url)
    const hostnames = url.hostname.split(".")
    let domain = ""
    if (hostnames.length >= 3) {
      domain =
        hostnames[hostnames.length - 2] + "." + hostnames[hostnames.length - 1]
    } else {
      domain = url.hostname
    }
    const cookies = await chrome.cookies.getAll({ domain })
    setCookies(cookies)
  }

  useEffect(() => {
    fetchCookies()
  })

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Cookies Extractor
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          A handy tool that helps you to extract website cookies.
          <br />
          Fully offline, your cookies are in your own hands.
        </p>

        <form
          action="#"
          className="mb-0 mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">
            Cookies of current page
          </p>

          <div style={{ height: "330px", overflow: "auto" }}>
            {cookies.map((it) => {
              return (
                <div key="it.name">
                  <label>{it.name}</label>
                  <input
                    className="w-full rounded-lg border-gray-100 p-1 mt-1 text-sm border-2"
                    value={it.value}
                    readOnly
                  />
                </div>
              )
            })}

            {cookies.length === 0 ? (
              <div
                role="alert"
                className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong className="block font-medium text-red-800 text-xl">
                  No cookies found!
                </strong>
              </div>
            ) : null}
          </div>
        </form>
        {cookies.length > 0 && !showCopied ? (
          <button
            className="block w-full rounded-lg mt-4 bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            onClick={copyCookies}>
            Copy as Http Header Cookie
          </button>
        ) : null}
        {showCopied ? (
          <button
            className="block w-full rounded-lg mt-4 bg-green-600 px-5 py-3 text-sm font-medium text-white"
            disabled>
            Http Header Cookie Copied
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default CookiesExtractor
