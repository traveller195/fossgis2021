# WebApp
## WebApp mit Framework7

Verwendet wurde `Framework7 Core (Version 5)`. Siehe in den Docs (Version 5) https://v5.framework7.io/docs/

Projektlaufzeit: circa Dezember 2019 bis Sommer 2021.

## Aufbau der WebApp
### Einstiegspunkte
* `assets/index.html` Einstiegspunkt der WebApp. Beinhaltet auch `Main View` sowie `Left Panel` (Menü). Verschiedene .js und .css werden geladen.
* `src/js/index.js` Einstiegspunkt für `webpack` Build. Von hier aus wird mit `webpack` der JavaScript wie auch der CSS Code jeweils gebündelt.
### reiner JavaScript Code
* `src/js/app_framework7.js` Zentrale JavaScript Datei für die WebApp (beinhaltet u. a. `app`, `mainView`, `$$ = Dom7`, Import der `routes.js`, ...) und für OpenLayers Code (gegebenfalls globale JS Funktionen mit `window.` um Zugriff von außerhalb zu realisieren). Das `theme` der App wurde auf `aurora` gesetzt.
* `src/js/routes.js` Router für interne Navigation der App. Zunächst alle `Pages` importieren. Danach Pfade und weitere Optionen setzen.
### CSS
* `src/css/main.css` Eigene CSS Regeln deklariert. Sowie Import von `ol.css` und `my_app.css`
* `src/css/my_app.css` Von Framework7 aus den Docs kopierter CSS Code. Eigene Anpassungen. 
###  Pages 
Dateiformat: `.f7.html`, enthalten ebenfalls JavaScript Code. Eine `Page` wird jeweils in die `Main View` geladen.
Es handelt sich um sog. `Single File Component` bzw. `Router Component`. Siehe: https://v5.framework7.io/docs/router-component.html#single-file-component
* `src/pages/home.f7.html` 

