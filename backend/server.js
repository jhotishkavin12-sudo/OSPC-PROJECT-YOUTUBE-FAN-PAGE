import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const STATIC_DIR = path.join(__dirname, '..', 'frontend', 'dist');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to read JSON data safely
function readJson(filename, fallback = []) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
}

// Helper to write JSON data safely
function writeJson(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// Seed initial data if empty
function initDatabase() {
  // Community seeds
  if (!fs.existsSync(path.join(DATA_DIR, 'community.json'))) {
    writeJson('community.json', [
      {
        id: 'comm_1',
        name: 'Karthikeyan R',
        email: 'karthik.tech@example.com',
        favoriteTopic: 'PC Builds',
        message: 'A2D PC Factory videos helped me choose the right components for my first gaming setup! Keep delivering genuine Tamil tech content.',
        likes: 18,
        createdAt: '2026-10-06T14:30:00.000Z'
      },
      {
        id: 'comm_2',
        name: 'Praveen Kumar',
        email: 'praveen.ai@example.com',
        favoriteTopic: 'AI',
        message: 'The local DeepSeek and Llama 3 tutorial in Tamil was mind-blowing! Running it on my RTX 4070 now without any cloud subscription.',
        likes: 24,
        createdAt: '2026-10-07T18:15:00.000Z'
      },
      {
        id: 'comm_3',
        name: 'Subashini S',
        email: 'suba.gadgets@example.com',
        favoriteTopic: 'Hardware Teardowns',
        message: 'Saved my brother from buying a fake 2TB SSD on Instagram after watching Nanda bro\'s teardown episode. Proud A2D Army member!',
        likes: 42,
        createdAt: '2026-10-08T09:45:00.000Z'
      }
    ]);
  }

  // PC Builds seeds
  if (!fs.existsSync(path.join(DATA_DIR, 'pc_builds.json'))) {
    writeJson('pc_builds.json', [
      {
        id: 'A2D-2026-1001',
        customerName: 'Dinesh Kumar',
        phone: '98401XXXXX',
        email: 'dinesh.gamer@example.com',
        city: 'Chennai',
        targetUse: '1080p Esports Gaming',
        components: {
          cpu: 'AMD Ryzen 5 5600 (6C/12T)',
          gpu: 'AMD Radeon RX 6600 8GB GDDR6',
          motherboard: 'MSI B550M PRO-VDH WiFi',
          ram: '16GB (2x8GB) DDR4 3200MHz',
          storage: '1TB WD Blue SN580 NVMe Gen4',
          psu: 'DeepCool PK550D 550W 80+ Bronze',
          cabinet: 'Ant Esports ICE-112 Mid-Tower',
          cooler: 'DeepCool AG400 ARGB Single Tower'
        },
        estimatedTotal: 46500,
        estimatedWatts: 320,
        status: 'Quotation Generated',
        createdAt: '2026-10-07T11:20:00.000Z'
      },
      {
        id: 'A2D-2026-1002',
        customerName: 'Sanjay Krishnan',
        phone: '98842XXXXX',
        email: 'sanjay.render@example.com',
        city: 'Coimbatore',
        targetUse: '4K Video Editing & 3D Blender',
        components: {
          cpu: 'AMD Ryzen 7 7800X3D (8C/16T)',
          gpu: 'NVIDIA GeForce RTX 4070 Super 12GB',
          motherboard: 'Gigabyte B650 AORUS Elite AX',
          ram: '32GB (2x16GB) DDR5 6000MHz CL30',
          storage: '2TB Kingston KC3000 Gen4 7000MB/s',
          psu: 'Corsair RM750e 750W 80+ Gold Modular',
          cabinet: 'Lian Li Lancool 216 RGB Black',
          cooler: 'DeepCool LS720 360mm AIO Liquid Cooler'
        },
        estimatedTotal: 142000,
        estimatedWatts: 490,
        status: 'Assembly Queued',
        createdAt: '2026-10-08T15:45:00.000Z'
      }
    ]);
  }

  // Teardown reports seeds
  if (!fs.existsSync(path.join(DATA_DIR, 'teardowns.json'))) {
    writeJson('teardowns.json', [
      {
        id: 'tear_1',
        title: 'Counterfeit 2TB Samsung 980 Pro SSD',
        reportedBy: 'Vignesh M',
        platform: 'Instagram Sponsored Ad',
        quotedPrice: 1800,
        verdict: 'Confirmed Scam: 32GB hacked MicroSD with iron weights',
        riskLevel: 'EXTREME SCAM',
        status: 'Busted & Documented',
        createdAt: '2026-10-05T10:00:00.000Z'
      },
      {
        id: 'tear_2',
        title: 'Flashed RTX 3060 with GTS 450 Fermi Chip',
        reportedBy: 'Kishore Kumar',
        platform: 'Ritchie Street Grey Market Shop',
        quotedPrice: 8500,
        verdict: 'Confirmed Scam: Fermi 1GB chip with modified vBIOS header',
        riskLevel: 'EXTREME SCAM',
        status: 'Busted & Documented',
        createdAt: '2026-10-06T16:30:00.000Z'
      }
    ]);
  }
}

initDatabase();

// ==========================================
// API ROUTES
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    channel: 'A2D Channel',
    tagline: 'வணக்கம் டா மாப்ள! Technology. Simplified.',
    timestamp: new Date().toISOString()
  });
});

