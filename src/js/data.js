const UEFA_DATA = {
  seasonLabel: "UEFA Saison 2025/26",
  dataStand: "Stand: 16.04.2026, 23:43 Uhr",
  methodologyNote:
    "Offene Duelle werden als Einzelspiele bewertet: Hinspiel und Rückspiel geben separat Punkte (Sieg/Remis).",
  associations: {
    England: { starters: 9, basePoints: 26.569 },
    Italy: { starters: 7, basePoints: 19.0 },
    Spain: { starters: 8, basePoints: 21.406 },
    Germany: { starters: 7, basePoints: 21.214 },
    France: { starters: 7, basePoints: 17.535 },
    Portugal: { starters: 5, basePoints: 20.1 },
    Netherlands: { starters: 6, basePoints: 9.979 },
    Greece: { starters: 5, basePoints: 14.2 },
    Poland: { starters: 4, basePoints: 15.75 },
    Denmark: { starters: 4, basePoints: 12.25 },
    Cyprus: { starters: 4, basePoints: 12.156 },
    Belgium: { starters: 5, basePoints: 11.4 },
    Ukraine: { starters: 4, basePoints: 8.312 },
    Turkey: { starters: 5, basePoints: 11.075 },
    Czechia: { starters: 5, basePoints: 11.025 },
    Norway: { starters: 5, basePoints: 8.05 }
  },
  teams: {
    PSG: { association: "France" },
    Liverpool: { association: "England" },
    RealMadrid: { association: "Spain" },
    Bayern: { association: "Germany" },
    Atletico: { association: "Spain" },
    Sporting: { association: "Portugal" },
    Arsenal: { association: "England" },

    Braga: { association: "Portugal" },
    Betis: { association: "Spain" },
    Freiburg: { association: "Germany" },
    CeltaVigo: { association: "Spain" },
    Porto: { association: "Portugal" },
    NottinghamForest: { association: "England" },
    Bologna: { association: "Italy" },
    AstonVilla: { association: "England" },

    Shakhtar: { association: "Ukraine" },
    AZ: { association: "Netherlands" },
    CrystalPalace: { association: "England" },
    Fiorentina: { association: "Italy" },
    RayoVallecano: { association: "Spain" },
    AEKAthens: { association: "Greece" },
    Mainz05: { association: "Germany" },
    Strasbourg: { association: "France" }
  },
  competitions: [
    {
      id: "ucl",
      name: "UEFA Champions League",
      shortName: "UCL",
      styleClass: "is-ucl",
      rules: {
        matchPoints: { win: 2, draw: 1 },
        roundReachBonus: { qf: 1.5, sf: 1.5, final: 0 },
        titleBonus: 0,
        note:
          "UEFA-Bonus ab Viertelfinale: 1.5 Punkte pro erreichte Runde (QF->SF, SF->Finale)."
      },
      rounds: [
        {
          id: "ucl-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "ucl-sf-1",
              home: "PSG",
              away: "Bayern",
              legs: [
                { id: "ucl-sf-1-l1", label: "Hinspiel" },
                { id: "ucl-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "ucl-sf-2",
              home: "Atletico",
              away: "Arsenal",
              legs: [
                { id: "ucl-sf-2-l1", label: "Hinspiel" },
                { id: "ucl-sf-2-l2", label: "Rückspiel" }
              ]
            }
          ]
        },
        {
          id: "ucl-final",
          key: "final",
          name: "Finale",
          ties: [
            {
              id: "ucl-final-1",
              homeFrom: "ucl-sf-1",
              awayFrom: "ucl-sf-2",
              legs: [{ id: "ucl-final-1-l1", label: "Finalspiel" }],
              isFinal: true
            }
          ]
        }
      ]
    },
    {
      id: "uel",
      name: "UEFA Europa League",
      shortName: "UEL",
      styleClass: "is-uel",
      rules: {
        matchPoints: { win: 2, draw: 1 },
        roundReachBonus: { qf: 1, sf: 1, final: 0 },
        titleBonus: 0,
        note:
          "UEFA-Bonus ab Viertelfinale: 1.0 Punkte pro erreichte Runde (QF->SF, SF->Finale)."
      },
      rounds: [
        {
          id: "uel-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "uel-sf-1",
              home: "Braga",
              away: "Freiburg",
              legs: [
                { id: "uel-sf-1-l1", label: "Hinspiel" },
                { id: "uel-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "uel-sf-2",
              home: "NottinghamForest",
              away: "AstonVilla",
              legs: [
                { id: "uel-sf-2-l1", label: "Hinspiel" },
                { id: "uel-sf-2-l2", label: "Rückspiel" }
              ]
            }
          ]
        },
        {
          id: "uel-final",
          key: "final",
          name: "Finale",
          ties: [
            {
              id: "uel-final-1",
              homeFrom: "uel-sf-1",
              awayFrom: "uel-sf-2",
              legs: [{ id: "uel-final-1-l1", label: "Finalspiel" }],
              isFinal: true
            }
          ]
        }
      ]
    },
    {
      id: "uecl",
      name: "UEFA Conference League",
      shortName: "UECL",
      styleClass: "is-uecl",
      rules: {
        matchPoints: { win: 2, draw: 1 },
        roundReachBonus: { qf: 0.5, sf: 0.5, final: 0 },
        titleBonus: 0,
        note:
          "UEFA-Bonus ab Viertelfinale: 0.5 Punkte pro erreichte Runde (QF->SF, SF->Finale)."
      },
      rounds: [
        {
          id: "uecl-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "uecl-sf-1",
              home: "Shakhtar",
              away: "CrystalPalace",
              legs: [
                { id: "uecl-sf-1-l1", label: "Hinspiel" },
                { id: "uecl-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "uecl-sf-2",
              home: "RayoVallecano",
              away: "Strasbourg",
              legs: [
                { id: "uecl-sf-2-l1", label: "Hinspiel" },
                { id: "uecl-sf-2-l2", label: "Rückspiel" }
              ]
            }
          ]
        },
        {
          id: "uecl-final",
          key: "final",
          name: "Finale",
          ties: [
            {
              id: "uecl-final-1",
              homeFrom: "uecl-sf-1",
              awayFrom: "uecl-sf-2",
              legs: [{ id: "uecl-final-1-l1", label: "Finalspiel" }],
              isFinal: true
            }
          ]
        }
      ]
    }
  ]
};
