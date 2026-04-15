(() => {
  const fixturesContainer = document.getElementById("fixturesContainer");
  const rankingBody = document.getElementById("rankingBody");
  const rulesContainer = document.getElementById("rulesContainer");
  const seasonLabel = document.getElementById("seasonLabel");
  const dataStand = document.getElementById("dataStand");
  const methodologyNote = document.getElementById("methodologyNote");
  const resetBtn = document.getElementById("resetBtn");

  const state = {
    legResults: {},
    qualifiers: {}
  };

  function getTeamName(tie, side) {
    const direct = tie[side];
    if (direct) return direct;

    const ref = tie[side + "From"];
    if (!ref) return "TBD";

    return state.qualifiers[ref] || "TBD";
  }

  function getTeamAssociation(teamName) {
    const team = UEFA_DATA.teams[teamName];
    return team ? team.association : null;
  }

  const TEAM_DISPLAY_NAMES = {
    PSG: "PSG",
    AZ: "AZ",
    AEKAthens: "AEK Athens",
    RealMadrid: "Real Madrid",
    CeltaVigo: "Celta Vigo",
    NottinghamForest: "Nottingham Forest",
    AstonVilla: "Aston Villa",
    CrystalPalace: "Crystal Palace",
    RayoVallecano: "Rayo Vallecano",
    Mainz05: "Mainz 05"
  };

  function formatTeamName(teamKey) {
    if (teamKey === "TBD") return "TBD";

    if (TEAM_DISPLAY_NAMES[teamKey]) return TEAM_DISPLAY_NAMES[teamKey];

    return teamKey
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Za-z])(\d)/g, "$1 $2");
  }

  function isTieReady(tie) {
    return getTeamName(tie, "home") !== "TBD" && getTeamName(tie, "away") !== "TBD";
  }

  function clearDependingSelections(changedTieId) {
    const queue = [changedTieId];

    while (queue.length > 0) {
      const current = queue.shift();

      UEFA_DATA.competitions.forEach((competition) => {
        competition.rounds.forEach((round) => {
          round.ties.forEach((tie) => {
            if (tie.homeFrom === current || tie.awayFrom === current) {
              if (state.qualifiers[tie.id]) {
                delete state.qualifiers[tie.id];
                queue.push(tie.id);
              }

              tie.legs.forEach((leg) => {
                if (state.legResults[leg.id]) {
                  delete state.legResults[leg.id];
                }
              });
            }
          });
        });
      });
    }
  }

  function setLegResult(legId, result) {
    if (state.legResults[legId] === result) {
      delete state.legResults[legId];
    } else {
      state.legResults[legId] = result;
    }

    renderFixtures();
    renderRanking();
  }

  function setQualifier(tieId, team) {
    if (state.qualifiers[tieId] === team) {
      delete state.qualifiers[tieId];
      clearDependingSelections(tieId);
    } else {
      state.qualifiers[tieId] = team;
      clearDependingSelections(tieId);
    }

    renderFixtures();
    renderRanking();
  }

  function renderRules() {
    rulesContainer.innerHTML = "";

    UEFA_DATA.competitions.forEach((competition) => {
      const rule = competition.rules;
      const card = document.createElement("article");
      card.className = `rule-card ${competition.styleClass || ""}`.trim();

      card.innerHTML = `
        <h3>${competition.shortName}</h3>
        <p>${competition.name}</p>
        <ul>
          <li>Pro Spiel: Sieg ${rule.matchPoints.win.toFixed(1)} / Remis ${rule.matchPoints.draw.toFixed(1)}</li>
          <li>Bonus QF-Sieger (Halbfinale erreicht): ${rule.roundReachBonus.qf.toFixed(1)}</li>
          <li>Bonus SF-Sieger (Finale erreicht): ${rule.roundReachBonus.sf.toFixed(1)}</li>
        </ul>
        <small>${rule.note}</small>
      `;

      rulesContainer.appendChild(card);
    });
  }

  function renderLegRow(leg, tie, rowEl) {
    const homeTeam = getTeamName(tie, "home");
    const awayTeam = getTeamName(tie, "away");
    const homeTeamLabel = formatTeamName(homeTeam);
    const awayTeamLabel = formatTeamName(awayTeam);
    const tieReady = isTieReady(tie);
    const selected = state.legResults[leg.id];

    const legRow = document.createElement("div");
    legRow.className = "leg-row";

    const label = document.createElement("p");
    label.className = "leg-label";
    label.textContent = leg.label;

    const options = document.createElement("div");
    options.className = "leg-options";

    const homeBtn = document.createElement("button");
    homeBtn.className = "leg-option";
    if (selected === "home") homeBtn.classList.add("active");
    homeBtn.disabled = !tieReady;
    homeBtn.textContent = `${homeTeamLabel} Sieg`;
    homeBtn.addEventListener("click", () => setLegResult(leg.id, "home"));

    const drawBtn = document.createElement("button");
    drawBtn.className = "leg-option";
    if (selected === "draw") drawBtn.classList.add("active");
    drawBtn.disabled = !tieReady;
    drawBtn.textContent = "Remis";
    drawBtn.addEventListener("click", () => setLegResult(leg.id, "draw"));

    const awayBtn = document.createElement("button");
    awayBtn.className = "leg-option";
    if (selected === "away") awayBtn.classList.add("active");
    awayBtn.disabled = !tieReady;
    awayBtn.textContent = `${awayTeamLabel} Sieg`;
    awayBtn.addEventListener("click", () => setLegResult(leg.id, "away"));

    options.appendChild(homeBtn);
    options.appendChild(drawBtn);
    options.appendChild(awayBtn);

    legRow.appendChild(label);
    legRow.appendChild(options);
    rowEl.appendChild(legRow);
  }

  function renderQualifierRow(tie, rowEl) {
    const homeTeam = getTeamName(tie, "home");
    const awayTeam = getTeamName(tie, "away");
    const homeTeamLabel = formatTeamName(homeTeam);
    const awayTeamLabel = formatTeamName(awayTeam);
    const selected = state.qualifiers[tie.id];
    const tieReady = isTieReady(tie);

    const qualifier = document.createElement("div");
    qualifier.className = "qualifier-row";

    const text = document.createElement("p");
    text.className = "qualifier-label";
    text.textContent = "Qualifiziert";

    const options = document.createElement("div");
    options.className = "qualifier-options";

    const homeBtn = document.createElement("button");
    homeBtn.className = "qualifier-option";
    if (selected === homeTeam) homeBtn.classList.add("active");
    homeBtn.disabled = !tieReady;
    homeBtn.textContent = homeTeamLabel;
    homeBtn.addEventListener("click", () => setQualifier(tie.id, homeTeam));

    const awayBtn = document.createElement("button");
    awayBtn.className = "qualifier-option";
    if (selected === awayTeam) awayBtn.classList.add("active");
    awayBtn.disabled = !tieReady;
    awayBtn.textContent = awayTeamLabel;
    awayBtn.addEventListener("click", () => setQualifier(tie.id, awayTeam));

    options.appendChild(homeBtn);
    options.appendChild(awayBtn);
    qualifier.appendChild(text);
    qualifier.appendChild(options);
    rowEl.appendChild(qualifier);
  }

  function renderFixtures() {
    fixturesContainer.innerHTML = "";

    UEFA_DATA.competitions.forEach((competition) => {
      const competitionBlock = document.createElement("section");
      competitionBlock.className = `competition-block ${competition.styleClass || ""}`.trim();

      const title = document.createElement("h3");
      title.className = "competition-title";
      title.textContent = `${competition.shortName} - ${competition.name}`;
      competitionBlock.appendChild(title);

      competition.rounds.forEach((round) => {
        const roundBlock = document.createElement("div");
        roundBlock.className = "round-block";

        const roundTitle = document.createElement("h4");
        roundTitle.className = "round-title";
        roundTitle.textContent = round.name;
        roundBlock.appendChild(roundTitle);

        round.ties.forEach((tie) => {
          const tieCard = document.createElement("article");
          tieCard.className = "tie-card";

          const homeTeam = getTeamName(tie, "home");
          const awayTeam = getTeamName(tie, "away");
          const homeTeamLabel = formatTeamName(homeTeam);
          const awayTeamLabel = formatTeamName(awayTeam);

          const teams = document.createElement("p");
          teams.className = "tie-teams";
          teams.textContent = `${homeTeamLabel} vs ${awayTeamLabel}`;
          tieCard.appendChild(teams);

          tie.legs.forEach((leg) => renderLegRow(leg, tie, tieCard));
          renderQualifierRow(tie, tieCard);

          roundBlock.appendChild(tieCard);
        });

        competitionBlock.appendChild(roundBlock);
      });

      fixturesContainer.appendChild(competitionBlock);
    });
  }

  function addMatchPoints(map, result, homeTeam, awayTeam, rule) {
    const homeAssoc = getTeamAssociation(homeTeam);
    const awayAssoc = getTeamAssociation(awayTeam);

    if (!homeAssoc || !awayAssoc || !map[homeAssoc] || !map[awayAssoc]) return;

    function addAssociationPoints(assocName, rawPoints) {
      const starters = map[assocName].starters;
      if (!starters || starters <= 0) return;
      map[assocName].extraPoints += rawPoints / starters;
    }

    if (result === "home") {
      addAssociationPoints(homeAssoc, rule.matchPoints.win);
    } else if (result === "away") {
      addAssociationPoints(awayAssoc, rule.matchPoints.win);
    } else if (result === "draw") {
      addAssociationPoints(homeAssoc, rule.matchPoints.draw);
      addAssociationPoints(awayAssoc, rule.matchPoints.draw);
    }
  }

  function computeRanking() {
    const map = {};

    Object.entries(UEFA_DATA.associations).forEach(([name, data]) => {
      map[name] = {
        association: name,
        starters: data.starters,
        basePoints: data.basePoints,
        extraPoints: 0,
        totalPoints: data.basePoints,
        coefficient: data.basePoints
      };
    });

    UEFA_DATA.competitions.forEach((competition) => {
      competition.rounds.forEach((round) => {
        round.ties.forEach((tie) => {
          const homeTeam = getTeamName(tie, "home");
          const awayTeam = getTeamName(tie, "away");

          tie.legs.forEach((leg) => {
            const result = state.legResults[leg.id];
            if (!result) return;
            addMatchPoints(map, result, homeTeam, awayTeam, competition.rules);
          });

          const qualifier = state.qualifiers[tie.id];
          if (!qualifier) return;

          const assoc = getTeamAssociation(qualifier);
          if (!assoc || !map[assoc]) return;

          const starters = map[assoc].starters;
          if (!starters || starters <= 0) return;

          map[assoc].extraPoints += (Number(competition.rules.roundReachBonus[round.key]) || 0) / starters;

          if (tie.isFinal) {
            map[assoc].extraPoints += (Number(competition.rules.titleBonus) || 0) / starters;
          }
        });
      });
    });

    Object.values(map).forEach((row) => {
      row.totalPoints = row.basePoints + row.extraPoints;
      row.coefficient = row.totalPoints;
    });

    return Object.values(map).sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      return b.coefficient - a.coefficient;
    });
  }

  function renderRanking() {
    const rows = computeRanking();
    rankingBody.innerHTML = "";

    rows.forEach((row, index) => {
      const tr = document.createElement("tr");
      if (index < 5) tr.className = "highlight";

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row.association}</td>
        <td>${row.starters}</td>
        <td>${row.basePoints.toFixed(3)}</td>
        <td>${row.extraPoints.toFixed(3)}</td>
        <td>${row.totalPoints.toFixed(3)}</td>
        <td>${row.coefficient.toFixed(3)}</td>
      `;

      rankingBody.appendChild(tr);
    });
  }

  function resetSelections() {
    state.legResults = {};
    state.qualifiers = {};
    renderFixtures();
    renderRanking();
  }

  seasonLabel.textContent = UEFA_DATA.seasonLabel;
  dataStand.textContent = UEFA_DATA.dataStand;
  methodologyNote.textContent = UEFA_DATA.methodologyNote;

  resetBtn.addEventListener("click", resetSelections);

  // Dark Mode Toggle
  const darkToggle = document.getElementById("darkToggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getEffectiveDark() {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return systemDark.matches;
  }

  function applyDark(isDark) {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    darkToggle.textContent = isDark ? "☀️" : "🌙";
  }

  applyDark(getEffectiveDark());

  // Re-apply when OS setting changes (only if user hasn't overridden manually)
  systemDark.addEventListener("change", () => {
    if (localStorage.getItem("darkMode") === null) {
      applyDark(systemDark.matches);
    }
  });

  darkToggle.addEventListener("click", () => {
    const isDark = !document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", String(isDark));
    applyDark(isDark);
  });

  renderRules();
  renderFixtures();
  renderRanking();
})();
