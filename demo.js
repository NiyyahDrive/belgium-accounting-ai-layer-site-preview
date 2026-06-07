(() => {
  const data = window.DEMO_DATA;
  const state = {
    activeView: 'overview',
    selectedDossierId: data.dossiers[0].id,
    requestStatus: 'Alle statussen',
    requestPriority: 'Alle prioriteiten',
    summaryApproved: false
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
    switchView(state.activeView);
  }

  bindGlobalEvents();
  renderAll();
})();