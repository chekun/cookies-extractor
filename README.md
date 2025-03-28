# Cookies Extractor

Cookies Extractor is a simple yet powerful Chrome extension designed to help developers easily extract and export cookies from any website.

## Main Features

- **One-click Cookie Extraction**: Extract cookies from the current website with just a single click.
- **Intuitive User Interface**: The updated UI allows you to visually inspect cookies data from the current page.
- **One-click Copy**: Easily copy cookies data for use in debugging and testing.
- **Integration with Test Pages**: New feature allows you to integrate Cookies Extractor with your test pages, providing more convenience.

## Installation

1. Visit the [Chrome Web Store](https://chromewebstore.google.com/detail/cookies-extractor/gdbmkehljhmfcjgbjcfaklnabeccddna).
2. Click the "Add to Chrome" button to install the extension.
3. Once installed, you'll see the Cookies Extractor icon in your Chrome toolbar.

## How to Use

1. Open the website from which you want to extract cookies.
2. Click on the Cookies Extractor icon in the Chrome toolbar.
3. In the popup window, you'll see a list of cookies for the current page.
4. You can click the "Copy" button to copy the cookies data with one click.

## Integrate into Your Project

Cookies Extractor also provides functionality to integrate with your website or test pages. You can use the following code example to get cookies from a specific domain:

> Cookies Extractor plugin does not send any data to external servers. You can visit the [@plasmohq/messaging documentation](https://docs.plasmo.com/framework/messaging) to understand the technical details.

```javascript
import { sendToBackgroundViaRelay } from '@plasmohq/messaging'

function DemoComponent() {
  const getCookies = async () => {
    const cookies = await sendToBackgroundViaRelay({
      name: 'cookies-extractor',
      body: {
        domain: 'domain-you-want-to-get-cookies-from.com',
        format: 'http-header' // or 'json'
      }
    })
    console.log(cookies) // use it as you wish
  }

  return (
    <>
      <button onClick={getCookies}>Get Cookies</button>
    </>
  );
}
```

## Privacy and Security

- This extension does not collect or use any of your data, ensuring your privacy and security.
- Cookies Extractor is a free and safe tool that you can use with confidence.

## Contact

If you have any questions or suggestions, please visit the [Cookies Extractor official website](https://cookies-extractor.chekun.me/) or contact us through the developer contact information on the Chrome Web Store.