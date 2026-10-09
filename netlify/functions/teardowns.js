// Netlify Serverless Function for /api/teardowns

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

  const defaultTeardowns = [
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
  ];

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, count: defaultTeardowns.length, data: defaultTeardowns })
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

      const { title, reportedBy, platform, quotedPrice, description, productUrl } = bodyData;

      if (!title || !reportedBy || !quotedPrice) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, message: 'Title, name, and price are required!' })
        };
      }

      const newReport = {
        id: `tear_${Date.now()}`,
        title: String(title).trim(),
        reportedBy: String(reportedBy).trim(),
        platform: platform || 'Social Media / Grey Market',
        quotedPrice: Number(quotedPrice) || 0,
        description: String(description || '').trim(),
        productUrl: String(productUrl || '').trim(),
        status: 'In Queue for Nanda Teardown Review',
        createdAt: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'வணக்கம் டா மாப்ள! Your hardware scam report has been queued for A2D Lab inspection.',
          data: newReport
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
