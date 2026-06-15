/* ============================================================
   CodeGuard Chrome Extension — popup.js
   ============================================================ */

const API_BASE = 'http://localhost:8005';
const DASHBOARD_URL = 'http://localhost:5185';

document.addEventListener('DOMContentLoaded', async () => {
  // Bind buttons
  document.getElementById('btnDashboard').addEventListener('click', openDashboard);
  document.getElementById('btnOpenDashboardFallback').addEventListener('click', openDashboard);

  try {
    // Get active tab info
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) {
      showFallback();
      return;
    }

    const url = tab.url;
    
    // Parse URL and determine platform
    if (url.includes('github.com')) {
      const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match && match[1] && match[2]) {
        const owner = match[1];
        const repo = match[2].split('?')[0].split('#')[0];
        runScan('/fetch-github/', { repo_name: `${owner}/${repo}`, limit: 15 });
      } else {
        showFallback();
      }
    } else if (url.includes('docs.google.com/document') || url.includes('colab.research.google.com') || url.includes('drive.google.com')) {
      runScan('/fetch-google-doc/', { doc_url: url });
    } else {
      showFallback();
    }
  } catch (err) {
    console.error(err);
    showFallback();
  }
});

// Run scan against backend API
async function runScan(endpoint, payload) {
  showView('viewLoading');
  
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      // Set reasonable timeout
      signal: AbortSignal.timeout(25000)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error (${res.status})`);
    }

    const data = await res.json();
    renderResults(data);
  } catch (err) {
    showError(err.message);
  }
}

// Render anomaly results in popup
function renderResults(data) {
  showView('viewResults');
  
  const listContainer = document.getElementById('anomaliesList');
  const allClear = document.getElementById('allClear');
  listContainer.innerHTML = '';

  const anomalies = data.anomalies || [];
  const criticalList = anomalies.filter(a => a.severity === 'Critical');
  const warningList = anomalies.filter(a => a.severity === 'Warning');

  // Update stat bubbles
  document.getElementById('statCrit').textContent = criticalList.length;
  document.getElementById('statWarn').textContent = warningList.length;

  if (anomalies.length === 0) {
    allClear.classList.remove('hidden');
    listContainer.classList.add('hidden');
  } else {
    allClear.classList.add('hidden');
    listContainer.classList.remove('hidden');

    anomalies.forEach(anomaly => {
      const card = document.createElement('div');
      card.className = `anomaly-card ${anomaly.severity.toLowerCase()}`;
      
      card.innerHTML = `
        <div class="anomaly-meta">
          <strong>${escapeHtml(anomaly.developer_name)}</strong>
          <span>${escapeHtml(anomaly.platform)}</span>
        </div>
        <div class="anomaly-desc">${escapeHtml(anomaly.description)}</div>
      `;
      listContainer.appendChild(card);
    });
  }
}

// Show error state inside popup
function showError(message) {
  showView('viewFallback');
  const title = document.querySelector('#viewFallback .fallback-title');
  const desc = document.querySelector('#viewFallback .fallback-desc');
  const list = document.querySelector('#viewFallback .fallback-list');
  const btn = document.querySelector('#viewFallback #btnOpenDashboardFallback');

  title.textContent = 'Connection Failed';
  title.style.color = '#ef4444';
  
  desc.innerHTML = `Unable to process scan request. Check that the FastAPI server is running locally on port 8005:<br><br><code>uvicorn api.main:app --port 8005 --reload</code><br><br><strong>Detail:</strong> ${escapeHtml(message)}`;
  list.classList.add('hidden');
  btn.textContent = 'Try Again';
  btn.onclick = () => window.location.reload();
}

// Utilities
function showFallback() {
  showView('viewFallback');
}

function showView(viewId) {
  ['viewLoading', 'viewResults', 'viewFallback'].forEach(id => {
    const el = document.getElementById(id);
    if (id === viewId) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

function openDashboard() {
  chrome.tabs.create({ url: DASHBOARD_URL });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
