/*
 * SPDX-FileCopyrightText: 2019 Henri Tanskanen <henri@kelmu.org>
 *
 * SPDX-License-Identifier: MIT
 */

const foki = location.href.match(/foki=(\d+)/)
if (foki) {
  chrome.storage.sync.get(
    {
      fokiRedirect: false
    },
    opts => {
      if (opts.fokiRedirect) {
        const versionList = document.querySelector("#version-links-header ul")
        versionList.insertAdjacentHTML(
          "beforeend",
          `<li><a href="https://www.finlex.fi/fi/oikeus/foki/tapaus/${
            foki[1]
          }">Ratkaisu kirjallisuudessa</a></li>`
        )
      }
    }
  )
}
