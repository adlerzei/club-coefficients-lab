const UEFA_DATA = {
  seasonLabel: "UEFA Saison 2025/26",
  dataStand: "Stand: 15.04.2026",
  methodologyNote:
    "Offene Duelle werden als Einzelspiele bewertet: Hinspiel und Rückspiel geben separat Punkte (Sieg/Remis).",
  associations: {
    England: { starters: 9, basePoints: 25.569 },
    Italy: { starters: 7, basePoints: 18.714 },
    Spain: { starters: 8, basePoints: 21.343 },
    Germany: { starters: 7, basePoints: 20.285 },
    France: { starters: 7, basePoints: 17.178 },
    Portugal: { starters: 5, basePoints: 19.3 },
    Netherlands: { starters: 6, basePoints: 9.812 },
    Greece: { starters: 5, basePoints: 13.8 },
    Ukraine: { starters: 4, basePoints: 7.937 },
    Turkey: { starters: 5, basePoints: 11.075 }
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
          id: "ucl-qf",
          key: "qf",
          name: "Viertelfinale",
          ties: [
            {
              id: "ucl-qf-2",
              home: "RealMadrid",
              away: "Bayern",
              legs: [{ id: "ucl-qf-2-l2", label: "Rückspiel" }]
            },
            {
              id: "ucl-qf-4",
              home: "Sporting",
              away: "Arsenal",
              legs: [{ id: "ucl-qf-4-l2", label: "Rückspiel" }]
            }
          ]
        },
        {
          id: "ucl-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "ucl-sf-1",
              home: "PSG",
              awayFrom: "ucl-qf-2",
              legs: [
                { id: "ucl-sf-1-l1", label: "Hinspiel" },
                { id: "ucl-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "ucl-sf-2",
              home: "Atletico",
              awayFrom: "ucl-qf-4",
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
          id: "uel-qf",
          key: "qf",
          name: "Viertelfinale",
          ties: [
            {
              id: "uel-qf-1",
              home: "Braga",
              away: "Betis",
              legs: [{ id: "uel-qf-1-l2", label: "Rückspiel" }]
            },
            {
              id: "uel-qf-2",
              home: "Freiburg",
              away: "CeltaVigo",
              legs: [{ id: "uel-qf-2-l2", label: "Rückspiel" }]
            },
            {
              id: "uel-qf-3",
              home: "Porto",
              away: "NottinghamForest",
              legs: [{ id: "uel-qf-3-l2", label: "Rückspiel" }]
            },
            {
              id: "uel-qf-4",
              home: "Bologna",
              away: "AstonVilla",
              legs: [{ id: "uel-qf-4-l2", label: "Rückspiel" }]
            }
          ]
        },
        {
          id: "uel-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "uel-sf-1",
              homeFrom: "uel-qf-1",
              awayFrom: "uel-qf-2",
              legs: [
                { id: "uel-sf-1-l1", label: "Hinspiel" },
                { id: "uel-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "uel-sf-2",
              homeFrom: "uel-qf-3",
              awayFrom: "uel-qf-4",
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
          id: "uecl-qf",
          key: "qf",
          name: "Viertelfinale",
          ties: [
            {
              id: "uecl-qf-1",
              home: "Shakhtar",
              away: "AZ",
              legs: [{ id: "uecl-qf-1-l2", label: "Rückspiel" }]
            },
            {
              id: "uecl-qf-2",
              home: "CrystalPalace",
              away: "Fiorentina",
              legs: [{ id: "uecl-qf-2-l2", label: "Rückspiel" }]
            },
            {
              id: "uecl-qf-3",
              home: "RayoVallecano",
              away: "AEKAthens",
              legs: [{ id: "uecl-qf-3-l2", label: "Rückspiel" }]
            },
            {
              id: "uecl-qf-4",
              home: "Mainz05",
              away: "Strasbourg",
              legs: [{ id: "uecl-qf-4-l2", label: "Rückspiel" }]
            }
          ]
        },
        {
          id: "uecl-sf",
          key: "sf",
          name: "Halbfinale",
          ties: [
            {
              id: "uecl-sf-1",
              homeFrom: "uecl-qf-1",
              awayFrom: "uecl-qf-2",
              legs: [
                { id: "uecl-sf-1-l1", label: "Hinspiel" },
                { id: "uecl-sf-1-l2", label: "Rückspiel" }
              ]
            },
            {
              id: "uecl-sf-2",
              homeFrom: "uecl-qf-3",
              awayFrom: "uecl-qf-4",
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
