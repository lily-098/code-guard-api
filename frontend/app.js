/* ============================================================
   CodeGuard — app.js  (Bilingual + Voice Edition)
   ============================================================ */

// ── TRANSLATIONS ─────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    brandSub:         'Anomaly Detection',
    navDashboard:     'Dashboard',
    navAnalyze:       'Analyze',
    navDocs:          'API Docs',
    voiceGuide:       'Voice Guide',
    checking:         'Checking...',
    heroBadge:        'AI-Powered Threat Detection',
    heroLine1:        'Protect Your Codebase',
    heroLine2:        'From The Inside Out',
    heroDesc:         'Upload developer activity logs across GitHub, Google Docs, and Google Colab. Our ML models instantly surface suspicious patterns — mass deletions, off-hours edits, and file conflicts — before they cause damage.',
    heroAnalyzeBtn:   'Analyze Logs',
    heroLearnBtn:     'CSV Format Guide',
    uploadTitle:      'Upload Activity Logs',
    githubTitle:      'Real-time GitHub Repository Analysis',
    configLabel:      'API Endpoint',
    testConn:         'Test Connection',
    dropMain:         'Drop your CSV file here',
    dropSub:          'or',
    dropBrowse:       'browse to upload',
    dropHint:         'Supports: activity_logs.csv · raw_logs.csv · any CSV log file',
    analyzeBtn:       'Run Anomaly Detection',
    analyzing:        'Analyzing...',
    statTotal:        'Logs Processed',
    statAnomalies:    'Anomalies Found',
    statCritical:     'Critical Alerts',
    statWarning:      'Warnings',
    statClean:        'Clean Logs',
    reportTitle:      'Anomaly Report',
    filterAll:        'All',
    filterCritical:   'Critical',
    filterWarning:    'Warning',
    exportBtn:        'Export JSON',
    allClear:         'All Clear!',
    noneFound:        'No anomalies detected in the uploaded logs.',
    timelineTitle:    'Anomaly Timeline',
    audioGuideTitle:  'Audio Guide',
    play:             'Play',
    stop:             'Stop',
    speed:            'Speed',
    slow:             'Slow',
    normal:           'Normal',
    fast:             'Fast',
    offlineTitle:     'Backend API is offline.',
    offlineDesc:      'Open a terminal in the project folder and run:',
    recheck:          'Re-check',
    modalTitle:       'Expected CSV Format',
    modalDesc:        'Your CSV file should have the following columns:',
    colColumn:        'Column',
    colType:          'Type',
    colDesc:          'Description',
    schemaTimestamp:  'ISO datetime of the activity',
    schemaDev:        'Unique ID of the developer',
    schemaFile:       'Unique ID of the file touched',
    schemaAction:     'MODIFY / CREATE / DELETE',
    schemaAdded:      'Number of lines added',
    schemaDeleted:    'Number of lines deleted',
    modalTip:         'Run data_simulator.py then export_to_csv() to generate a sample file.',
    showing:          'Showing',
    of:               'of',
    anomaly:          'anomaly',
    anomalies:        'anomalies',
    developer:        'Developer',
    file:             'File',
    modelsReady:      'Models Ready',
    modelsWarn:       'Models Not Loaded',
    offline:          'Offline',
    voiceScript: `Welcome to CodeGuard — the AI-powered Code Collaboration Anomaly Detection System.
This system monitors developer activity in your codebase and automatically detects suspicious behaviour such as:
One — Mass code deletions, where a developer deletes an unusually large number of lines.
Two — Merge conflict risks, where multiple developers edit the same file concurrently without pulling.
Three — Large volume code uploads, where massive commits are pushed at once.

How to use this system:
Step 1 — Make sure the backend API is running. Open a terminal and run: uvicorn api.main:app --port 8005.
Step 2 — Upload a CSV file containing your activity logs using the upload panel.
Step 3 — Click the Run Anomaly Detection button.
Step 4 — Review the results. Critical alerts shown in red need immediate attention. Warnings shown in amber should be investigated.
Step 5 — Use the filter tabs to sort by severity, and export the report as JSON for sharing.`,
  },

  hi: {
    brandSub:         'असामान्य गतिविधि पहचान',
    navDashboard:     'डैशबोर्ड',
    navAnalyze:       'विश्लेषण',
    navDocs:          'API दस्तावेज़',
    voiceGuide:       'वॉइस गाइड',
    checking:         'जाँच हो रही है...',
    heroBadge:        'AI-आधारित खतरा पहचान प्रणाली',
    heroLine1:        'अपने कोडबेस को',
    heroLine2:        'अंदर से बाहर तक सुरक्षित करें',
    heroDesc:         'GitHub, Google Docs, और Google Colab पर डेवलपर गतिविधि लॉग अपलोड करें। हमारे ML मॉडल तुरंत संदिग्ध पैटर्न पहचानते हैं — जैसे बड़े पैमाने पर कोड हटाना, असामान्य समय पर संपादन, और फ़ाइल विवाद।',
    heroAnalyzeBtn:   'लॉग का विश्लेषण करें',
    heroLearnBtn:     'CSV फॉर्मेट गाइड',
    uploadTitle:      'गतिविधि लॉग अपलोड करें',
    githubTitle:      'रीयल-टाइम GitHub रिपॉजिटरी विश्लेषण',
    configLabel:      'API एंडपॉइंट',
    testConn:         'कनेक्शन जाँचें',
    dropMain:         'अपनी CSV फ़ाइल यहाँ छोड़ें',
    dropSub:          'या',
    dropBrowse:       'फ़ाइल चुनें',
    dropHint:         'समर्थित: activity_logs.csv · raw_logs.csv · कोई भी CSV लॉग फ़ाइल',
    analyzeBtn:       'असामान्य गतिविधि पहचानें',
    analyzing:        'विश्लेषण हो रहा है...',
    statTotal:        'प्रोसेस किए लॉग',
    statAnomalies:    'मिली असामान्यताएं',
    statCritical:     'गंभीर चेतावनी',
    statWarning:      'सावधानियाँ',
    statClean:        'सामान्य लॉग',
    reportTitle:      'असामान्यता रिपोर्ट',
    filterAll:        'सभी',
    filterCritical:   'गंभीर',
    filterWarning:    'सावधानी',
    exportBtn:        'JSON निर्यात',
    allClear:         'सब ठीक है!',
    noneFound:        'अपलोड किए गए लॉग में कोई असामान्यता नहीं मिली।',
    timelineTitle:    'असामान्यता समयरेखा',
    audioGuideTitle:  'ऑडियो गाइड',
    play:             'चलाएं',
    stop:             'रोकें',
    speed:            'गति',
    slow:             'धीमी',
    normal:           'सामान्य',
    fast:             'तेज़',
    offlineTitle:     'बैकएंड API ऑफलाइन है।',
    offlineDesc:      'प्रोजेक्ट फोल्डर में टर्मिनल खोलें और चलाएं:',
    recheck:          'दोबारा जाँचें',
    modalTitle:       'अपेक्षित CSV फॉर्मेट',
    modalDesc:        'आपकी CSV फ़ाइल में ये कॉलम होने चाहिए:',
    colColumn:        'कॉलम',
    colType:          'प्रकार',
    colDesc:          'विवरण',
    schemaTimestamp:  'गतिविधि का ISO दिनांक-समय',
    schemaDev:        'डेवलपर की विशिष्ट ID',
    schemaFile:       'फ़ाइल की विशिष्ट ID',
    schemaAction:     'MODIFY / CREATE / DELETE',
    schemaAdded:      'जोड़ी गई पंक्तियों की संख्या',
    schemaDeleted:    'हटाई गई पंक्तियों की संख्या',
    modalTip:         'नमूना फ़ाइल बनाने के लिए data_simulator.py और export_to_csv() चलाएं।',
    showing:          'दिखाया जा रहा है',
    of:               'में से',
    anomaly:          'असामान्यता',
    anomalies:        'असामान्यताएं',
    developer:        'डेवलपर',
    file:             'फ़ाइल',
    modelsReady:      'मॉडल तैयार हैं',
    modelsWarn:       'मॉडल लोड नहीं',
    offline:          'ऑफलाइन',
    voiceScript: `CodeGuard में आपका स्वागत है — यह एक AI-आधारित कोड सहयोग असामान्यता पहचान प्रणाली है।
यह प्रणाली आपके कोडबेस में डेवलपर्स की गतिविधियों पर नज़र रखती है और स्वचालित रूप से संदिग्ध व्यवहार पहचानती है, जैसे:
पहला — बड़े पैमाने पर कोड हटाना, जहाँ कोई डेवलपर असामान्य रूप से बड़ी संख्या में कोड लाइनें मिटा देता है।
दूसरा — मर्ज संघर्ष जोखिम, जहाँ कई डेवलपर्स बिना सिंक किए एक ही समय में एक ही फ़ाइल में बदलाव करते हैं।
तीसरा — भारी मात्रा में कोड अपलोड, जहाँ एक साथ बड़े कमिट पुश किए जाते हैं।

इस प्रणाली का उपयोग कैसे करें:
पहला चरण — सुनिश्चित करें कि बैकएंड API चल रहा है। टर्मिनल खोलें और चलाएं: uvicorn api.main:app --port 8005।
दूसरा चरण — अपलोड पैनल का उपयोग करके अपनी गतिविधि लॉग वाली CSV फ़ाइल अपलोड करें।
तीसरा चरण — "असामान्य गतिविधि पहचानें" बटन पर क्लिक करें।
चौथा चरण — परिणाम देखें। लाल रंग में दिखाई गई गंभीर चेतावनियों पर तुरंत ध्यान दें। पीले रंग की सावधानियों की भी जाँच करें।
पाँचवाँ चरण — गंभीरता के अनुसार फ़िल्टर करने के लिए फ़िल्टर टैब का उपयोग करें और साझा करने के लिए रिपोर्ट को JSON के रूप में निर्यात करें।`,
  }
};

