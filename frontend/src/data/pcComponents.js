// Curated components with real-world Indian pricing (INR), specs, wattage, and benchmark performance ratings

export const CATEGORIES = [
  { id: 'cpu', name: 'Processor (CPU)', icon: 'Cpu', required: true },
  { id: 'gpu', name: 'Graphics Card (GPU)', icon: 'Tv', required: true },
  { id: 'motherboard', name: 'Motherboard', icon: 'CircuitBoard', required: true },
  { id: 'ram', name: 'Memory (RAM)', icon: 'MemoryStick', required: true },
  { id: 'storage', name: 'Storage (NVMe SSD)', icon: 'HardDrive', required: true },
  { id: 'cooler', name: 'CPU Cooler', icon: 'Fan', required: true },
  { id: 'psu', name: 'Power Supply (PSU)', icon: 'Zap', required: true },
  { id: 'cabinet', name: 'Cabinet / Case', icon: 'Box', required: true }
];

export const COMPONENTS = {
  cpu: [
    {
      id: 'cpu_12400f',
      brand: 'Intel',
      name: 'Intel Core i5-12400F (6C / 12T, up to 4.4GHz)',
      price: 9999,
      watts: 65,
      tier: 'Budget King',
      badge: "Nanda's VFM Choice",
      description: 'The undisputed budget gaming champion in Tamil Nadu. High single-core speed for esports.',
      fpsMultiplier: 1.0,
      socket: 'LGA1700'
    },
    {
      id: 'cpu_7600x',
      brand: 'AMD',
      name: 'AMD Ryzen 5 7600X (6C / 12T, up to 5.3GHz, AM5)',
      price: 19499,
      watts: 105,
      tier: 'Mid-Range Sweetspot',
      badge: 'A2D Recommended',
      description: 'AM5 platform longevity with beastly DDR5 performance and high clocks.',
      fpsMultiplier: 1.25,
      socket: 'AM5'
    },
    {
      id: 'cpu_7800x3d',
      brand: 'AMD',
      name: 'AMD Ryzen 7 7800X3D (8C / 16T, 3D V-Cache Monster)',
      price: 38999,
      watts: 120,
      tier: 'Flagship Gaming',
      badge: 'Fastest Gaming CPU on Earth',
      description: 'Pure gaming heaven! Huge 96MB L3 cache destroys esports and simulator framerates.',
      fpsMultiplier: 1.6,
      socket: 'AM5'
    },
    {
      id: 'cpu_14700k',
      brand: 'Intel',
      name: 'Intel Core i7-14700K (20C / 28T, up to 5.6GHz)',
      price: 37499,
      watts: 250,
      tier: 'Workstation / Hybrid',
      badge: 'Premiere Pro Beast',
      description: 'Ideal for 4K video editing, Blender 3D rendering, and heavy multitasking.',
      fpsMultiplier: 1.52,
      socket: 'LGA1700'
    }
  ],
  gpu: [
    {
      id: 'gpu_rx6600',
      brand: 'AMD',
      name: 'AMD Radeon RX 6600 8GB GDDR6',
      price: 19899,
      watts: 132,
      tier: '1080p Value God',
      badge: 'Kallapetti Budget Gold',
      description: 'Crushes 1080p Ultra in CS2, Valorant, GTA V, and Apex Legends easily above 90+ FPS.',
      gamingTier: '1080p High',
      fpsMap: { valorant: 280, gta: 95, cyberpunk: 58 }
    },
    {
      id: 'gpu_rtx4060',
      brand: 'Nvidia',
      name: 'Nvidia GeForce RTX 4060 8GB DLSS 3.5',
      price: 29999,
      watts: 115,
      tier: '1080p / 1440p Entry',
      badge: 'DLSS 3 Frame Gen Ready',
      description: 'Ultra-low power draw, AI Tensor cores, and incredible ray tracing with DLSS 3.',
      gamingTier: '1080p Ultra',
      fpsMap: { valorant: 380, gta: 125, cyberpunk: 78 }
    },
    {
      id: 'gpu_rtx4070super',
      brand: 'Nvidia',
      name: 'Nvidia GeForce RTX 4070 Super 12GB GDDR6X',
      price: 59999,
      watts: 220,
      tier: '1440p High Refresh Champ',
      badge: "A2D Editor's Pick",
      description: 'The golden ratio for 1440p 165Hz gaming and 4K capability. 12GB VRAM headroom.',
      gamingTier: '1440p Ultra / 4K Entry',
      fpsMap: { valorant: 550, gta: 165, cyberpunk: 112 }
    },
    {
      id: 'gpu_rtx4080super',
      brand: 'Nvidia',
      name: 'Nvidia GeForce RTX 4080 Super 16GB GDDR6X',
      price: 99999,
      watts: 320,
      tier: '4K Extreme',
      badge: 'Uncompromising 4K Dominance',
      description: '4K Ultra with full path tracing turned on in Cyberpunk and Black Myth: Wukong.',
      gamingTier: '4K Maximum',
      fpsMap: { valorant: 700, gta: 210, cyberpunk: 155 }
    }
  ],
  motherboard: [
    {
      id: 'mb_b760m',
      brand: 'MSI',
      name: 'MSI PRO B760M-A WiFi DDR5 (LGA1700)',
      price: 14499,
      watts: 40,
      socket: 'LGA1700',
      description: 'Dual Gen4 M.2 slots, Wi-Fi 6E, solid heatsinks for Core i5 and i7.'
    },
    {
      id: 'mb_b650m',
      brand: 'Gigabyte',
      name: 'Gigabyte B650M Gaming WiFi (AM5)',
      price: 11299,
      watts: 40,
      socket: 'AM5',
      description: 'Great AM5 starter board with solid VRMs, PCIe 4.0, and onboard Wi-Fi.'
    },
    {
      id: 'mb_b650e',
      brand: 'ASUS',
      name: 'ASUS ROG Strix B650E-F Gaming WiFi (AM5)',
      price: 26999,
      watts: 55,
      socket: 'AM5',
      description: 'PCIe 5.0 GPU and SSD ready, audiophile SupremeFX audio, heavy metal armor.'
    }
  ],
  ram: [
    {
      id: 'ram_16gb_ddr4',
      name: '16GB (8GBx2) Corsair Vengeance LPX 3200MHz DDR4',
      price: 3499,
      watts: 15,
      type: 'DDR4',
      description: 'Reliable dual-channel DDR4 memory for budget builds.'
    },
    {
      id: 'ram_32gb_ddr5',
      name: '32GB (16GBx2) G.Skill Flare X5 6000MHz CL30 DDR5 AMD EXPO',
      price: 9499,
      watts: 20,
      type: 'DDR5',
      description: 'The golden sweet spot for Ryzen 7000/9000 with ultra-tight 30-38-38 timings.'
    },
    {
      id: 'ram_64gb_ddr5',
      name: '64GB (32GBx2) Corsair Dominator Titanium 6000MHz RGB',
      price: 24999,
      watts: 25,
      type: 'DDR5',
      description: 'Massive capacity for 4K video rendering, CAD, and heavy multitasking.'
    }
  ],
  storage: [
    {
      id: 'ssd_1tb_nvme',
      name: '1TB Crucial P3 Plus PCIe 4.0 NVMe M.2 (Up to 5000 MB/s)',
      price: 5299,
      watts: 8,
      description: 'Fast Gen4 boot drive, great for OS and game library.'
    },
    {
      id: 'ssd_2tb_kc3000',
      name: '2TB Kingston KC3000 Gen4 TLC with DRAM (Up to 7000 MB/s)',
      price: 13999,
      watts: 10,
      description: 'High-end TLC flash with dedicated DRAM cache. A2D recommended for longevity.'
    },
    {
      id: 'ssd_4tb_990pro',
      name: '4TB Samsung 990 PRO Heatsink NVMe (Up to 7450 MB/s)',
      price: 31999,
      watts: 12,
      description: 'Top-tier endurance and blistering speeds for professional editors.'
    }
  ],
  cooler: [
    {
      id: 'cooler_ag400',
      name: 'DeepCool AG400 ARGB Single Tower Air Cooler',
      price: 1899,
      watts: 5,
      description: 'Compact 4-heatpipe tower cooler that tames Ryzen 7600 and i5-12400F with ease.'
    },
    {
      id: 'cooler_ak620',
      name: 'DeepCool AK620 Digital Dual Tower Display Cooler',
      price: 5899,
      watts: 10,
      description: 'Dual tower air cooler with real-time temperature display. Air cooling royalty.'
    },
    {
      id: 'cooler_ls720',
      name: 'DeepCool LS720 SE 360mm ARGB Liquid AIO Cooler',
      price: 8999,
      watts: 25,
      description: 'Triple 120mm fans with infinity mirror pump. Tames hot-headed i7 and Ryzen 7 CPUs.'
    }
  ],
  psu: [
    {
      id: 'psu_550w',
      name: 'DeepCool PK550D 550W 80 Plus Bronze',
      price: 3399,
      wattsCapacity: 550,
      description: 'Tier-C budget power supply with flat black cables and 80 Plus Bronze efficiency.'
    },
    {
      id: 'psu_750w',
      name: 'MSI MAG A750GL 750W 80 Plus Gold Fully Modular (ATX 3.0 / PCIe 5.0)',
      price: 7699,
      wattsCapacity: 750,
      description: 'Native 12VHPWR connector for modern Nvidia 40-series cards, 100% Japanese caps.'
    },
    {
      id: 'psu_1000w',
      name: 'Corsair RM1000e 1000W 80 Plus Gold ATX 3.0',
      price: 15499,
      wattsCapacity: 1000,
      description: 'Massive headroom for RTX 4080/4090 and multi-monitor creative workstations.'
    }
  ],
  cabinet: [
    {
      id: 'case_ant_ice',
      name: 'Ant Esports ICE-112 Mid-Tower Cabinet (4x ARGB Fans included)',
      price: 3199,
      description: 'Budget mesh front airflow cabinet with pre-installed rainbow ARGB fans.'
    },
    {
      id: 'case_lianli_216',
      name: 'Lian Li LANCOOL 216 RGB High Airflow Mid-Tower',
      price: 7899,
      description: 'Dual 160mm monster front fans, incredible cable management channels, A2D favorite.'
    },
    {
      id: 'case_lianli_o11',
      name: 'Lian Li O11 Dynamic EVO Dual-Chamber Panoramic Case',
      price: 13999,
      description: 'The showcase aquarium case! Dual-chamber glass aesthetics for ultimate RGB builds.'
    }
  ]
};

