 /*
  * © 2019 Henri Tanskanen
  * 
  * SPDX-License-Identifier: MIT
  */

chrome.runtime.onMessage.addListener((request, sender) => {
  chrome.tabs.update(sender.tab.id, { url: request.redirect })
})