Ist die wichtigste `Page` mit den meisten Funktionen. Sie stellt mit `<div id="map" class="map map-main"></div>` den div-Container für die openlayers-Karte bereit.
Über dynamische HTML-Generierung mittels `{{#js_if "this.route_state == 'on'"}} ... some HTML ... {{/js_if}}` werden HTML-Elemnte ein- oder ausgeblendet, abhängig davon, ob gerade eine Route (Spaziergang) aktiv ist oder nicht. Die `appbar` beschreibt die Navigationsleiste oben. Mit einer `toolbar` / `tabbar` und einem `swiper` (von https://swiperjs.com/) wird die Navigation unten für die aktive Route realisiert. Die Inhalte einer Station werden in einem `sheet-modal` dargestellt. Für die ausklappbaren Kategorien pro Station wird ein sog. `accordion` verwendet.

* `src/pages/routes_list.f7.html`

Zeigt Liste aller Routen / Spaziergänge, um von dort Starten zu können. 
Die Liste wird mit `{{#each tours}} ... some HTML ... {{/each}}` dynamisch aus dem Importierten JSON-Array erzeugt.

* `src/pages/settings.f7.html`

Mit `toggle` werden verschiedene Einstellungen realisiert. Im PageEvent `pageMounted` werden die entsprechenden Werte aus dem `LocalStorage` gelesen und als aktueller Stand dargestellt. Bei `pageBeforeOut` werden die - eventuell veränderten Einstellungen - wieder in den `LocalStorage` geschrieben und die Karte mit der Funktion `updateMap` geupdatet.

* `src/pages/help.f7.html`
* `src/pages/impressum.f7.html`
* `src/pages/about.f7.html`
* `src/pages/404.f7.html` wird gezeigt, wenn internes Routing auf eine `page` fehlschlägt.

## Aufbau / Datenhaltung eines Spazierganges

Aktuell erfolgt die Datenhaltung der einzelnen Spaziergänge im JSON-Format in separaten Dateien.
Im Ordner `assets/json` wird jedem Spaziergang ein nummerierter Ordner in aufsteigender Reihenfolge erstellt.
In der sich darin befindenden JSON Datei `route_stations.json` finden sich alle relevanten Informationen.
Neben Metadaten zum Beispiel die Liniengeometrie, Stationen mit Informationen und Punktgeometrien.
Es wurden spezielle - dem Zweck entsprechende - JSON Strukturen eingeführt, um zum Beispiel den als Tabelle gelayouteten Steckbrief einer essbaren Pflanze / Gehölz direkt in einem maschinenlesbaren Array zu sichern. In der Punktgeometrie `point` sollten neben der Koordinate unbedingt eine aufsteigende ID `order` sowie das `type` Attribut vorhanden sein. Letzteres definiert, ob das Icon für ein essbares Gehölz (Apfel Icon) oder für einen POI (Auge Icon) dargestellt wird. Alle Elemente im Array `content` werden in einem ausklappbaren `Accordion` untergebracht. Der `title_short` wird als Name für die jeweilige Slide im `Swiper` gebraucht. Falls es kein extra Foto gibt (wenn ja, sollte die Nummer der Station erhalten. Kleiner 10 mit führender Null), dann muss `image_path` = `no` sein.

Aktuell wird noch zusammendfassend eine `xxxx_list_touren.json` gebraucht, welche die Metadaten für die Liste der Spaziergänge redundant speichert. 

Für dieses Repo wurden die originalen Daten entfernt und durch zufällige Test-Daten ersetzt.


## Hintergrund zum Projekt

siehe https://essbarer-stadtteil.de/

## Studium

Im Rahmen eines sogenannten `Projektstudiums` an der HTW Dresden im Master-Studiengang `Geoinformatik / Management`

siehe https://www.htw-dresden.de/hochschule/fakultaeten/geoinformation


# Projektverzeichnis

Das Template enthält derzeit folgende Ordnerstruktur:

* `assets/`
* `src/`
* `.browserslistrc`
* `.editorconfig`
* `.eslintignore`
* `.eslintrc.json`
* `.gitignore`
* `.gitlab-ci.yml`
* `CONTRIBUTERS.md`
* `LICENSE`
* `package.json`
* `package-lock.json`
* `README.md`
* `webpack.config.js`

Das Verzeichnis `assets/` enthält statische Inhalte, die beim "Bauen" der Anwendung nicht weiterverarbeitet werden müssen. Der eigentliche Quellcode dieses Projekts ist im Verzeichnis `src/` hinterlegt.


## Module Bundler "Webpack" (`webpack.config.js`)

Nach dem Starten des Entwicklungsservers können Sie der Kommandozeilenausgabe bereits entnehmen, dass eine Komponente namens "Webpack" an diesem "Build"-Prozess beteiligt ist. Webpack wird als statischer Module Bundler bezeichnet. Es handelt sich um ein Tool, das beliebige Dateien sammelt, nach vorgegebenen Vorschriften verarbeitet und schließlich in beliebiger Form gebündelt ausgibt. Diese allgemein gehaltene Beschreibung lässt bereits erahnen, dass das Tool vielseitig einsetzbar ist. Selbst die Konfiguration kann dynamisch in Form von JavaScript-Dateien erfolgen (s. `webpack.config.js`). Durch eine große Anzahl unabhängig entwickelter Plugins, lässt sich der Webpack-Funktionsumfang jederzeit erweitern.

In diesem Projekt übernimmt der Bundler beim Ausführen des NPM-Skripts `start` folgende Schritte:

* Erstelle den temporären Ordner `dist/` im Projektverzeichnis.
* Leere den Ordner `dist/`.
* Kopiere alle statischen "Assets" in den Distributionsordner.
* Sammle ausgehend von der Datei `src/js/index.js` alle importierten JavaScript-Module der Anwendung und löse die dabei bestehenden Abhängigkeiten in eine eindeutige Reihenfolge auf.
* Übersetzt den ES6-Code in eine für die anvisierten Browser-Plattformen verständliche Syntax (derzeit zumeist ECMAScript 5.1) (umgesetzt durch das Webpack-Plugin `babel-loader`).
* Verpacke den JavaScript-Quellcode der Anwendung in eine Datei `dist/js/bundle.js`.
* Sammle alle CSS-Imports im JS-Quellcode (bspw. `import 'main.css'`) und kombiniere diese in eine Datei `dist/css/bundle.css`. (umgesetzt durch die Plugins `css-loader` und `MiniCssExtractPlugin`).
* Starte den Entwicklungsserver im Verzeichnis `dist/`.

Das "fertige" Bundle wird durch die Startseite `assets/index.html` der Webanwendung referenziert. Bei jeder Änderung des Quellcodes werden die erforderlichen Schritte wiederholt und die Anwendung im Browser neu geladen.

Soll schließlich eine Produktions-Version der Anwendung per Kommando `build` erstellt werden, entfällt das Starten des Entwicklungsservers. Zusätzlich wird der Quellcode per [Tree-Shaking-Methodik](https://webpack.js.org/guides/tree-shaking/) optimiert und [minifiziert](https://en.wikipedia.org/wiki/Minification_(programming)). Das Ergebnis ist eine statische Web-Anwendung die direkt auf einen Webserver kopiert werden könnte.

Der Übersetzungsvorgang, von „modernem“ JavaScript hin zu einer weithin unterstützten, älteren Sprachversion, wird im allgemeinen als "transpilieren" bezeichnet. Auch der Begriff "kompilieren" wird genutzt, auch wenn dieser aus technischer Sicht nicht vollkommen korrekt angewandt wird.

* [Webpack-Dokumentation](https://webpack.js.org/concepts/)
* [Übersicht zu Webpack-Plugins](https://webpack.js.org/plugins/)
* [Übersicht zu Webpack-Loadern](https://webpack.js.org/loaders/)


Für dieses Projekt wurden Anpassungen in der `webpack.config.js` vorgenommen. Dies wurde notwending, um den Code der framework7 WebApp inklusive der `Router Components` im Dateiformat `.f7.html` korrekt bündeln  zu können. 