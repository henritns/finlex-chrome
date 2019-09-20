/*
 * SPDX-FileCopyrightText: 2019 Henri Tanskanen <henri@kelmu.org>
 *
 * SPDX-License-Identifier: MIT
 */

// Some shared variables

const urlMatches = location.href.match(/(ajantasa|alkup)\/(\d{4})\/(\d{8})/)
const statuteYear = urlMatches[2]
const statutePaddedNumber = urlMatches[3].slice(-4)
const statuteNumber = statutePaddedNumber.replace(/^0+/, "")

chrome.storage.sync.get(
  {
    gpLinks: true,
    sfTopLink: true,
    sfSectionLinks: true,
    edTopLink: false,
    edSectionLinks: false,
    preQuote: false
  },
  opts => {
    if (opts.sfTopLink) sfTopLink()
    if (opts.edTopLink) edTopLink()
    if (opts.sfSectionLinks || opts.edSectionLinks) {
      sectionLinks(opts.sfSectionLinks, opts.edSectionLinks)
    }
    if (opts.gpLinks) gpLinks()
    if (opts.preQuote) preQuote()
  }
)

function gpLinks() {
  // Add links to Finlex Government Proposals
  const governmentProposals = $(
    "a.ulos[href*='eduskunta.fi/valtiopaivaasiat/he+']"
  )
  const firstGp = governmentProposals.first()
  const firstGpUrl = finlexGpUrl(firstGp.attr("href"))
  const firstGpText = firstGp.text()
  $("#toc-title > h3").append(
    `<sup><small> (<a href="${firstGpUrl}" title="${firstGpText}">he</a>)</small></sup>`
  )
  $("a.mvs:contains('/')").each(function() {
    spot = $(this)
    const id = $(this)
      .attr("href")
      .replace("#", "")
    const gp = $(
      "a.ulos",
      $(`span[id='${id}']`)
        .parent()
        .parent()
    )
    gp.each(function() {
      const eduskuntaGpUrl = $(this).attr("href")
      if (!eduskuntaGpUrl) return true // skips to next iteration
      const gpUrl = finlexGpUrl(eduskuntaGpUrl)
      const gpText = $(this).text()
      spot.after(
        `<sup><small> (<b><a href="${gpUrl}" title="${gpText}">he</a></b>)</small></sup>`
      )
    })
  })
}

function sfTopLink() {
  // Add link to Semanttinen Finlex to document version list at the top
  $("#version-links-header ul").append(
    `<li><span style="color: #888">§F</span> <a href="https://data.finlex.fi/eli/sd/${statuteYear}/${statuteNumber}/" title="Säädös Semanttisessa Finlexissä">Semanttinen Finlex</a></li>`
  )
}

function edTopLink() {
  // Add link to Semanttinen Finlex to document version list at the top
  $("#version-links-header ul").append(
    `<li><span style="color: #888">⬒</span> <a href="https://www.edilex.fi/lainsaadanto/${statuteYear}${statutePaddedNumber}" title="Säädös Edilexissä">Edilex</a></li>`
  )
}

function sectionLinks(optSf, optEd) {
  // Add links to Semanttinen Finlex and/or Edilex for each section (§)
  $("#laki-ajantasa > h5:not([class])").each(function() {
    const sectionId = $(this)
      .prev()
      .children()
      .first()
      .attr("id")
    if (!sectionId) return true // skips to next iteration
    const urls = sectionUrls(sectionId)
    if (urls && optSf) {
      sfLink = `<sup><small> (<b><a href="${urls.sf}" title="Lainkohta Semanttisessa Finlexissä">sf</a></b>)</small></sup>`
      $(this).append(sfLink)
    }
    if (urls && optEd) {
      edLink = `<sup><small> (<b><a href="${urls.ed}" title="Lainkohta Edilexissä">ed</a></b>)</small></sup>`
      $(this).append(edLink)
    }
  })
}

function preQuote() {
  // Create links after paragraphs to prepend paragraph with Finnish section reference,
  // e.g., "Velan vanhentumisesta annetun lain (728/2003) 5 §:n 1 momentin mukaan ..."
  $(".anchor-wrapper").each(function() {
    const id = $(this)
      .children(".anchor")
      .first()
      .attr("id")
    const sub = /(M|K)\d+$/.test(id)
    if (sub) {
      $(this)
        .next("p.py")
        .append(
          ` <span class="quote-function" title="${id}"><sup>§</sup></span>`
        )
    }
  })
  const statuteName = $("#document h3").text()
  let statuteGenitive = ""
  if (statuteName.includes("Laki")) {
    const end = statuteName.substring(5)
    const endUpper = end.charAt(0).toUpperCase() + end.slice(1)
    statuteGenitive = `${endUpper} annetun lain (${statuteNumber}/${statuteYear})`
  }
  if (/[\w-]+laki$/.test(statuteName)) {
    const genitive = statuteName.replace(/laki$/, "lain")
    statuteGenitive = `${genitive} (${statuteNumber}/${statuteYear})`
  }
  if (/[\w-]+asetus$/.test(statuteName)) {
    const genitive = statuteName.replace(/asetus$/, "asetuksen")
    statuteGenitive = `${genitive} (${statuteNumber}/${statuteYear})`
  }
  if (/[\w-]+kaari$/.test(statuteName)) {
    const genitive = statuteName.replace(/kaari$/, "kaaren")
    statuteGenitive = `${genitive} (${statuteNumber}/${statuteYear})`
  }
  $(".quote-function").on("click", function() {
    const sectionNatural = $(this)
      .attr("title")
      .replace(/L(\d+)/, "$1 luvun ")
      .replace(/P(\d+)/, "$1 §:n ")
      .replace(/M(\d+)/, "$1 momentin ")
      .replace(/K(\d+)/, "$1 kohdan ")
    const old = $(this)
      .parent()
      .html()
    const lowerCase = old.charAt(0).toLowerCase() + old.slice(1)
    $(this)
      .parent()
      .html(
        `<span class="prequote">${statuteGenitive} ${sectionNatural} mukaan </span>${lowerCase}`
      )
  })
}

// Helper functions

function finlexGpUrl(url) {
  const [number, year] = url.split("he+")[1].split("/")
  const paddedNumber = `0000${number}`.slice(-4)
  return `https://www.finlex.fi/fi/esitykset/he/${year}/${year}${paddedNumber}`
}

function sectionUrls(sectionId) {
  if (!urlMatches) {
    return null
  }
  const withChapters = sectionId.match(/L(\d+\w?)P(\d+\w?)$/)
  const sectionsOnly = sectionId.match(/^P(\d+\w?)$/)
  if (withChapters) {
    const chapt = withChapters[1]
    const sect = withChapters[2]
    return {
      sf: `https://data.finlex.fi/eli/sd/${statuteYear}/${statuteNumber}/luku/${chapt}/pykala/${sect}.html`,
      ed: `https://www.edilex.fi/lainsaadanto/${statuteYear}${statutePaddedNumber}#L${chapt}P${sect}`
    }
  }
  if (sectionsOnly) {
    const sect = sectionsOnly[1]
    return {
      sf: `https://data.finlex.fi/eli/sd/${statuteYear}/${statuteNumber}/pykala/${sect}.html`,
      ed: `https://www.edilex.fi/lainsaadanto/${statuteYear}${statutePaddedNumber}#P${sect}`
    }
  }
  return null
}