// Channel & Community Stats
app.get('/api/stats', (req, res) => {
  const community = readJson('community.json', []);
  const builds = readJson('pc_builds.json', []);
  const teardowns = readJson('teardowns.json', []);

  res.json({
    subscribersCount: '2.5M+',
    totalViews: '380M+',
    videosCount: '1,250+',
    customBuildsCount: 850 + builds.length,
    communityMessagesCount: community.length,
    teardownsCount: teardowns.length
  });
});

// GET Community Submissions
app.get('/api/community', (req, res) => {
  const community = readJson('community.json', []);
  res.json({ success: true, count: community.length, data: community });
});

// POST Community Fan Submission
app.post('/api/community', (req, res) => {
  const { name, email, favoriteTopic, favorite_topic, message } = req.body;
  const topic = favoriteTopic || favorite_topic;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, valid email, and message are required fields!'
    });
  }

  const community = readJson('community.json', []);
  const newEntry = {
    id: `comm_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    favoriteTopic: topic || 'Tech',
    message: message.trim(),
    likes: 1,
    createdAt: new Date().toISOString()
  };

  community.unshift(newEntry);
  writeJson('community.json', community);

  res.status(201).json({
    success: true,
    message: 'வணக்கம் டா மாப்ள! Your message has been received by the A2D Hub team. Welcome to the community!',
    data: newEntry
  });
});

// POST Like a community message
app.post('/api/community/:id/like', (req, res) => {
  const { id } = req.params;
  const community = readJson('community.json', []);
  const item = community.find(c => c.id === id);

  if (!item) {
    return res.status(404).json({ success: false, message: 'Message not found' });
  }

  item.likes = (item.likes || 0) + 1;
  writeJson('community.json', community);

  res.json({ success: true, likes: item.likes });
});

// GET Custom PC Builds
app.get('/api/pc-builds', (req, res) => {
  const builds = readJson('pc_builds.json', []);
  res.json({ success: true, count: builds.length, data: builds });
});

// POST Custom PC Build Configuration & Quotation Request
app.post('/api/pc-builds', (req, res) => {
  const { customerName, phone, email, city, targetUse, components, estimatedTotal, estimatedWatts, comments } = req.body;

  if (!customerName || !phone || !components) {
    return res.status(400).json({
      success: false,
      message: 'Customer name, phone number, and component selection are required!'
    });
  }

  const builds = readJson('pc_builds.json', []);
  const quotationNumber = `A2D-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBuild = {
    id: quotationNumber,
    customerName: customerName.trim(),
    phone: phone.trim(),
    email: (email || '').trim().toLowerCase(),
    city: city ? city.trim() : 'Tamil Nadu',
    targetUse: targetUse || 'Balanced Gaming & Productivity',
    components: components || {},
    estimatedTotal: Number(estimatedTotal) || 0,
    estimatedWatts: Number(estimatedWatts) || 0,
    comments: (comments || '').trim(),
    status: 'Official Quotation Generated',
    createdAt: new Date().toISOString()
  };

  builds.unshift(newBuild);
  writeJson('pc_builds.json', builds);

  res.status(201).json({
    success: true,
    message: `வணக்கம் ${newBuild.customerName}! Your custom PC build quotation (${quotationNumber}) has been registered in the A2D Factory database.`,
    data: newBuild
  });
});

