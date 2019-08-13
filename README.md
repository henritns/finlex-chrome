<!--
SPDX-FileCopyrightText: 2019 <henri@kelmu.org>

SPDX-License-Identifier: CC0-1.0
-->

# Finlex browser tweaks

A browser extension to tweak your Finlex experience. Not that serious, but open for contributions.

## Installation and use

You have to load this unpacked from source. In Chrome, for example, from `More tools > Extensions`, switch on `Developer mode`, then `Load unpacked` and select the source folder.

The extension has an Options page available through the menu button.

This should work on Firefox, too, but you'll have to figure out the installation yourself.

## Features

### Statute pages

- **Add links to Finlex versions of Government Proposals**: The link to the GP of the original statute `(he)` will be added to the header of the statute ToC (_Sisällysluettelo_). Links to subsequent proposals can be found under each relevant section next to the amending statute link (_linkki muutossäädöksen voimaantulotietoihin_).

- **Add statute link to Semanttinen Finlex**: Link to the whole statute in Semantic Finlex under Document Versions (_Dokumentin versiot_).

- **Add section links to Semanttinen Finlex**: Links `(sf)` to the relevant section in Semantic Finlex.

- **(Experimental)** Enable prepending any paragraph with a Finnish section reference, e.g., "_Velan vanhentumisesta annetun lain (728/2003) 5 §:n 1 momentin mukaan ..._" by clicking the `§` link.

### Other

- Redirect "Oikeuskäytäntö kirjallisuudessa" pages directly to the case text, if accessed through Google search. Just a personal preference.

## Licensing

All source code is distributed under the `MIT` license – everything else is `CC0-1.0` (e.g. icons, configuration). An effort was made to comply with the [REUSE](https://reuse.software/) Specification – Version 3.0.
