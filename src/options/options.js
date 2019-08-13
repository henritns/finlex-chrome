/*
 * SPDX-FileCopyrightText: 2019 Henri Tanskanen <henri@kelmu.org>
 *
 * SPDX-License-Identifier: MIT
 */

function save_options() {
  chrome.storage.sync.set(
    {
      gpLinks: document.getElementById("gpLinks").checked,
      sfTopLink: document.getElementById("sfTopLink").checked,
      sfSectionLinks: document.getElementById("sfSectionLinks").checked,
      preQuote: document.getElementById("preQuote").checked,
      fokiRedirect: document.getElementById("fokiRedirect").checked
    },
    function() {
      var status = document.getElementById("status")
      status.textContent = "Options saved."
      setTimeout(function() {
        status.textContent = ""
      }, 750)
    }
  )
}

function restore_options() {
  chrome.storage.sync.get(
    {
      gpLinks: true,
      sfTopLink: true,
      sfSectionLinks: true,
      preQuote: false,
      fokiRedirect: false
    },
    function(items) {
      document.getElementById("gpLinks").checked = items.gpLinks
      document.getElementById("sfTopLink").checked = items.sfTopLink
      document.getElementById("sfSectionLinks").checked = items.sfSectionLinks
      document.getElementById("preQuote").checked = items.preQuote
      document.getElementById("fokiRedirect").checked = items.fokiRedirect
    }
  )
}

document.addEventListener("DOMContentLoaded", restore_options)
document.getElementById("save").addEventListener("click", save_options)