// Alias for /api/pc-inquiries
app.post('/api/pc-inquiries', (req, res) => {
  const { customerName, phone, email, city, targetUse, components, estimatedTotal, comments } = req.body;
  const builds = readJson('pc_builds.json', []);
  const quotationNumber = `A2D-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBuild = {
    id: quotationNumber,
    customerName: customerName ? customerName.trim() : 'A2D Soldier',
    phone: phone ? phone.trim() : '',
    email: email ? email.trim() : '',
    city: city ? city.trim() : 'Tamil Nadu',
    targetUse: targetUse || 'Gaming / Workstation',
    components: components || {},
    estimatedTotal: estimatedTotal || '₹ 0',
    comments: comments || '',
    status: 'Quotation Generated',
    createdAt: new Date().toISOString()
  };

  builds.unshift(newBuild);
  writeJson('pc_builds.json', builds);

  res.status(201).json({
    success: true,
    message: `வணக்கம் ${newBuild.customerName}! Your custom PC build quotation (${quotationNumber}) has been received by A2D PC Factory!`,
    data: newBuild
  });
});

// GET Hardware Teardown Cases
app.get('/api/teardowns', (req, res) => {
  const teardowns = readJson('teardowns.json', []);
  res.json({ success: true, count: teardowns.length, data: teardowns });
});

// POST Report a Suspicious Hardware Listing for Teardown
app.post('/api/teardowns', (req, res) => {
  const { title, reportedBy, platform, quotedPrice, description, productUrl } = req.body;

  if (!title || !reportedBy || !quotedPrice) {
    return res.status(400).json({
      success: false,
      message: 'Product title, reporter name, and quoted price are required!'
    });
  }

  const teardowns = readJson('teardowns.json', []);
  const newReport = {
    id: `tear_${Date.now()}`,
    title: title.trim(),
    reportedBy: reportedBy.trim(),
    platform: platform || 'Social Media / Grey Market',
    quotedPrice: Number(quotedPrice) || 0,
    description: (description || '').trim(),
    productUrl: (productUrl || '').trim(),
    status: 'In Queue for Nanda Teardown Review',
    createdAt: new Date().toISOString()
  };

  teardowns.unshift(newReport);
  writeJson('teardowns.json', teardowns);

  res.status(201).json({
    success: true,
    message: 'Vanakkam da mapla! Your hardware scam report has been queued for A2D Lab inspection.',
    data: newReport
  });
});

// Serve frontend static files if directory exists
if (fs.existsSync(STATIC_DIR)) {
  app.use(express.static(STATIC_DIR));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      const targetPath = path.join(STATIC_DIR, req.path.endsWith('.html') ? req.path : `${req.path}.html`);
      if (fs.existsSync(targetPath)) {
        res.sendFile(targetPath);
      } else {
        res.sendFile(path.join(STATIC_DIR, 'index.html'));
      }
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`⚡ A2D Channel Hub Server running on port ${PORT}`);
  console.log(`🔥 Tagline: வணக்கம் டா மாப்ள! Technology. Simplified.`);
  console.log(`🌐 API Endpoints:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - GET  /api/stats`);
  console.log(`   - GET/POST /api/community`);
  console.log(`   - GET/POST /api/pc-builds`);
  console.log(`   - GET/POST /api/teardowns`);
  console.log(`===============================================`);
});