// ── CONFIG & STATE ────────────────────────────────────────────
const DEFAULT_API = 'https://code-collaboration-anomaly-detection.onrender.com';
const PAGE_SIZE   = 8;

const state = {
  lang:          'en',
  file:          null,
  allAnomalies:  [],
  filteredAnoms: [],
  filter:        'all',
  platformFilter: 'all',
  page:          1,
  lastResponse:  null,
  speaking:      false,
  utterance:     null,
};

// ── DOM REFS ──────────────────────────────────────────────────
const $ = id => document.getElementById(id);

const els = {
  navbar:            $('navbar'),
  healthDot:         $('healthDot'),
  healthLabel:       $('healthLabel'),
  btnRefresh:        $('btnRefreshHealth'),
  langToggle:        $('langToggle'),
  langLabel:         $('langLabel'),
  voiceBtn:          $('voiceBtn'),
  voicePanel:        $('voicePanel'),
  voicePanelClose:   $('voicePanelClose'),
  voiceScript:       $('voiceScript'),
  btnPlay:           $('btnPlay'),
  playLabel:         $('playLabel'),
  btnStop:           $('btnStop'),
  voiceSpeed:        $('voiceSpeed'),
  offlineBanner:     $('offlineBanner'),
  btnRecheck:        $('btnRecheck'),
  heroAnalyzeBtn:    $('heroAnalyzeBtn'),
  heroLearnBtn:      $('heroLearnBtn'),
  navDashboard:      $('navDashboard'),
  navAnalyze:        $('navAnalyze'),
  navDocs:           $('navDocs'),
  apiEndpoint:       $('apiEndpoint'),
  btnTestEndpoint:   $('btnTestEndpoint'),
  dropZone:          $('dropZone'),
  fileInput:         $('fileInput'),
  fileInfo:          $('fileInfo'),
  fileName:          $('fileName'),
  fileSize:          $('fileSize'),
  btnRemoveFile:     $('btnRemoveFile'),
  btnAnalyze:        $('btnAnalyze'),
  btnAnalyzeInner:   $('btnAnalyzeInner'),
  btnAnalyzeLoading: $('btnAnalyzeLoading'),
  statsRow:          $('statsRow'),
  svTotal:           $('svTotal'),
  svAnomalies:       $('svAnomalies'),
  svCritical:        $('svCritical'),
  svWarning:         $('svWarning'),
  svClean:           $('svClean'),
  resultsPanel:      $('resultsPanel'),
  emptyResults:      $('emptyResults'),
  resultsList:       $('resultsList'),
  resultsCount:      $('resultsCount'),
  pagination:        $('pagination'),
  filterTabs:        $('filterTabs'),
  btnExport:         $('btnExport'),
  timelinePanel:     $('timelinePanel'),
  timeline:          $('timeline'),
  toastContainer:    $('toastContainer'),
  modalOverlay:      $('modalOverlay'),
  modalClose:        $('modalClose'),
  githubRepoName:    $('githubRepoName'),
  githubToken:       $('githubToken'),
  btnAnalyzeGithub:  $('btnAnalyzeGithub'),
  googleDocUrl:      $('googleDocUrl'),
  googleToken:       $('googleToken'),
  googleDocDemoMode: $('googleDocDemoMode'),
  btnAnalyzeGoogleDoc:$('btnAnalyzeGoogleDoc'),
  platformFilterTabs:$('platformFilterTabs'),
  navToggleBtn:      $('navToggleBtn'),
  mobileMenuDrawer:  $('mobileMenuDrawer'),
  mobileMenuClose:   $('mobileMenuClose'),
  mobDashboard:      $('mobDashboard'),
  mobAnalyze:        $('mobAnalyze'),
  mobDocs:           $('mobDocs'),
};

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectGridOverlay();
  applyTranslations();
  checkHealth();
  bindEvents();
});

function injectGridOverlay() {
  const grid = document.createElement('div');
  grid.className = 'grid-overlay';
  document.querySelector('.bg-canvas').appendChild(grid);
}

// ── TRANSLATIONS ENGINE ───────────────────────────────────────
function t(key) {
  return TRANSLATIONS[state.lang][key] || TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  // Update html lang attr
  document.documentElement.lang = state.lang === 'hi' ? 'hi' : 'en';
  // Update voice panel script display
  els.voiceScript.textContent = t('voiceScript');
  // Update lang label button
  els.langLabel.textContent = state.lang === 'en' ? 'EN' : 'हिं';
}

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'hi' : 'en';
  applyTranslations();
  // Stop any ongoing speech
  stopSpeech();
  showToast('info',
    state.lang === 'hi' ? 'भाषा बदली' : 'Language Changed',
    state.lang === 'hi' ? 'हिंदी मोड सक्रिय है' : 'English mode activated'
  );
}

// ── HEALTH CHECK ─────────────────────────────────────────────
async function checkHealth() {
  const base = els.apiEndpoint.value.trim().replace(/\/$/, '');
  setHealthState('checking');
  try {
    const res = await fetch(`${base}/health/`, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    els.offlineBanner.classList.add('hidden');
    if (data.models_loaded) {
      setHealthState('online', t('modelsReady'));
    } else {
      setHealthState('warning', t('modelsWarn'));
      showToast('warning', t('modelsWarn'),
        state.lang === 'hi'
          ? 'पहले ट्रेनिंग स्क्रिप्ट चलाएं।'
          : 'Run the training script first.', 5000);
    }
  } catch {
    setHealthState('offline', t('offline'));
    els.offlineBanner.classList.remove('hidden');
  }
}

function setHealthState(st, label) {
  els.healthDot.className = 'health-dot';
  if (st === 'online')   els.healthDot.classList.add('online');
  if (st === 'offline')  els.healthDot.classList.add('offline');
  if (st === 'warning')  els.healthDot.classList.add('warning');
  els.healthLabel.textContent = label || t(st === 'checking' ? 'checking' : st);
}

// ── VOICE / SPEECH ────────────────────────────────────────────
function openVoicePanel() {
  els.voiceScript.textContent = t('voiceScript');
  els.voicePanel.classList.remove('hidden');
}

function playSpeech() {
  if (!('speechSynthesis' in window)) {
    showToast('error',
      state.lang === 'hi' ? 'समर्थित नहीं' : 'Not Supported',
      state.lang === 'hi' ? 'आपका ब्राउज़र Speech API को सपोर्ट नहीं करता।' : 'Your browser does not support the Speech API.'
    );
    return;
  }
  stopSpeech();

  const text = t('voiceScript');
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang  = state.lang === 'hi' ? 'hi-IN' : 'en-US';
  utterance.rate  = parseFloat(els.voiceSpeed.value);
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to pick appropriate voice
  const voices = speechSynthesis.getVoices();
  const langCode = state.lang === 'hi' ? 'hi' : 'en';
  const match = voices.find(v => v.lang.startsWith(langCode));
  if (match) utterance.voice = match;

  utterance.onstart = () => {
    state.speaking = true;
    els.voiceBtn.classList.add('speaking');
    els.btnPlay.classList.add('playing');
    els.playLabel.textContent = state.lang === 'hi' ? 'चल रहा है...' : 'Playing...';
  };
  utterance.onend = utterance.onerror = () => {
    state.speaking = false;
    els.voiceBtn.classList.remove('speaking');
    els.btnPlay.classList.remove('playing');
    els.playLabel.textContent = t('play');
  };

  state.utterance = utterance;
  speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  state.speaking = false;
  els.voiceBtn.classList.remove('speaking');
  els.btnPlay.classList.remove('playing');
  els.playLabel.textContent = t('play');
}

// ── EVENT BINDING ─────────────────────────────────────────────
function bindEvents() {
  // Navbar scroll
  window.addEventListener('scroll', () => {
    els.navbar.style.background = window.scrollY > 20
      ? 'rgba(6,11,24,0.97)'
      : 'rgba(6,11,24,0.88)';
  });

  // Language toggle
  els.langToggle.addEventListener('click', toggleLanguage);

  // Voice guide button
  els.voiceBtn.addEventListener('click', () => {
    openVoicePanel();
    playSpeech();
  });
  els.voicePanelClose.addEventListener('click', () => {
    stopSpeech();
    els.voicePanel.classList.add('hidden');
  });
  els.btnPlay.addEventListener('click', playSpeech);
  els.btnStop.addEventListener('click', stopSpeech);

  // Health
  els.btnRefresh.addEventListener('click', checkHealth);
  els.btnRecheck.addEventListener('click', checkHealth);

  // Nav links
  els.navAnalyze.addEventListener('click', e => {
    e.preventDefault();
    const target = $('githubPanel') || document.querySelector('.upload-panel');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveNav(els.navAnalyze);
  });
  els.navDashboard.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveNav(els.navDashboard);
  });
  els.navDocs.addEventListener('click', e => {
    e.preventDefault();
    const base = els.apiEndpoint.value.trim().replace(/\/$/, '');
    window.open(`${base}/docs`, '_blank');
  });

  // Mobile Menu Interaction
  const closeMobileMenu = () => {
    els.mobileMenuDrawer.classList.remove('open');
  };
  if (els.navToggleBtn && els.mobileMenuDrawer && els.mobileMenuClose) {
    els.navToggleBtn.addEventListener('click', () => {
      els.mobileMenuDrawer.classList.add('open');
    });
    els.mobileMenuClose.addEventListener('click', closeMobileMenu);
    els.mobileMenuDrawer.addEventListener('click', e => {
      if (e.target === els.mobileMenuDrawer) closeMobileMenu();
    });

    els.mobDashboard.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveNav(els.navDashboard);
      // Synchronize desktop nav highlight
      setActiveNav(els.navDashboard);
      closeMobileMenu();
    });
    els.mobAnalyze.addEventListener('click', e => {
      e.preventDefault();
      const target = $('githubPanel') || document.querySelector('.upload-panel');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(els.navAnalyze);
      // Synchronize desktop nav highlight
      setActiveNav(els.navAnalyze);
      closeMobileMenu();
    });
    els.mobDocs.addEventListener('click', e => {
      e.preventDefault();
      const base = els.apiEndpoint.value.trim().replace(/\/$/, '');
      window.open(`${base}/docs`, '_blank');
      closeMobileMenu();
    });
  }

  // Hero buttons
  els.heroAnalyzeBtn.addEventListener('click', () => {
    const target = $('githubPanel') || document.querySelector('.upload-panel');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  els.heroLearnBtn.addEventListener('click', () => {
    els.modalOverlay.classList.remove('hidden');
  });

  // Test endpoint
  els.btnTestEndpoint.addEventListener('click', () => {
    checkHealth();
    showToast('info',
      state.lang === 'hi' ? 'कनेक्शन जाँच रहे हैं' : 'Testing connection',
      state.lang === 'hi' ? 'API से कनेक्ट हो रहे हैं...' : 'Pinging the API...'
    );
  });

  // Drag & Drop
  const dz = els.dropZone;
  ['dragenter','dragover'].forEach(evt => {
    dz.addEventListener(evt, e => { e.preventDefault(); dz.classList.add('drag-over'); });
  });
  ['dragleave','dragend'].forEach(evt => {
    dz.addEventListener(evt, () => dz.classList.remove('drag-over'));
  });
  dz.addEventListener('drop', e => {
    e.preventDefault(); dz.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  });
  dz.addEventListener('click', e => { if (e.target.tagName !== 'LABEL') els.fileInput.click(); });
  els.fileInput.addEventListener('change', e => { if (e.target.files[0]) handleFileSelect(e.target.files[0]); });
  els.btnRemoveFile.addEventListener('click', clearFile);

  // Analyze
  els.btnAnalyze.addEventListener('click', runAnalysis);

  // Filter tabs
  els.filterTabs.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    state.filter = tab.dataset.filter;
    state.page   = 1;
    document.querySelectorAll('#filterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilterAndRender();
  });

  // Platform Filter tabs
  els.platformFilterTabs.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    state.platformFilter = tab.dataset.platform;
    state.page   = 1;
    document.querySelectorAll('#platformFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilterAndRender();
  });

  // Analyze Github Repo
  els.btnAnalyzeGithub.addEventListener('click', runGitHubAnalysis);

  // Analyze Google Doc
  els.btnAnalyzeGoogleDoc.addEventListener('click', runGoogleDocAnalysis);

  // Export
  els.btnExport.addEventListener('click', exportJSON);

  // Modal
  els.modalClose.addEventListener('click', () => els.modalOverlay.classList.add('hidden'));
  els.modalOverlay.addEventListener('click', e => {
    if (e.target === els.modalOverlay) els.modalOverlay.classList.add('hidden');
  });

  // API endpoint change
  els.apiEndpoint.addEventListener('change', checkHealth);

  // Load voices when ready
  if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {};
  }
}

