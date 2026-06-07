(() => {
  const data = window.DEMO_DATA;
  const state = {
    activeView: 'overview',
    selectedDossierId: data.dossiers[0].id,
    requestStatus: 'Alle statussen',
    requestPriority: 'Alle prioriteiten',
    summaryApproved: false,
    builderClientId: (data.dashboardBuilder.clients[0] || {}).id,
    builderLastPrompt: ''
  };

  const $ = (id) => document.getElementById(id);

  function toneClass(tone) {
    return `tone-${tone || 'neutral'}`;
  }

  function renderFlow() {
    $('flowList').innerHTML = data.flow
      .map((step, index) => `<li><span>${index + 1}</span><p>${step}</p></li>`)
      .join('');
  }

  function renderMetrics() {
    $('topMetrics').innerHTML = data.metrics
      .map(metric => `
        <article class="metric-card card ${toneClass(metric.tone)}">
          <p>${metric.label}</p>
          <strong>${metric.value}</strong>
          <span>${metric.detail}</span>
        </article>
      `)
      .join('');
  }

  function renderOverview() {
    $('focusList').innerHTML = data.focusAreas.map(item => `<li>${item}</li>`).join('');
    $('blockerList').innerHTML = data.blockers.map(item => `
      <div class="blocker-item ${toneClass(item.tone)}">
        <strong>${item.count}</strong>
        <div>
          <span>${item.label}</span>
        </div>
      </div>
    `).join('');

    $('portfolioTable').innerHTML = `
      <div class="table-row table-head">
        <span>Dossier</span>
        <span>Eigenaar</span>
        <span>Status</span>
        <span>Blocker</span>
        <span>Volgende stap</span>
      </div>
      ${data.portfolio.map(item => `
        <button class="table-row table-button ${toneClass(item.tone)}" type="button" data-open-dossier="${item.dossierId}">
          <span>
            <strong>${item.dossier}</strong>
            <small>${item.period}</small>
          </span>
          <span>${item.owner}</span>
          <span>
            <em>${item.status}</em>
            <small>${item.progress}% compleet</small>
          </span>
          <span>${item.blocker}</span>
          <span>${item.nextAction}</span>
        </button>
      `).join('')}
    `;

    document.querySelectorAll('[data-open-dossier]').forEach(button => {
      button.addEventListener('click', () => {
        const dossier = data.dossiers.find(item => item.id === button.dataset.openDossier);
        if (dossier) {
          state.selectedDossierId = dossier.id;
          renderDossier();
        }
        switchView('dossier');
      });
    });
  }

  function renderRequestFilters() {
    const statusOptions = ['Alle statussen', ...new Set(data.requests.map(item => item.status))];
    const priorityOptions = ['Alle prioriteiten', ...new Set(data.requests.map(item => item.priority))];

    $('requestStatusFilter').innerHTML = statusOptions
      .map(option => `<option ${option === state.requestStatus ? 'selected' : ''}>${option}</option>`)
      .join('');
    $('requestPriorityFilter').innerHTML = priorityOptions
      .map(option => `<option ${option === state.requestPriority ? 'selected' : ''}>${option}</option>`)
      .join('');

    $('requestStatusFilter').onchange = (event) => {
      state.requestStatus = event.target.value;
      renderRequests();
    };

    $('requestPriorityFilter').onchange = (event) => {
      state.requestPriority = event.target.value;
      renderRequests();
    };
  }

  function renderRequests() {
    const filtered = data.requests.filter(item => {
      const statusOk = state.requestStatus === 'Alle statussen' || item.status === state.requestStatus;
      const priorityOk = state.requestPriority === 'Alle prioriteiten' || item.priority === state.requestPriority;
      return statusOk && priorityOk;
    });

    $('requestList').innerHTML = filtered.map(item => `
      <article class="card request-card ${toneClass(item.priority === 'Hoog' ? 'risk' : item.priority === 'Midden' ? 'warn' : 'good')}">
        <div class="request-header">
          <div>
            <span class="small-note">${item.id}</span>
            <h3>${item.title}</h3>
            <p>${item.client}</p>
          </div>
          <div class="request-badges">
            <span class="status-pill">${item.status}</span>
            <span class="status-pill status-priority">${item.priority}</span>
          </div>
        </div>
        <dl class="request-meta">
          <div><dt>Eigenaar</dt><dd>${item.owner}</dd></div>
          <div><dt>Deadline</dt><dd>${item.due}</dd></div>
          <div><dt>Kanaal</dt><dd>${item.channel}</dd></div>
        </dl>
        <p>${item.note}</p>
      </article>
    `).join('');
  }

  function renderDossierSelector() {
    $('dossierSelect').innerHTML = data.dossiers
      .map(item => `<option value="${item.id}" ${item.id === state.selectedDossierId ? 'selected' : ''}>${item.name}</option>`)
      .join('');
    $('dossierSelect').onchange = (event) => {
      state.selectedDossierId = event.target.value;
      renderDossier();
    };
  }

  function renderDossier() {
    const dossier = data.dossiers.find(item => item.id === state.selectedDossierId) || data.dossiers[0];
    $('dossierTitle').textContent = `${dossier.name} — ${dossier.period}`;
    $('dossierSummary').innerHTML = Object.entries({
      'Dossierverantwoordelijke': dossier.owner,
      Reviewer: dossier.reviewer,
      'Close-status': dossier.closeStatus,
      'AI-confidence': dossier.confidence,
      'Materialiteit': dossier.summary.materiality,
      'Voorgestelde actie': dossier.summary.aiRecommendation
    }).map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');

    $('missingDocsList').innerHTML = dossier.missingDocs.map(item => `<li>${item}</li>`).join('');
    $('findingsList').innerHTML = dossier.findings.map(item => `
      <article class="finding-item ${toneClass(item.severity === 'Hoog' ? 'risk' : item.severity === 'Midden' ? 'warn' : 'good')}">
        <span class="severity-pill">${item.severity}</span>
        <h4>${item.title}</h4>
        <p>${item.detail}</p>
      </article>
    `).join('');
    $('sourceList').innerHTML = dossier.sources.map(item => `<li><code>${item}</code></li>`).join('');
  }

  function renderClose() {
    $('closeStages').innerHTML = data.closeStages.map(stage => {
      const percent = Math.round((stage.complete / stage.total) * 100);
      return `
        <div class="stage-row">
          <div class="stage-copy">
            <strong>${stage.name}</strong>
            <span>${stage.complete}/${stage.total} dossiers</span>
          </div>
          <div class="progress-track">
            <div class="progress-bar ${toneClass(stage.tone)}" style="width:${percent}%"></div>
          </div>
        </div>
      `;
    }).join('');

    $('escalationList').innerHTML = data.escalations.map(item => `
      <article class="escalation-item">
        <h3>${item.client}</h3>
        <p>${item.issue}</p>
        <dl>
          <div><dt>Eigenaar</dt><dd>${item.owner}</dd></div>
          <div><dt>Actie</dt><dd>${item.action}</dd></div>
        </dl>
      </article>
    `).join('');
  }

  function renderSummary() {
    $('summaryHeadline').textContent = data.aiSummary.headline;
    $('summaryNarrative').textContent = data.aiSummary.narrative;
    $('summaryTags').innerHTML = data.aiSummary.tags.map(tag => `<span>${tag}</span>`).join('');
    $('controlPointsList').innerHTML = data.aiSummary.controls.map(item => `<li>${item}</li>`).join('');
    $('auditTrail').innerHTML = data.aiSummary.auditTrail.map(item => `
      <div class="timeline-item">
        <span>${item.time}</span>
        <div>
          <strong>${item.actor}</strong>
          <p>${item.event}</p>
        </div>
      </div>
    `).join('');

    const pill = $('summaryStatusPill');
    pill.textContent = state.summaryApproved ? 'Demo-review goedgekeurd' : 'Wacht op reviewer';
    pill.className = `status-pill ${state.summaryApproved ? 'status-approved' : 'status-review'}`;
  }

  // ── AI Klantdashboard-bouwer (NLP) ──────────────────────────────────────────

  const builder = data.dashboardBuilder;

  const euro = (value) => {
    const rounded = Math.round(value);
    const sign = rounded < 0 ? '-' : '';
    return `${sign}€${Math.abs(rounded).toLocaleString('nl-BE')}`;
  };

  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function getBuilderClient() {
    return builder.clients.find(c => c.id === state.builderClientId) || builder.clients[0];
  }

  // Bepaal de hoofdmetric (intent), of er een vergelijking gevraagd is en de periode.
  function detectIntent(promptRaw) {
    const text = ' ' + normalize(promptRaw) + ' ';
    const scored = builder.intents.map(intent => {
      let score = 0;
      intent.keywords.forEach(kw => {
        if (text.includes(' ' + normalize(kw))) score += 1;
      });
      return { intent, score };
    }).sort((a, b) => b.score - a.score);

    const primary = scored[0].score > 0 ? scored[0].intent : builder.intents[0];
    // Tweede metric met een score voor vergelijking (bv. "omzet vs kosten").
    const secondary = scored.find(s => s.intent.id !== primary.id && s.score > 0);
    const quarterly = /(kwartaal|kwartalen|quartaal|per\s*q|q1|q2|quarter)/.test(text);
    const comparison = Boolean(secondary) || /(vergelijk|versus|\bvs\b|tegenover|ten opzichte)/.test(text);

    return {
      primary,
      secondary: secondary ? secondary.intent : null,
      quarterly,
      comparison: comparison && Boolean(secondary)
    };
  }

  function seriesFor(client, metric) {
    if (metric === 'margin') {
      return client.series.revenue.map((rev, i) => rev - client.series.costs[i]);
    }
    return client.series[metric].slice();
  }

  function toQuarters(values) {
    const q1 = values.slice(0, 3).reduce((a, b) => a + b, 0);
    const q2 = values.slice(3, 6).reduce((a, b) => a + b, 0);
    return [q1, q2];
  }

  function trendWord(values) {
    const first = values[0];
    const last = values[values.length - 1];
    if (last > first * 1.03) return 'stijgt';
    if (last < first * 0.97) return 'daalt';
    return 'blijft stabiel';
  }

  function buildKpis(client, intent, values) {
    const ytd = values.reduce((a, b) => a + b, 0);
    const last = values[values.length - 1];
    const prev = values[values.length - 2];
    const momPct = prev !== 0 ? Math.round(((last - prev) / Math.abs(prev)) * 100) : 0;
    const maxVal = Math.max(...values);

    if (intent.metric === 'margin') {
      const revYtd = client.series.revenue.reduce((a, b) => a + b, 0);
      const marginPct = revYtd ? Math.round((ytd / revYtd) * 100) : 0;
      return [
        { label: 'Brutomarge YTD', value: euro(ytd), tone: 'good' },
        { label: 'Marge-%', value: `${marginPct}%`, tone: marginPct >= 30 ? 'good' : 'warn' },
        { label: 'Marge juni', value: euro(last), tone: 'neutral' },
        { label: 'MoM', value: `${momPct >= 0 ? '+' : ''}${momPct}%`, tone: momPct >= 0 ? 'good' : 'risk' }
      ];
    }

    const cumulLabel = intent.metric === 'receivables' ? 'Saldo juni' : `${intent.label} YTD`;
    const cumulValue = intent.metric === 'receivables' ? euro(last) : euro(ytd);
    return [
      { label: cumulLabel, value: cumulValue, tone: intent.accent },
      { label: 'Laatste maand (jun)', value: euro(last), tone: 'neutral' },
      { label: 'MoM-verandering', value: `${momPct >= 0 ? '+' : ''}${momPct}%`, tone: momPct >= 0 ? 'good' : 'risk' },
      { label: 'Hoogste maand', value: euro(maxVal), tone: 'neutral' }
    ];
  }

  function toneColor(tone) {
    return {
      good: 'var(--green)', warn: 'var(--orange)', risk: 'var(--red)',
      gold: 'var(--gold)', neutral: '#7da2d9'
    }[tone] || '#7da2d9';
  }

  // Dependency-vrije SVG-grafieken (bar/line), schaalt mee met de viewport.
  function svgBarChart(labels, seriesList) {
    const W = 720, H = 280, padL = 64, padR = 20, padT = 20, padB = 40;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const allVals = seriesList.flatMap(s => s.values);
    const rawMax = Math.max(...allVals, 0);
    const rawMin = Math.min(...allVals, 0);
    const max = rawMax === rawMin ? rawMax + 1 : rawMax;
    const min = rawMin < 0 ? rawMin : 0;
    const range = max - min || 1;
    const y = (v) => padT + plotH - ((v - min) / range) * plotH;
    const groups = labels.length;
    const groupW = plotW / groups;
    const barW = Math.min(46, (groupW * 0.7) / seriesList.length);
    const zeroY = y(0);

    let bars = '';
    labels.forEach((label, gi) => {
      const groupX = padL + gi * groupW + (groupW - barW * seriesList.length) / 2;
      seriesList.forEach((s, si) => {
        const v = s.values[gi];
        const bx = groupX + si * barW;
        const top = Math.min(y(v), zeroY);
        const h = Math.abs(y(v) - zeroY);
        bars += `<rect x="${bx.toFixed(1)}" y="${top.toFixed(1)}" width="${(barW - 4).toFixed(1)}" height="${Math.max(h, 1).toFixed(1)}" rx="4" fill="${toneColor(s.tone)}"><title>${s.name} ${label}: ${euro(v)}</title></rect>`;
      });
      bars += `<text x="${(padL + gi * groupW + groupW / 2).toFixed(1)}" y="${H - padB + 22}" text-anchor="middle" class="chart-axis">${label}</text>`;
    });

    // Gridlijnen + y-labels
    let grid = '';
    const ticks = 4;
    for (let t = 0; t <= ticks; t++) {
      const val = min + (range * t) / ticks;
      const gy = y(val);
      grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - padR}" y2="${gy.toFixed(1)}" class="chart-grid" />`;
      grid += `<text x="${padL - 10}" y="${(gy + 4).toFixed(1)}" text-anchor="end" class="chart-axis">${euro(val)}</text>`;
    }
    if (min < 0) grid += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${W - padR}" y2="${zeroY.toFixed(1)}" class="chart-zero" />`;

    return `<svg viewBox="0 0 ${W} ${H}" class="builder-chart-svg" role="img" preserveAspectRatio="xMidYMid meet">${grid}${bars}</svg>`;
  }

  function svgLineChart(labels, seriesList) {
    const W = 720, H = 280, padL = 64, padR = 20, padT = 20, padB = 40;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const allVals = seriesList.flatMap(s => s.values);
    const rawMax = Math.max(...allVals);
    const rawMin = Math.min(...allVals, 0);
    const max = rawMax === rawMin ? rawMax + 1 : rawMax;
    const min = rawMin;
    const range = max - min || 1;
    const x = (i) => padL + (labels.length === 1 ? plotW / 2 : (i / (labels.length - 1)) * plotW);
    const y = (v) => padT + plotH - ((v - min) / range) * plotH;

    let grid = '';
    const ticks = 4;
    for (let t = 0; t <= ticks; t++) {
      const val = min + (range * t) / ticks;
      const gy = y(val);
      grid += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${W - padR}" y2="${gy.toFixed(1)}" class="chart-grid" />`;
      grid += `<text x="${padL - 10}" y="${(gy + 4).toFixed(1)}" text-anchor="end" class="chart-axis">${euro(val)}</text>`;
    }

    let paths = '';
    seriesList.forEach(s => {
      const pts = s.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`);
      const color = toneColor(s.tone);
      paths += `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />`;
      s.values.forEach((v, i) => {
        paths += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="${color}"><title>${s.name} ${labels[i]}: ${euro(v)}</title></circle>`;
      });
    });
    let axis = '';
    labels.forEach((label, i) => {
      axis += `<text x="${x(i).toFixed(1)}" y="${H - padB + 22}" text-anchor="middle" class="chart-axis">${label}</text>`;
    });

    return `<svg viewBox="0 0 ${W} ${H}" class="builder-chart-svg" role="img" preserveAspectRatio="xMidYMid meet">${grid}${paths}${axis}</svg>`;
  }

  function fillInsight(template, client, values) {
    const ytd = values.reduce((a, b) => a + b, 0);
    return template
      .replace('{client}', client.name)
      .replace('{trend}', trendWord(values))
      .replace('{last}', euro(values[values.length - 1]))
      .replace('{ytd}', euro(ytd));
  }

  function buildDashboard(client, detection) {
    const { primary, secondary, quarterly, comparison } = detection;
    const labels = quarterly ? builder.quarters : builder.months;

    const makeSeries = (intent) => {
      let vals = seriesFor(client, intent.metric);
      if (quarterly) vals = toQuarters(vals);
      return { name: intent.label, values: vals, tone: intent.accent };
    };

    const seriesList = [makeSeries(primary)];
    if (comparison && secondary) seriesList.push(makeSeries(secondary));

    const chartType = comparison ? 'bar' : primary.chart;
    const chartSvg = chartType === 'line' ? svgLineChart(labels, seriesList) : svgBarChart(labels, seriesList);

    const kpis = buildKpis(client, primary, seriesFor(client, primary.metric));

    let insight = fillInsight(builder.insights[primary.metric], client, seriesFor(client, primary.metric));
    if (comparison && secondary) {
      insight += ` De vergelijking met ${secondary.label.toLowerCase()} maakt de verhouding in één oogopslag bespreekbaar met de klant.`;
    }

    const title = comparison && secondary
      ? `${primary.label} vs ${secondary.label}`
      : primary.title;

    const sources = seriesList.map(s => {
      const intent = builder.intents.find(i => i.label === s.name);
      return (intent ? intent.source : '').replace('{id}', client.id);
    }).filter(Boolean);

    // Slimme follow-up suggesties op basis van wat NIET gevraagd is.
    const followups = [];
    if (!quarterly) followups.push(`${primary.label} per kwartaal`);
    if (!comparison && primary.metric !== 'costs') followups.push(`Vergelijk ${primary.label.toLowerCase()} met kosten`);
    followups.push('Hoe staat de cashflow ervoor?');
    followups.push('Laat de openstaande klantfacturen zien');

    return { title, labels, seriesList, chartSvg, kpis, insight, sources, followups, chartType };
  }

  function renderBuilderConsole() {
    if (!$('builderClientSelect')) return;
    $('builderClientSelect').innerHTML = builder.clients
      .map(c => `<option value="${c.id}" ${c.id === state.builderClientId ? 'selected' : ''}>${c.name} — ${c.sector}</option>`)
      .join('');
    $('builderClientSelect').onchange = (e) => {
      state.builderClientId = e.target.value;
      if (state.builderLastPrompt) runBuilder(state.builderLastPrompt);
    };

    $('builderExamples').innerHTML = builder.examplePrompts
      .map(p => `<button type="button" class="example-chip" data-example="${p.replace(/"/g, '&quot;')}">${p}</button>`)
      .join('');
    $('builderExamples').querySelectorAll('[data-example]').forEach(chip => {
      chip.addEventListener('click', () => {
        $('builderPrompt').value = chip.dataset.example;
        runBuilder(chip.dataset.example);
      });
    });

    $('builderRunButton').onclick = () => runBuilder($('builderPrompt').value);
    $('builderPrompt').onkeydown = (e) => {
      if (e.key === 'Enter') runBuilder($('builderPrompt').value);
    };
  }

  function renderBuilderPlaceholder() {
    if (!$('builderOutput')) return;
    $('builderOutput').innerHTML = `
      <article class="card builder-empty">
        <h3>Nog geen dashboard gebouwd</h3>
        <p>Typ links een vraag in gewone taal of kies een voorbeeld. De AI-laag herkent de intentie en bouwt het klantdashboard met grafiek, kerncijfers, inzicht en bronverwijzing.</p>
      </article>`;
  }

  function runBuilder(promptText) {
    const text = (promptText || '').trim();
    const out = $('builderOutput');
    if (!out) return;
    if (!text) { renderBuilderPlaceholder(); return; }

    state.builderLastPrompt = text;
    const client = getBuilderClient();
    const detection = detectIntent(text);

    // Korte "AI bouwt..." fase om de NLP-stap voelbaar te maken in de demo.
    const steps = [
      'Vraag begrepen (NLP)',
      `Intentie: ${detection.primary.label}${detection.comparison && detection.secondary ? ' + ' + detection.secondary.label : ''}${detection.quarterly ? ' · per kwartaal' : ''}`,
      'Bron gekoppeld + dashboard opgebouwd'
    ];
    out.innerHTML = `
      <article class="card builder-building">
        <div class="building-spinner"></div>
        <div>
          <strong>AI-laag bouwt het dashboard…</strong>
          <ul class="building-steps">${steps.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
      </article>`;

    const dash = buildDashboard(client, detection);

    window.clearTimeout(runBuilder._t);
    runBuilder._t = window.setTimeout(() => {
      renderDashboardResult(client, text, dash);
    }, 650);
  }

  function renderDashboardResult(client, promptText, dash) {
    const out = $('builderOutput');
    if (!out) return;

    const legend = dash.seriesList.length > 1
      ? `<div class="chart-legend">${dash.seriesList.map(s => `<span><i style="background:${toneColor(s.tone)}"></i>${s.name}</span>`).join('')}</div>`
      : '';

    out.innerHTML = `
      <article class="card dashboard-result">
        <div class="result-head">
          <div>
            <p class="section-kicker">${client.name}</p>
            <h3>${dash.title}</h3>
            <p class="result-prompt">Gevraagd: <em>“${promptText}”</em></p>
          </div>
          <span class="status-pill status-review">Concept · reviewer keurt goed</span>
        </div>

        <div class="result-kpis">
          ${dash.kpis.map(k => `
            <div class="result-kpi ${toneClass(k.tone)}">
              <span>${k.label}</span>
              <strong>${k.value}</strong>
            </div>`).join('')}
        </div>

        <div class="result-chart">
          ${legend}
          ${dash.chartSvg}
        </div>

        <div class="result-bottom">
          <div class="result-insight">
            <h4>AI-inzicht</h4>
            <p>${dash.insight}</p>
            <div class="result-sources">
              <span class="small-note">Bron:</span>
              ${dash.sources.map(s => `<code>${s}</code>`).join('')}
            </div>
          </div>
          <div class="result-governance">
            <h4>Governance</h4>
            <ul class="check-list">
              <li>Cijfers zijn een AI-voorstel — niet vrijgegeven tot reviewer goedkeurt.</li>
              <li>Elke widget verwijst naar de gebruikte boekhoudbron.</li>
              <li>Geen autonome aanpassing of klantcommunicatie zonder approval gate.</li>
            </ul>
          </div>
        </div>

        <div class="result-followups">
          <span class="small-note">Volgende vraag:</span>
          <div class="example-chips">
            ${dash.followups.map(f => `<button type="button" class="example-chip" data-example="${f.replace(/"/g, '&quot;')}">${f}</button>`).join('')}
          </div>
        </div>
      </article>`;

    out.querySelectorAll('[data-example]').forEach(chip => {
      chip.addEventListener('click', () => {
        $('builderPrompt').value = chip.dataset.example;
        runBuilder(chip.dataset.example);
      });
    });
  }

  function renderBuilder() {
    renderBuilderConsole();
    if (state.builderLastPrompt) {
      runBuilder(state.builderLastPrompt);
    } else {
      renderBuilderPlaceholder();
    }
  }

  function switchView(view) {
    state.activeView = view;
    document.querySelectorAll('[data-view-panel]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.viewPanel === view);
    });
    document.querySelectorAll('#viewButtons button').forEach(button => {
      button.classList.toggle('active', button.dataset.view === view);
    });
  }

  function bindGlobalEvents() {
    document.querySelectorAll('#viewButtons button').forEach(button => {
      button.addEventListener('click', () => switchView(button.dataset.view));
    });

    document.querySelectorAll('[data-switch-view]').forEach(button => {
      button.addEventListener('click', () => switchView(button.dataset.switchView));
    });

    $('approveSummaryButton').addEventListener('click', () => {
      state.summaryApproved = !state.summaryApproved;
      renderSummary();
    });

    $('resetDemoButton').addEventListener('click', () => {
      state.activeView = 'overview';
      state.selectedDossierId = data.dossiers[0].id;
      state.requestStatus = 'Alle statussen';
      state.requestPriority = 'Alle prioriteiten';
      state.summaryApproved = false;
      state.builderClientId = (data.dashboardBuilder.clients[0] || {}).id;
      state.builderLastPrompt = '';
      const promptInput = $('builderPrompt');
      if (promptInput) promptInput.value = '';
      renderAll();
    });
  }

  function renderAll() {
    renderFlow();
    renderMetrics();
    renderOverview();
    renderRequestFilters();
    renderRequests();
    renderDossierSelector();
    renderDossier();
    renderClose();
    renderSummary();
    renderBuilder();
    switchView(state.activeView);
  }

  bindGlobalEvents();
  renderAll();
})();