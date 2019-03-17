 /*
  * © 2019 Henri Tanskanen
  * 
  * SPDX-License-Identifier: MIT
  */

if (/^https?:\/\/(www\.)?(google\.com|google\.fi)/.test(document.referrer)) {
  const elements = document.querySelectorAll("a")
  const link = [].filter.call(elements, element =>
    element.textContent.includes("Linkki ratkaisutekstiin")
  )
  if (link) {
    fokiId = location.href.split("tapaus/")[1]
    chrome.runtime.sendMessage({
      redirect: link[0].href + "?foki=" + fokiId
    })
  }
}