function setActiveNav(el) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
}

// ── FILE HANDLING ─────────────────────────────────────────────
function handleFileSelect(file) {
  if (!file.name.endsWith('.csv')) {
    showToast('error',
      state.lang === 'hi' ? 'गलत फ़ाइल प्रकार' : 'Invalid file type',
      state.lang === 'hi' ? 'कृपया .csv फ़ाइल अपलोड करें।' : 'Please upload a .csv file.'
    );
    return;
  }
  state.file = file;
  els.fileName.textContent = file.name;
  els.fileSize.textContent = formatBytes(file.size);
  els.fileInfo.classList.remove('hidden');
  els.btnAnalyze.disabled = false;
  showToast('success',
    state.lang === 'hi' ? 'फ़ाइल तैयार है' : 'File ready',
    `${file.name} ${state.lang === 'hi' ? 'सफलतापूर्वक लोड हुई।' : 'loaded successfully.'}`
  );
}

function clearFile() {
  state.file = null;
  els.fileInput.value = '';
  els.fileInfo.classList.add('hidden');
  els.btnAnalyze.disabled = true;
}

// ── ANALYSIS ──────────────────────────────────────────────────
async function runAnalysis() {
  if (!state.file) return;
  const base = els.apiEndpoint.value.trim().replace(/\/$/, '');

  els.btnAnalyzeInner.classList.add('hidden');
  els.btnAnalyzeLoading.classList.remove('hidden');
  els.btnAnalyze.disabled = true;

  try {
    const formData = new FormData();
    formData.append('file', state.file);

    const res = await fetch(`${base}/upload-log/`, {
      method: 'POST', body: formData, signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const data = await res.json();

    if (data.status === 'error') {
      showToast('error',
        state.lang === 'hi' ? 'विश्लेषण विफल' : 'Analysis failed',
        data.message || ''
      );
      return;
    }

    state.lastResponse   = data;
    state.allAnomalies   = data.anomalies || [];
    state.filter         = 'all';
    state.page           = 1;

    renderStats(data);
    applyFilterAndRender();
    renderTimeline();

    // Re-set filter tab labels via translation
    document.querySelectorAll('.filter-tab').forEach(tab => {
      const key = 'filter' + tab.dataset.filter.charAt(0).toUpperCase() + tab.dataset.filter.slice(1);
      tab.textContent = t(key);
    });

    setTimeout(() => {
      els.resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    const count = data.anomalies_detected;
    const crit  = state.allAnomalies.filter(a => a.severity === 'Critical').length;
    if (count === 0) {
      showToast('success', t('allClear'), t('noneFound'));
    } else {
      showToast(crit > 0 ? 'error' : 'info',
        `${count} ${count === 1 ? t('anomaly') : t('anomalies')}`,
        crit > 0
          ? (state.lang === 'hi' ? `${crit} गंभीर समस्याएं तुरंत ध्यान चाहती हैं!` : `${crit} critical issue(s) need immediate attention!`)
          : (state.lang === 'hi' ? 'नीचे सावधानी घटनाओं की समीक्षा करें।' : 'Review the warning events below.')
      );
    }
  } catch (err) {
    showToast('error',
      state.lang === 'hi' ? 'कनेक्शन विफल' : 'Connection failed',
      state.lang === 'hi'
        ? 'API से कनेक्ट नहीं हो सका। क्या सर्वर चल रहा है?'
        : 'Unable to reach the API. Is the server running?'
    );
    els.offlineBanner.classList.remove('hidden');
  } finally {
    els.btnAnalyzeInner.classList.remove('hidden');
    els.btnAnalyzeLoading.classList.add('hidden');
    els.btnAnalyze.disabled = false;
  }
}

async function runGitHubAnalysis() {
  const repo = els.githubRepoName.value.trim();
  if (!repo) return;
  const base = els.apiEndpoint.value.trim().replace(/\/$/, '');

  els.btnAnalyzeGithub.disabled = true;
  const originalText = els.btnAnalyzeGithub.textContent;
  els.btnAnalyzeGithub.textContent = state.lang === 'hi' ? 'विश्लेषण...' : 'Analyzing...';

  try {
    const res = await fetch(`${base}/fetch-github/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        repo_name: repo,
        limit: 15,
        github_token: (els.githubToken ? els.githubToken.value.trim() : null) || null
      }),
      signal: AbortSignal.timeout(30000)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error ${res.status}`);
    }
    const data = await res.json();

    if (data.status === 'error') {
      showToast('error',
        state.lang === 'hi' ? 'विश्लेषण विफल' : 'Analysis failed',
        data.message || ''
      );
      return;
    }

    state.lastResponse   = data;
    state.allAnomalies   = data.anomalies || [];
    state.filter         = 'all';
    state.platformFilter = 'all';
    state.page           = 1;

    // Reset UI active states
    document.querySelectorAll('#filterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('#filterTabs .filter-tab[data-filter="all"]').classList.add('active');
    document.querySelectorAll('#platformFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('#platformFilterTabs .filter-tab[data-platform="all"]').classList.add('active');

    renderStats(data);
    applyFilterAndRender();
    renderTimeline();

    setTimeout(() => {
      els.resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    const count = data.anomalies_detected;
    const crit  = state.allAnomalies.filter(a => a.severity === 'Critical').length;
    if (count === 0) {
      showToast('success', t('allClear'), t('noneFound'));
    } else {
      showToast(crit > 0 ? 'error' : 'info',
        `${count} ${count === 1 ? t('anomaly') : t('anomalies')}`,
        crit > 0
          ? (state.lang === 'hi' ? `${crit} गंभीर समस्याएं तुरंत ध्यान चाहती हैं!` : `${crit} critical issue(s) need immediate attention!`)
          : (state.lang === 'hi' ? 'नीचे सावधानी घटनाओं की समीक्षा करें।' : 'Review the warning events below.')
      );
    }
  } catch (err) {
    showToast('error',
      state.lang === 'hi' ? 'कनेक्शन विफल' : 'Connection failed',
      err.message || (state.lang === 'hi' ? 'API से कनेक्ट नहीं हो सका।' : 'Unable to reach the API.')
    );
  } finally {
    els.btnAnalyzeGithub.disabled = false;
    els.btnAnalyzeGithub.textContent = originalText;
  }
}

async function runGoogleDocAnalysis() {
  const url = els.googleDocUrl.value.trim();
  if (!url) return;
  const base = els.apiEndpoint.value.trim().replace(/\/$/, '');

  els.btnAnalyzeGoogleDoc.disabled = true;
  const originalText = els.btnAnalyzeGoogleDoc.textContent;
  els.btnAnalyzeGoogleDoc.textContent = state.lang === 'hi' ? 'विश्लेषण...' : 'Analyzing...';

  try {
    const res = await fetch(`${base}/fetch-google-doc/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        doc_url: url,
        google_token: (els.googleToken ? els.googleToken.value.trim() : null) || null,
        use_demo: els.googleDocDemoMode ? els.googleDocDemoMode.checked : false
      }),
      signal: AbortSignal.timeout(30000)
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error ${res.status}`);
    }
    const data = await res.json();

    if (data.status === 'error') {
      showToast('error',
        state.lang === 'hi' ? 'विश्लेषण विफल' : 'Analysis failed',
        data.message || ''
      );
      return;
    }

    state.lastResponse   = data;
    state.allAnomalies   = data.anomalies || [];
    state.filter         = 'all';
    state.platformFilter = 'all';
    state.page           = 1;

    // Reset UI active states
    document.querySelectorAll('#filterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('#filterTabs .filter-tab[data-filter="all"]').classList.add('active');
    document.querySelectorAll('#platformFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('#platformFilterTabs .filter-tab[data-platform="all"]').classList.add('active');

    renderStats(data);
    applyFilterAndRender();
    renderTimeline();

    setTimeout(() => {
      els.resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);

    const count = data.anomalies_detected;
    const crit  = state.allAnomalies.filter(a => a.severity === 'Critical').length;
    if (count === 0) {
      showToast('success', t('allClear'), t('noneFound'));
    } else {
      showToast(crit > 0 ? 'error' : 'info',
        `${count} ${count === 1 ? t('anomaly') : t('anomalies')}`,
        crit > 0
          ? (state.lang === 'hi' ? `${crit} गंभीर समस्याएं तुरंत ध्यान चाहती हैं!` : `${crit} critical issue(s) need immediate attention!`)
          : (state.lang === 'hi' ? 'नीचे सावधानी घटनाओं की समीक्षा करें।' : 'Review the warning events below.')
      );
    }
  } catch (err) {
    showToast('error',
      state.lang === 'hi' ? 'कनेक्शन विफल' : 'Connection failed',
      err.message || (state.lang === 'hi' ? 'API से कनेक्ट नहीं हो सका।' : 'Unable to reach the API.')
    );
  } finally {
    els.btnAnalyzeGoogleDoc.disabled = false;
    els.btnAnalyzeGoogleDoc.textContent = originalText;
  }
}

// ── RENDER STATS ──────────────────────────────────────────────
function renderStats(data) {
  const anomalies = data.anomalies || [];
  const critical  = anomalies.filter(a => a.severity === 'Critical').length;
  const warning   = anomalies.filter(a => a.severity === 'Warning').length;
  const clean     = Math.max(0, data.total_logs_processed - data.anomalies_detected);
  animateCount(els.svTotal,     data.total_logs_processed);
  animateCount(els.svAnomalies, data.anomalies_detected);
  animateCount(els.svCritical,  critical);
  animateCount(els.svWarning,   warning);
  animateCount(els.svClean,     clean);
  els.statsRow.classList.remove('hidden');
  els.statsRow.querySelectorAll('.stat-card').forEach((c, i) => { c.style.animationDelay = `${i * 80}ms`; });
}

function animateCount(el, target) {
  const duration = 800;
  const startTime = performance.now();
  const step = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── FILTER & RENDER ───────────────────────────────────────────
function applyFilterAndRender() {
  state.filteredAnoms = state.allAnomalies.filter(a => {
    const matchesSeverity = state.filter === 'all' || a.severity === state.filter;
    const matchesPlatform = state.platformFilter === 'all' || a.platform === state.platformFilter;
    return matchesSeverity && matchesPlatform;
  });

  const total      = state.filteredAnoms.length;
  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
  if (state.page > totalPages) state.page = totalPages;

  renderResultsList();
  renderPagination(totalPages);
  updateResultsCount();

  els.resultsPanel.classList.remove('hidden');
  if (total === 0) {
    els.emptyResults.classList.remove('hidden');
    els.resultsList.classList.add('hidden');
  } else {
    els.emptyResults.classList.add('hidden');
    els.resultsList.classList.remove('hidden');
  }
}

function renderResultsList() {
  const start = (state.page - 1) * PAGE_SIZE;
  const slice = state.filteredAnoms.slice(start, start + PAGE_SIZE);
  els.resultsList.innerHTML = slice.map((a, i) => anomalyCardHTML(a, i)).join('');
}

function anomalyCardHTML(a, idx) {
  const ts  = formatTimestamp(a.timestamp);
  const dev = escHTML(a.developer_name);
  const fp  = escHTML(a.file_path || '—');
  const desc = escHTML(a.description);
  const plat = escHTML(a.platform || 'GitHub');
  const platClass = plat.toLowerCase().replace(' ', '-');
  const svgCrit = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  const svgWarn = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  
  const resolveBtnText = plat === 'GitHub' ? (state.lang === 'hi' ? 'कमिट पूर्ववत करें' : 'Revert Commit') : (state.lang === 'hi' ? 'संघर्ष सुलझाएं' : 'Resolve Conflict');
  const resolveBtnHTML = `
    <div class="anomaly-actions" style="margin-top: 0.75rem; display: flex; gap: 8px; flex-wrap: wrap;">
      <button class="btn-resolve-conflict" 
              onclick="resolveAnomalyConflict('${escHTML(a.file_path).replace(/'/g, "\\'")}', '${escHTML(a.platform).replace(/'/g, "\\'")}', '${escHTML(a.developer_name).replace(/'/g, "\\'")}', this)"
              style="padding: 5px 12px; font-size: 11px; font-weight: 600; border-radius: 6px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: var(--green); cursor: pointer; transition: var(--transition);">
        ${resolveBtnText}
      </button>
      <button class="btn-ai-review" 
              onclick="toggleAIReviewPanel('${idx}')"
              style="padding: 5px 12px; font-size: 11px; font-weight: 600; border-radius: 6px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); color: #c084fc; cursor: pointer; transition: var(--transition);">
        ✨ AI Review & Gatekeeper
      </button>
    </div>
    
    <!-- AI Review Panel (collapsed by default) -->
    <div id="aiPanel-${idx}" class="ai-review-panel hidden" style="margin-top: 0.75rem; padding: 10px; border-radius: 8px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); width: 100%;">
      <div class="ai-key-row" style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; width: 100%;">
        <input type="password" id="aiKey-${idx}" class="config-input" placeholder="Gemini API Key (Optional)" style="flex: 1; padding: 4px 8px; font-size: 11px; border-radius: 4px; height: 26px; background: rgba(17, 25, 40, 0.5); border: 1px solid rgba(255,255,255,0.1); color: white;" />
        <button onclick="requestAIReview('${idx}', '${escHTML(a.file_path).replace(/'/g, "\\'")}', '${escHTML(a.platform).replace(/'/g, "\\'")}')" 
                style="width: auto; padding: 4px 12px; font-size: 11px; height: 26px; border-radius: 4px; background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple)); border: none; color: white; cursor: pointer; font-weight: 600;">
          Analyze Correctness
        </button>
      </div>
      
      <!-- AI Output Spinner and Content -->
      <div id="aiLoading-${idx}" class="hidden" style="font-size: 11px; color: var(--text-secondary); text-align: center; margin: 10px 0; display: flex; align-items: center; justify-content: center; gap: 6px;">
        <span class="spinner" style="display:inline-block; width:12px; height:12px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #8b5cf6; border-radius: 50%; animation: spin 1s linear infinite;"></span>
        AI is evaluating code logic...
      </div>
      <div id="aiResult-${idx}" class="ai-result-box" style="font-size: 11.5px; line-height: 1.4; color: #e5e7eb; margin-bottom: 8px; text-align: left;"></div>
      
      <!-- Human Gatekeeping Panel -->
      <div id="aiGatekeeper-${idx}" class="hidden" style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 8px; margin-top: 8px; width: 100%;">
        <textarea id="aiComment-${idx}" class="config-input" placeholder="Feedback/Gatekeeper Comments (Optional)" style="width: 100%; min-height: 40px; padding: 6px; font-size: 11px; border-radius: 4px; margin-bottom: 8px; resize: vertical; background: rgba(17, 25, 40, 0.5); border: 1px solid rgba(255,255,255,0.1); color: white;"></textarea>
        <div style="display: flex; gap: 8px; width: 100%;">
          <button onclick="submitGatekeeperDecision('${idx}', '${escHTML(a.file_path).replace(/'/g, "\\'")}', '${escHTML(a.platform).replace(/'/g, "\\'")}', 'approve')" 
                  style="flex: 1; padding: 6px; font-size: 11px; border-radius: 4px; background: linear-gradient(135deg, #10b981, #059669); border: none; color: white; cursor: pointer; font-weight: 600;">
            Approve & Merge
          </button>
          <button onclick="submitGatekeeperDecision('${idx}', '${escHTML(a.file_path).replace(/'/g, "\\'")}', '${escHTML(a.platform).replace(/'/g, "\\'")}', 'reject')" 
                  style="flex: 1; padding: 6px; font-size: 11px; border-radius: 4px; background: linear-gradient(135deg, #ef4444, #dc2626); border: none; color: white; cursor: pointer; font-weight: 600;">
            Reject & Request Fix
          </button>
        </div>
      </div>
      
      <!-- Gatekeeper Decision Result -->
      <div id="aiStatus-${idx}" class="hidden" style="font-size: 11px; font-weight: 600; text-align: center; margin-top: 6px; padding: 4px; border-radius: 4px;"></div>
    </div>`;

  return `
    <div class="anomaly-card ${a.severity}" style="animation-delay:${idx * 60}ms">
      <div class="anomaly-severity-icon">${a.severity === 'Critical' ? svgCrit : svgWarn}</div>
      <div class="anomaly-body">
        <div class="anomaly-top" style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <span class="severity-badge ${a.severity}">${escHTML(a.severity)}</span>
          <span class="platform-badge ${platClass}">${plat}</span>
          <span class="anomaly-desc" style="font-weight: 500;">${desc}</span>
        </div>
        <div class="anomaly-meta" style="margin-top: 0.5rem;">
          <div class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>${dev}</span>
          </div>
          <div class="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span class="mono">${fp}</span>
          </div>
        </div>
        ${resolveBtnHTML}
      </div>
      <span class="anomaly-timestamp">${ts}</span>
    </div>`;
}

// ── TIMELINE ─────────────────────────────────────────────────
function renderTimeline() {
  const items = state.allAnomalies.slice(0, 10);
  if (!items.length) { els.timelinePanel.classList.add('hidden'); return; }
  els.timelinePanel.classList.remove('hidden');
  const svgC = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  const svgW = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  els.timeline.innerHTML = items.map((a, i) => `
    <div class="tl-item" style="animation-delay:${i*70}ms">
      <div class="tl-dot ${a.severity}">${a.severity === 'Critical' ? svgC : svgW}</div>
      <div class="tl-content">
        <div class="tl-header">
          <span class="tl-dev">${escHTML(a.developer_name)}</span>
          <span class="severity-badge ${a.severity}">${escHTML(a.severity)}</span>
          <span class="tl-time">${formatTimestamp(a.timestamp)}</span>
        </div>
        <div class="tl-desc">${escHTML(a.description)}</div>
      </div>
    </div>`).join('');
}

// ── PAGINATION ────────────────────────────────────────────────
function renderPagination(totalPages) {
  if (totalPages <= 1) { els.pagination.innerHTML = ''; return; }
  els.pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(p => `<button class="page-btn ${p === state.page ? 'active' : ''}" data-page="${p}">${p}</button>`)
    .join('');
  els.pagination.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.page = parseInt(btn.dataset.page, 10);
      renderResultsList();
      renderPagination(totalPages);
      els.resultsList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function updateResultsCount() {
  const total = state.filteredAnoms.length;
  const start = (state.page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(state.page * PAGE_SIZE, total);
  if (total > 0) {
    els.resultsCount.textContent = `${t('showing')} ${start}–${end} ${t('of')} ${total} ${total === 1 ? t('anomaly') : t('anomalies')}`;
  } else {
    els.resultsCount.textContent = '';
  }
}

// ── EXPORT ────────────────────────────────────────────────────
function exportJSON() {
  if (!state.lastResponse) {
    showToast('info',
      state.lang === 'hi' ? 'कोई डेटा नहीं' : 'No data',
      state.lang === 'hi' ? 'पहले विश्लेषण करें।' : 'Run an analysis first.'
    );
    return;
  }
  const blob = new Blob([JSON.stringify(state.lastResponse, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `anomaly_report_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('success',
    state.lang === 'hi' ? 'निर्यात सफल!' : 'Exported!',
    state.lang === 'hi' ? 'रिपोर्ट JSON के रूप में सहेजी गई।' : 'Report saved as JSON.'
  );
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(type, title, message, duration = 4000) {
  const icons = {
    success: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    warning: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  };
  const toastType = (type === 'warning') ? 'info' : type;
  const toast = document.createElement('div');
  toast.className = `toast ${toastType}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-msg">
      <div style="font-weight:600;margin-bottom:2px">${escHTML(title)}</div>
      <div style="color:var(--text-md);font-size:12px">${escHTML(message)}</div>
    </div>
    <button class="toast-close" aria-label="Close">×</button>`;
  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  els.toastContainer.appendChild(toast);
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  toast.style.opacity   = '0';
  toast.style.transform = 'translateX(100%) scale(0.9)';
  toast.style.transition = 'all 0.3s ease';
  setTimeout(() => toast.remove(), 300);
}

// ── HELPERS ───────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTimestamp(ts) {
  try {
    return new Date(ts).toLocaleString(state.lang === 'hi' ? 'hi-IN' : 'en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch { return ts; }
}

function escHTML(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

window.resolveAnomalyConflict = async (filePath, platform, developerName, btn) => {
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = state.lang === 'hi' ? 'सुलझा रहे हैं...' : 'Resolving...';

  const base = els.apiEndpoint.value.trim().replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/resolve-conflict/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_path: filePath,
        platform: platform,
        developer_name: developerName
      })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    
    showToast('success', 
      state.lang === 'hi' ? 'सुलझाया गया' : 'Resolved', 
      data.message || 'Conflict resolved successfully.'
    );

    // Disable button and change appearance
    btn.textContent = state.lang === 'hi' ? 'सुलझाया गया ✓' : 'Resolved ✓';
    btn.style.background = 'rgba(16, 185, 129, 0.08)';
    btn.style.borderColor = 'rgba(16, 185, 129, 0.15)';
    btn.style.color = 'var(--text-lo)';
    btn.style.cursor = 'not-allowed';
    btn.onclick = null; // Prevent double trigger
  } catch (err) {
    showToast('error', 
      state.lang === 'hi' ? 'त्रुटि' : 'Error', 
      err.message || 'Failed to resolve conflict.'
    );
    btn.disabled = false;
    btn.textContent = originalText;
  }
};

window.toggleAIReviewPanel = (idx) => {
  const panel = document.getElementById(`aiPanel-${idx}`);
  if (panel) panel.classList.toggle('hidden');
};

window.requestAIReview = async (idx, filePath, platform) => {
  const loading = document.getElementById(`aiLoading-${idx}`);
  const result = document.getElementById(`aiResult-${idx}`);
  const gatekeeper = document.getElementById(`aiGatekeeper-${idx}`);
  const keyInput = document.getElementById(`aiKey-${idx}`);
  const statusDiv = document.getElementById(`aiStatus-${idx}`);

  loading.classList.remove('hidden');
  result.classList.add('hidden');
  gatekeeper.classList.add('hidden');
  statusDiv.classList.add('hidden');

  const base = document.getElementById('apiEndpoint').value.trim().replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/ai-review/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_path: filePath,
        platform: platform,
        gemini_api_key: keyInput.value.trim() || null
      })
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    
    // Format review markdown points as HTML
    let reviewHTML = data.review || '';
    reviewHTML = reviewHTML.replace(/- (✓|✗|⚠)/g, '• $1');
    reviewHTML = reviewHTML.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    reviewHTML = reviewHTML.split('\n').map(line => {
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ')) {
        const text = line.trim().substring(2);
        return `<div style="margin-bottom:4px; display:flex; gap:6px; text-align:left;"><span>•</span><span>${text}</span></div>`;
      }
      return line ? `<div style="margin-bottom:4px; text-align:left;">${line}</div>` : '';
    }).join('');

    result.innerHTML = reviewHTML;
    result.classList.remove('hidden');
    gatekeeper.classList.remove('hidden');
    
    showToast('success', 'AI Review Complete', 'Successfully analyzed code logic.');
  } catch (err) {
    result.innerHTML = `<span style="color:#ef4444;">Failed to load AI review: ${err.message}</span>`;
    result.classList.remove('hidden');
    showToast('error', 'AI Review Failed', err.message);
  } finally {
    loading.classList.add('hidden');
  }
};

window.submitGatekeeperDecision = async (idx, filePath, platform, action) => {
  const commentInput = document.getElementById(`aiComment-${idx}`);
  const statusDiv = document.getElementById(`aiStatus-${idx}`);
  const gatekeeperDiv = document.getElementById(`aiGatekeeper-${idx}`);

  const base = document.getElementById('apiEndpoint').value.trim().replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/gatekeeper/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_path: filePath,
        platform: platform,
        action: action,
        comments: commentInput.value.trim() || null
      })
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    
    showToast('success', action === 'approve' ? 'Changes Approved' : 'Changes Rejected', data.message);

    gatekeeperDiv.classList.add('hidden');
    statusDiv.textContent = action === 'approve' ? 'PR APPROVED ✓' : 'PR REJECTED ✗';
    statusDiv.style.background = action === 'approve' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    statusDiv.style.color = action === 'approve' ? '#10b981' : '#ef4444';
    statusDiv.style.border = action === 'approve' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)';
    statusDiv.classList.remove('hidden');
  } catch (err) {
    showToast('error', 'Gatekeeper Action Failed', err.message);
  }
};
