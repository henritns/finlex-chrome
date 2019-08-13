/*
 * SPDX-FileCopyrightText: 2019 Henri Tanskanen <henri@kelmu.org>
 *
 * SPDX-License-Identifier: MIT
 */

chrome.runtime.onMessage.addListener((request, sender) => {
  chrome.tabs.update(sender.tab.id, { url: request.redirect })
})
