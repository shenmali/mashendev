// Portfolio content — single source of truth, TR/EN/NL
// Mirrors the prototype's content.jsx 1:1 so copy edits flow here.

export type Locale = 'en' | 'tr' | 'nl';

type Triple = Record<Locale, string>;

export interface FocusItem {
  id: string;
  code: string;
  title: Triple;
  body: Triple;
  stack: string[];
  proof: Triple;
}

export interface Experience {
  year: string;
  tag?: 'current' | '';
  company: string;
  role: Triple;
  note: Triple;
}

export interface Repo {
  name: string;
  url: string;
  desc: Triple;
  tags: string[];
}

export const identity = {
  name: 'M. Ali ŞEN',
  handle: 'mashen.dev',
  email: 'muhalishen@gmail.com',
  phone: '+90 541 338 10 19',
  location: 'Flanders, Belgium',
  locationLong: 'Vlaanderen · EU',
  github: 'shenmali',
  linkedin: 'alimshen',
  medium: '@malishen',
} as const;

export const availability: Triple = {
  tr: 'Tam-zamanlı rollere açık · Flanders / remote EU',
  en: 'Open to full-time roles · Flanders / remote EU',
  nl: 'Beschikbaar voor full-time · Vlaanderen / remote EU',
};

export const role: Triple = {
  tr: 'AI/ML Mühendisi // Data Scientist',
  en: 'AI/ML Engineer // Data Scientist',
  nl: 'AI/ML Engineer // Data Scientist',
};

export const tagline: Triple = {
  tr: "Generative AI, agentic framework'ler ve otomasyon akışları tasarlıyorum. LLM'den Diffusion'a, LangGraph'tan n8n'e — sektör farketmeksizin AI ürün üretim hatları kuruyorum.",
  en: 'I ship generative AI, agentic frameworks, and automation pipelines. From LLMs to Diffusion, LangGraph to n8n — building AI production lines across industries.',
  nl: 'Generatieve AI, agentic frameworks en automatisering. Van LLM tot Diffusion, van LangGraph tot n8n — AI-productielijnen over sectoren heen.',
};

export const heroHeadline: Triple = {
  tr: 'Düşünen pipeline’lar, teslim edilen asset’ler.',
  en: 'Pipelines that think, assets that ship.',
  nl: 'Pijplijnen die denken, assets die verschepen.',
};

export const now: Triple = {
  tr: "Uçtan uca agentic bir game-dev framework'ü inşa ediyorum. Fikir aşamasından dizayn dokümanına, stil-tutarlı görsel üretiminden kodlamaya, ses üretiminden video/animasyona kadar tüm production hattını agent'lara delege eden bir sistem.",
  en: 'Building an end-to-end agentic game-dev framework — delegating the full production line to agents: from idea and design doc, through style-consistent visuals and code, to audio and video/animation generation.',
  nl: 'End-to-end agentic game-dev framework — van idee en design-doc tot stijl-consistente visuals, code, audio en video/animatie — gedelegeerd aan agents.',
};

export const nowStack = [
  'LangGraph',
  'MCP',
  'ComfyUI + FLUX',
  'Claude Code',
  'Suno / ElevenLabs',
  'Runway / Kling',
  'n8n',
];

export const languages = [
  { code: 'TR', level: 'Native', pct: 100 },
  { code: 'EN', level: 'C1', pct: 85 },
  { code: 'NL', level: 'A1 → learning', pct: 20 },
];

export const focus: FocusItem[] = [
  {
    id: 'agentic', code: 'AGT',
    title: { tr: 'Agentic Frameworks', en: 'Agentic Frameworks', nl: 'Agentic Frameworks' },
    body: {
      tr: "LangGraph, LangChain, CrewAI, AutoGen ile multi-agent orkestrasyonu. Tool-use, memory, planlayıcı/executor ayrımı ve MCP ile ürün içinde karar veren sistemler.",
      en: 'Multi-agent orchestration with LangGraph, LangChain, CrewAI, AutoGen. Tool-use, memory, planner/executor separation and MCP — decision-making systems shipped in production.',
      nl: 'Multi-agent orkestratie met LangGraph, LangChain, CrewAI, AutoGen. Tool-use, geheugen, planner/executor en MCP — beslissingssystemen in productie.',
    },
    stack: ['LangGraph', 'LangChain', 'CrewAI', 'AutoGen', 'MCP', 'Pydantic-AI'],
    proof: {
      tr: "→ Üretimde 7+ agent'li QA loop'u · ortalama karar gecikmesi < 2sn",
      en: '→ 7+ agent QA loop in production · avg decision latency < 2s',
      nl: '→ 7+ agent QA-loop in productie · gem. latency < 2s',
    },
  },
  {
    id: 'automation', code: 'AUT',
    title: { tr: 'AI Automation', en: 'AI Automation', nl: 'AI Automation' },
    body: {
      tr: 'n8n, Make, Zapier ve Temporal ile sürekli çalışan otomasyon hatları. AI’yi tetikleyici olarak değil, karar mercii olarak konumluyorum.',
      en: 'Always-on automation with n8n, Make, Zapier, and Temporal. AI positioned as decision-maker across email, CRM, and internal tool integrations.',
      nl: 'Altijd-aan automatisering met n8n, Make, Zapier, Temporal. AI als beslisser in e-mail, CRM en interne tools.',
    },
    stack: ['n8n', 'Make', 'Zapier', 'Temporal', 'Airflow', 'Celery'],
    proof: {
      tr: '→ Manuel operasyon saatlerinde %60+ azalma · haftada 200+ workflow',
      en: '→ 60%+ reduction in manual ops hours · 200+ workflows/week',
      nl: '→ 60%+ minder handmatige ops-uren · 200+ workflows/week',
    },
  },
  {
    id: 'rag', code: 'RAG',
    title: { tr: 'RAG & Knowledge', en: 'RAG & Knowledge', nl: 'RAG & Kennis' },
    body: {
      tr: 'Hybrid retrieval, rerank, graph-RAG ve knowledge-graph mimarisi. Neo4j, Qdrant, pgvector ile kurumsal bilgi üzerinden endüstriyel kalitede yanıt.',
      en: 'Hybrid retrieval, rerank, graph-RAG, knowledge graphs. Neo4j, Qdrant, pgvector — enterprise answer quality grounded in your data.',
      nl: 'Hybride retrieval, rerank, graph-RAG en knowledge graphs. Neo4j, Qdrant, pgvector voor enterprise-antwoordkwaliteit.',
    },
    stack: ['Neo4j', 'Qdrant', 'pgvector', 'LlamaIndex', 'Cohere-rerank', 'BM25'],
    proof: {
      tr: '→ Hybrid retrieval + rerank · groundedness skorunda +35pt iyileşme',
      en: '→ Hybrid retrieval + rerank · +35pt gain in groundedness score',
      nl: '→ Hybride retrieval + rerank · +35pt in groundedness',
    },
  },
  {
    id: 'generative', code: 'GEN',
    title: { tr: 'Generative Media', en: 'Generative Media', nl: 'Generative Media' },
    body: {
      tr: 'ComfyUI, FLUX, SD, LoRA ile marka-tutarlı görsel; Suno & ElevenLabs ile ses; Runway, Kling, Sora ile video. Game asset’ten reklam kreatifine kadar.',
      en: 'ComfyUI, FLUX, SD, LoRA fine-tunes for brand-consistent visuals; Suno, ElevenLabs for audio; Runway, Kling, Sora for video. Game assets to ad creative.',
      nl: 'ComfyUI, FLUX, SD, LoRA voor merk-consistente visuals; Suno, ElevenLabs voor audio; Runway, Kling, Sora voor video.',
    },
    stack: ['ComfyUI', 'FLUX', 'SD', 'LoRA', 'Suno', 'ElevenLabs', 'Runway'],
    proof: {
      tr: '→ Marka-tutarlı LoRA fine-tune · asset teslim süresinde 10× hızlanma',
      en: '→ Brand-consistent LoRA fine-tunes · 10× faster asset delivery',
      nl: "→ Merk-consistente LoRA's · 10× snellere asset-levering",
    },
  },
  {
    id: 'devtools', code: 'DEV',
    title: { tr: 'AI-Native Dev', en: 'AI-Native Dev', nl: 'AI-Native Dev' },
    body: {
      tr: "Claude Code, Cursor, Windsurf, v0, Aider ile uçtan uca ürün vibe-coding'i. MCP sunucuları, özel agent'lar, review otomasyonu ve spec-driven geliştirme.",
      en: 'End-to-end product vibe-coding with Claude Code, Cursor, Windsurf, v0, Aider. Custom MCP servers, bespoke agents, review automation, spec-driven delivery.',
      nl: 'End-to-end product vibe-coding met Claude Code, Cursor, Windsurf, v0, Aider. MCP-servers, agents, review-automatisering, spec-driven delivery.',
    },
    stack: ['Claude Code', 'Cursor', 'Windsurf', 'v0', 'MCP', 'Aider'],
    proof: {
      tr: "→ Özel MCP server'lar · spec-driven delivery ile prototip sürelerinde yarılanma",
      en: '→ Custom MCP servers · prototype cycles halved via spec-driven delivery',
      nl: '→ Custom MCP-servers · prototype-cycli gehalveerd',
    },
  },
  {
    id: 'localization', code: 'L10N',
    title: { tr: 'Localization / NMT', en: 'Localization / NMT', nl: 'Lokalisatie / NMT' },
    body: {
      tr: 'LLM + özel NMT (OpenNMT, Marian) hibrit pipeline. Stil rehberli, terim-tutarlı, QA’lanabilir çeviri akışları; oyun, e-ticaret, dokümantasyon.',
      en: 'LLM + custom NMT (OpenNMT, Marian) hybrid pipelines. Style-guided, term-consistent, QA-able translation for games, e-commerce, docs.',
      nl: 'LLM + custom NMT (OpenNMT, Marian) hybride pijplijnen. Stijlgestuurd, term-consistent, QA-baar vertalen.',
    },
    stack: ['GPT', 'Gemini', 'LLaMA', 'OpenNMT', 'Marian', 'COMET'],
    proof: {
      tr: "→ 12+ dile oyun içi metin pipeline'ı · çeviri maliyetinde %40 düşüş",
      en: '→ 12+ language in-game text pipeline · 40% translation cost reduction',
      nl: '→ 12+ talen in-game-tekstpijplijn · 40% kostenreductie',
    },
  },
  {
    id: 'mlops', code: 'OPS',
    title: { tr: 'MLOps & Eval', en: 'MLOps & Eval', nl: 'MLOps & Eval' },
    body: {
      tr: 'Langfuse, LangSmith, Arize ile LLM observability; Ragas ve DeepEval ile kalite ölçümü. Model karşılaştırma, prompt versiyonlama, cost/latency bütçeleri.',
      en: 'LLM observability via Langfuse, LangSmith, Arize; evaluation via Ragas and DeepEval. Model comparisons, prompt versioning, cost/latency budgets.',
      nl: 'LLM-observability via Langfuse, LangSmith, Arize; evaluatie met Ragas, DeepEval.',
    },
    stack: ['Langfuse', 'LangSmith', 'Arize', 'Ragas', 'DeepEval', 'W&B'],
    proof: {
      tr: '→ Prompt versiyonlama + cost/latency bütçeleri · regresyonları pre-merge yakalama',
      en: '→ Prompt versioning + cost/latency budgets · regressions caught pre-merge',
      nl: '→ Prompt-versioning + budgetten · regressies pre-merge gevangen',
    },
  },
  {
    id: 'forecast', code: 'FCST',
    title: { tr: 'Forecast & RL', en: 'Forecast & RL', nl: 'Forecast & RL' },
    body: {
      tr: 'Zaman serisi ve reinforcement learning ile LTV, talep tahmini, supply-chain optimizasyonu. E-ticaret ve oyun için üretim modelleri.',
      en: 'Time-series and reinforcement learning for LTV, demand forecasting, supply-chain optimization. Production models for e-commerce and games.',
      nl: 'Tijdreeksen en RL voor LTV, vraagvoorspelling, supply-chain optimalisatie.',
    },
    stack: ['Prophet', 'XGBoost', 'PyTorch', 'Stable-Baselines', 'Optuna'],
    proof: {
      tr: '→ LTV 90-gün tahmin modeli · MAPE %12 altında · üretimde 3 aydır canlı',
      en: '→ 90-day LTV forecast · MAPE under 12% · 3+ months in production',
      nl: '→ 90-dagen LTV-model · MAPE < 12% · 3+ maanden live',
    },
  },
  {
    id: 'gamelab', code: 'GAME',
    title: { tr: 'Game Lab', en: 'Game Lab', nl: 'Game Lab' },
    body: {
      tr: 'Uçtan uca web oyun üretimi ve level-design otomasyonu. AI vibe coding ile hızlı iterasyon, procedural level, stil-tutarlı asset üretimi.',
      en: 'End-to-end web game production and level-design automation. AI vibe-coding for rapid iteration, procedural levels, style-consistent asset generation.',
      nl: 'End-to-end webgame-productie en level-design-automatisering. AI vibe-coding voor snelle iteratie.',
    },
    stack: ['Three.js', 'Phaser', 'Canvas', 'Claude', 'ComfyUI'],
    proof: {
      tr: '→ Fikirden çalışan prototipe 48 saat · procedural level + stil-tutarlı asset',
      en: '→ Idea to working prototype in 48h · procedural levels + style-consistent art',
      nl: '→ Idee naar prototype in 48u · procedurele levels + stijl-consistente art',
    },
  },
];

export const experience: Experience[] = [
  {
    year: '2025', tag: 'current', company: 'Unico Studio',
    role: { tr: 'AI/ML Engineer', en: 'AI/ML Engineer', nl: 'AI/ML Engineer' },
    note: {
      tr: "Asset üretimi (FLUX/SD), lokalizasyon pipeline'ları (GPT/Gemini/LLaMA + OpenNMT/Marian), LTV tahmini, MCP ile QA agent'ları, LangGraph/n8n otomasyonları, ComfyUI workflow'ları.",
      en: 'Asset generation (FLUX/SD), localization pipelines (GPT/Gemini/LLaMA + OpenNMT/Marian), LTV forecasting, MCP-driven QA agents, LangGraph/n8n automations, ComfyUI workflows.',
      nl: 'Asset-generatie (FLUX/SD), lokalisatiepijplijnen, LTV-voorspelling, MCP-QA-agents, LangGraph/n8n-automatiseringen, ComfyUI-workflows.',
    },
  },
  {
    year: '2023', tag: '', company: 'Nomination Italy Turkey',
    role: { tr: 'IT Project Manager', en: 'IT Project Manager', nl: 'IT Project Manager' },
    note: {
      tr: 'E-ticaret, Shopify, ERP, SAP sistem tasarımı. SQL raporlama, satış tahmini ve generative AI ile dinamik ürün/reklam/pazarlama sistemleri.',
      en: 'E-commerce, Shopify, ERP, SAP system design. SQL reporting, sales forecasting, and dynamic generative AI product/ad/marketing systems.',
      nl: 'E-commerce, Shopify, ERP, SAP-systeemontwerp. SQL-rapportage, verkoopvoorspelling en generatieve AI.',
    },
  },
  {
    year: '2023', tag: '', company: 'Freelance',
    role: { tr: 'AI/ML Engineer // Data Scientist', en: 'AI/ML Engineer // Data Scientist', nl: 'AI/ML Engineer // Data Scientist' },
    note: {
      tr: "RAG chatbotlar, fine-tuned agent'lar, ComfyUI workflow'ları (BabyFaceGenerator, FaceSwap, StyleTransfer, OlderStyle), LTV zaman serisi, supply-chain RL, n8n otomasyonları.",
      en: 'RAG chatbots, fine-tuned agents, ComfyUI workflows (BabyFaceGenerator, FaceSwap, StyleTransfer, OlderStyle), LTV time-series, supply-chain RL, n8n automations.',
      nl: 'RAG-chatbots, fine-tuned agents, ComfyUI-workflows, LTV-tijdreeksen, supply-chain RL, n8n-automatiseringen.',
    },
  },
  {
    year: '2023', tag: '', company: 'UPOD.dev',
    role: { tr: 'Lead Assistant // Data Science', en: 'Lead Assistant // Data Science', nl: 'Lead Assistant // Data Science' },
    note: {
      tr: "Yazılım geliştirici eğitim platformu. Data Science track'inde lead asistan.",
      en: 'Software developer training platform. Lead assistant in the Data Science track.',
      nl: 'Trainingsplatform voor softwareontwikkelaars.',
    },
  },
  {
    year: '2022', tag: '', company: 'E-Commint',
    role: { tr: 'Software Developer', en: 'Software Developer', nl: 'Software Developer' },
    note: {
      tr: 'SAP Commerce Cloud (Hybris) Silver Partner. Karaca ve Awasr e-commerce sitelerinin Hollanda ve Rusya implementasyonlarında Java/Spring/Angular.',
      en: 'SAP Commerce Cloud (Hybris) Silver Partner. Java/Spring/Angular for Karaca and Awasr NL & RU e-commerce sites.',
      nl: 'SAP Commerce Cloud (Hybris) Silver Partner. Java/Spring/Angular voor Karaca en Awasr NL & RU sites.',
    },
  },
];

