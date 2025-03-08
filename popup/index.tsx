import { useEffect, useState } from "react"

import { useTimeoutState } from "./utils"

import "./style.css"

const CookiesExtractor = () => {
  const [cookies, setCookies] = useState([])
  const [showCopied, setShowCopied] = useTimeoutState(false)
  const [showJsonCopied, setShowJsonCopied] = useTimeoutState(false)

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

  const copyCookiesAsJson = () => {
    const textarea = document.createElement("textarea")
    textarea.value = JSON.stringify(cookies, null, 2)
    textarea.setSelectionRange(0, textarea.value.length)
    textarea.style.visibility = "none"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    setShowJsonCopied(true, { timeout: 1500 })
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
  }, [])

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

        <div className="flex justify-around mt-2">
          <a
            href="https://cookies-extractor.chekun.me?utm_source=extension_popup"
            className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-indigo-600 border-2 border-indigo-500 rounded-lg shadow-2xl transition-all duration-300 ease-out hover:bg-indigo-600 hover:text-white">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
            <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-10 h-1/3"></span>
            <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-10"></span>
            <span className="absolute inset-0 w-full h-full rounded-lg border border-white opacity-10"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-indigo-500 opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              New Feature: Integration with your own page
            </span>
          </a>
        </div>

        <form
          action="#"
          className="mb-0 mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">
            Cookies of current page
          </p>

          <div style={{ maxHeight: "280px", overflow: "auto" }}>
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
        <div className="flex justify-around">
          <div>
            {cookies.length > 0 && !showCopied ? (
              <button
                className="block w-full rounded-lg mt-4 bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                onClick={copyCookies}>
                Copy as Header Cookie
              </button>
            ) : null}
            {showCopied ? (
              <button
                className="block w-full rounded-lg mt-4 bg-green-600 px-3 py-2 text-sm font-medium text-white"
                disabled>
                Header Cookie Copied
              </button>
            ) : null}
          </div>
          <div>
            {cookies.length > 0 && !showJsonCopied ? (
              <button
                className="block w-full rounded-lg mt-4 bg-blue-600 px-3 py-2 text-sm font-medium text-white"
                onClick={copyCookiesAsJson}>
                Copy as JSON Cookie
              </button>
            ) : null}
            {showJsonCopied ? (
              <button
                className="block w-full rounded-lg mt-4 bg-green-600 px-3 py-2 text-sm font-medium text-white"
                disabled>
                JSON Cookie Copied
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesExtractor
