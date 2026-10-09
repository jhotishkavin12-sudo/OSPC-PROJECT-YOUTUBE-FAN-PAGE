// Netlify Serverless Function for /api/pc-builds

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // In-memory / initial seed builds
  const defaultBuilds = [
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
  ];

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, count: defaultBuilds.length, data: defaultBuilds })
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      let bodyData;
      try {
        bodyData = JSON.parse(event.body || '{}');
      } catch (e) {
        const params = new URLSearchParams(event.body || '');
        bodyData = Object.fromEntries(params.entries());
      }

      const { customerName, phone, email, city, targetUse, components, estimatedTotal, estimatedWatts, comments } = bodyData;

      if (!customerName || !phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Name and phone number are required!' })
        };
      }

      const quotationNumber = `A2D-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBuild = {
        id: quotationNumber,
        customerName: String(customerName).trim(),
        phone: String(phone).trim(),
        email: String(email || '').trim(),
        city: String(city || 'Tamil Nadu').trim(),
        targetUse: targetUse || 'Custom Rig',
        components: components || {},
        estimatedTotal: Number(estimatedTotal) || 0,
        estimatedWatts: Number(estimatedWatts) || 0,
        comments: String(comments || '').trim(),
        status: 'Official Quotation Generated',
        createdAt: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: `வணக்கம் ${newBuild.customerName}! Your custom PC build quotation (${quotationNumber}) has been registered in the A2D Factory database.`,
          data: newBuild
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: err.message })
      };
    }
  }

  return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };
};
