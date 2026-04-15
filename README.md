# UEFA Einjahreswertung Studio

Interaktive Website für offene K.o.-Duelle in UCL, UEL und UECL mit Einzelspiel-Bewertung (Hinspiel / Rückspiel) und Live-Tabelle.

## Start

1. index.html im Browser öffnen.
2. Pro Duell erst Spielresultate setzen (Hinspiel, Rückspiel).
3. Danach "Qualifiziert" wählen, damit der K.o.-Baum weitergerechnet wird.
4. Tabelle aktualisiert sich sofort.

## Datenstand

- Saison: 2025/26
- Stand: 15.04.2026
- Bereits abgeschlossene Duelle sind in den Basispunkten enthalten.
- Offene Duelle sind einzeln über Spiele modelliert.

## Punkte

Pro Wettbewerb (in data.js unter competitions[].rules):

- matchPoints.win: Punkte für einen Sieg im Einzelspiel
- matchPoints.draw: Punkte für ein Remis im Einzelspiel
- roundReachBonus.qf: Bonus für Erreichen des Halbfinales
- roundReachBonus.sf: Bonus für Erreichen des Finales

Die Unterschiede zwischen UCL, UEL und UECL liegen in den Bonuspunkten.

## Datenmodell

In data.js:

- associations: Starterzahl und Basispunkte je Verband
- teams: Team -> Verband
- competitions[].rounds[].ties: Duelle im K.o.-Baum
- ties[].legs: Einzelspiele (Hinspiel, Rückspiel, Finalspiel)

## Weiterführung in spätere Runden

Ein Teamplatz kann aus einem vorherigen Duell kommen:

- homeFrom: "tie-id"
- awayFrom: "tie-id"

Beispiel: Ein Team im Halbfinale wird aus dem Qualifizierten von uel-qf-1 übernommen.
