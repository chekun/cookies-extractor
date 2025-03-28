# Cookies Extractor

Cookies Extractor 是一个简单而强大的 Chrome 扩展程序，旨在帮助开发者轻松提取和导出任何网站的 cookies。

## 主要功能

- **一键提取 cookies**：只需点击一下，即可提取当前网站的 cookies。
- **直观的用户界面**：更新后的 UI 让您可以直观地查看当前页面的 cookies 数据。
- **一键复制**：轻松复制 cookies 数据，方便在调试和测试中使用。
- **与测试页面集成**：新功能允许您将 Cookies Extractor 与您的测试页面集成，提供更多便利。

## 安装

1. 访问 [Chrome Web Store](https://chromewebstore.google.com/detail/cookies-extractor/gdbmkehljhmfcjgbjcfaklnabeccddna)。
2. 点击 "Add to Chrome" 按钮安装扩展程序。
3. 安装完成后，您将在 Chrome 工具栏中看到 Cookies Extractor 的图标。

## 使用方法

1. 打开您想要提取 cookies 的网站。
2. 点击 Chrome 工具栏中的 Cookies Extractor 图标。
3. 在弹出的窗口中，您将看到当前页面的 cookies 列表。
4. 您可以点击 "Copy" 按钮一键复制 cookies 数据。

## 集成到您的项目中

Cookies Extractor 还提供了与您的网站或测试页面集成的功能。您可以使用以下代码示例来获取指定域名的 cookies：

> Cookies Extractor 插件不会对外部网站发送任何数据，您可以点访问[@plasmohq/messaging的文档](https://docs.plasmo.com/framework/messaging)了解技术细节。

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

## 隐私和安全

- 该扩展程序不收集或使用您的任何数据，确保您的隐私安全。
- Cookies Extractor 是一个免费且安全的工具，您可以放心使用。

## 联系方式

如果您有任何问题或建议，请访问 [Cookies Extractor 官方网站](https://cookies-extractor.chekun.me/) 或通过 Chrome Web Store 上的开发者联系方式与我们联系。