export const PREBUILT_TEMPLATES = [
  {
    name: 'A2D Budget Beast (₹45,000)',
    tag: 'ESPORTS SPECIAL',
    description: 'Designed for college students & esports lovers. 1080p high FPS in CS2, Valorant & GTA V.',
    components: {
      cpu: 'cpu_12400f',
      gpu: 'gpu_rx6600',
      motherboard: 'mb_b760m',
      ram: 'ram_16gb_ddr4',
      storage: 'ssd_1tb_nvme',
      cooler: 'cooler_ag400',
      psu: 'psu_550w',
      cabinet: 'case_ant_ice'
    }
  },
  {
    name: 'A2D Streamer Pro (₹1,25,000)',
    tag: 'MOST POPULAR',
    description: '1440p 165Hz gaming + NVENC live streaming on YouTube & Twitch with zero stutter.',
    components: {
      cpu: 'cpu_7600x',
      gpu: 'gpu_rtx4070super',
      motherboard: 'mb_b650m',
      ram: 'ram_32gb_ddr5',
      storage: 'ssd_1tb_nvme',
      cooler: 'cooler_ak620',
      psu: 'psu_750w',
      cabinet: 'case_lianli_216'
    }
  },
  {
    name: 'The Cyber Thalaivar 4K Rig (₹2,15,000)',
    tag: 'ULTIMATE PERFORMANCE',
    description: 'Ryzen 7800X3D + RTX 4080 Super monster with Lian Li panoramic chassis & 360mm AIO.',
    components: {
      cpu: 'cpu_7800x3d',
      gpu: 'gpu_rtx4080super',
      motherboard: 'mb_b650e',
      ram: 'ram_32gb_ddr5',
      storage: 'ssd_2tb_kc3000',
      cooler: 'cooler_ls720',
      psu: 'psu_1000w',
      cabinet: 'case_lianli_o11'
    }
  }
];