export const skills = [
  { name: 'Python', level: 6 },
  { name: 'LLM / RAG / Agents', level: 6 },
  { name: 'LangGraph / LangChain', level: 5 },
  { name: 'ComfyUI / SD / FLUX', level: 6 },
  { name: 'PyTorch / HuggingFace', level: 5 },
  { name: 'n8n / Make / Zapier', level: 5 },
  { name: 'MCP / Claude Code', level: 5 },
  { name: 'Neo4j / Cypher', level: 4 },
  { name: 'SQL (MS / PSQL)', level: 5 },
  { name: 'Java (Spring)', level: 5 },
  { name: 'JS (React / Angular)', level: 4 },
  { name: 'Swift (UIKit / SwiftUI)', level: 4 },
];

export const education = [
  { year: '2024 -', degree: 'MSc Computer Engineering', school: 'Yıldız Technical University' },
  { year: '2020 - 23', degree: 'BSc Computer Engineering // GPA 3.17', school: 'Yıldız Technical University' },
  { year: '2018 - 20', degree: 'Associate // Web Design & Coding // GPA 3.83', school: 'Anadolu University' },
];

export const certs = [
  'NewMind AI Bootcamp Assistant // 2025',
  'Quantum Computing & Programming (QBronze) // 2024',
  'Red Hat RH124 / RH134 // 2023',
  'Cisco CCNA 1-3 v7 // 2022',
  'IBB & Ecodation Data Science // 2022',
  'Java Spring Bootcamp (E-Commint) // 2022',
];

export const github: Repo[] = [
  {
    name: 'LLM-Chess-Arena',
    url: 'https://github.com/shenmali/LLM-Chess-Arena',
    desc: {
      tr: "Farklı LLM'leri satranç tahtasında karşılaştırma: tool-use, planlayıcı davranış, model karşılaştırma.",
      en: 'Pit LLMs against each other on a chess board — tool-use, planner behavior, model comparison.',
      nl: "LLM's tegen elkaar op het schaakbord — tool-use, planner-gedrag, modelvergelijking.",
    },
    tags: ['LLM', 'Agents', 'Eval'],
  },
  {
    name: 'HairTransplant_Flux_Project',
    url: 'https://github.com/shenmali/HairTransplant_Flux_Project',
    desc: {
      tr: "FLUX + LoRA ile saç ekim before/after görsel üretimi. Kontrol-ağırlıklı Diffusion pipeline'ı.",
      en: 'Before/after hair-transplant visuals with FLUX + LoRA. Control-weighted Diffusion pipeline.',
      nl: 'Voor/na haartransplantatie-visuals met FLUX + LoRA.',
    },
    tags: ['FLUX', 'LoRA', 'ComfyUI'],
  },
  {
    name: 'ai-code-review-demo',
    url: 'https://github.com/shenmali/ai-code-review-demo',
    desc: {
      tr: 'GitHub Actions + LLM ile otomatik PR review. Spec-driven yorumlar ve diff-aware öneriler.',
      en: 'GitHub Actions + LLM for automatic PR review. Spec-driven comments and diff-aware suggestions.',
      nl: 'GitHub Actions + LLM voor automatische PR-review.',
    },
    tags: ['CI', 'LLM', 'DevTool'],
  },
  {
    name: 'bead-color-changer',
    url: 'https://github.com/shenmali/bead-color-changer',
    desc: {
      tr: 'Kanvas üzerinde piksel-bazlı renk değişimi için computer vision deneyi.',
      en: 'Computer vision experiment: pixel-level recoloring of beaded designs on canvas.',
      nl: 'Computer vision: pixel-level recoloring op canvas.',
    },
    tags: ['CV', 'Canvas', 'JS'],
  },
];

export const ui = {
  en: {
    nav: { home: 'Home', about: 'About', focus: 'Focus', work: 'Experience', repos: 'Code', contact: 'Contact' },
    sections: {
      focus: 'FOCUS AREAS',
      work: 'EXPERIENCE',
      skills: 'SKILLS',
      edu: 'EDUCATION',
      certs: 'CERTIFICATES',
      repos: 'REPOSITORIES',
      contact: 'CONTACT',
    },
    cta: { contact: 'Get in touch', cv: 'Download CV', shell: '~/shell ↓', allRepos: '→ ALL' },
    status: 'system // online',
    latency: 'currently available',
    now: 'CURRENTLY BUILDING',
    boot: 'Connecting to the matrix',
    langLabel: 'Locale',
  },
  tr: {
    nav: { home: 'Ana Sayfa', about: 'Hakkımda', focus: 'Alanlar', work: 'Deneyim', repos: 'Kod', contact: 'İletişim' },
    sections: {
      focus: 'ODAK ALANLARI',
      work: 'DENEYİM',
      skills: 'YETENEKLER',
      edu: 'EĞİTİM',
      certs: 'SERTİFİKALAR',
      repos: 'REPOLAR',
      contact: 'İLETİŞİM',
    },
    cta: { contact: 'İletişime Geç', cv: 'CV indir', shell: '~/shell ↓', allRepos: '→ TÜMÜ' },
    status: 'sistem // çevrimiçi',
    latency: 'şu an müsait',
    now: 'ŞU AN İNŞA EDİYORUM',
    boot: "Matrix'e bağlanılıyor",
    langLabel: 'Dil',
  },
  nl: {
    nav: { home: 'Home', about: 'Over', focus: 'Focus', work: 'Ervaring', repos: 'Code', contact: 'Contact' },
    sections: {
      focus: 'FOCUSGEBIEDEN',
      work: 'ERVARING',
      skills: 'VAARDIGHEDEN',
      edu: 'OPLEIDING',
      certs: 'CERTIFICATEN',
      repos: 'REPOSITORIES',
      contact: 'CONTACT',
    },
    cta: { contact: 'Neem contact op', cv: 'CV downloaden', shell: '~/shell ↓', allRepos: '→ ALLE' },
    status: 'systeem // online',
    latency: 'momenteel beschikbaar',
    now: 'NU AAN HET BOUWEN',
    boot: 'Verbinden met de matrix',
    langLabel: 'Taal',
  },
} as const;
