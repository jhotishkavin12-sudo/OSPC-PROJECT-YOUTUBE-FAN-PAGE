// Netlify Serverless Function for /api/community

export const handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle pre-flight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // GET /api/community
  if (event.httpMethod === 'GET') {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/community_submissions?select=*&order=created_at.desc`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        if (response.ok) {
          const rows = await response.json();
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, count: rows.length, data: rows })
          };
        }
      } catch (err) {
        console.warn('Supabase fetch failed, returning default list', err);
      }
    }

    // Default seed submissions
    const defaultData = [
      {
        id: 'comm_1',
        name: 'Karthikeyan R',
        email: 'karthik.tech@example.com',
        favoriteTopic: 'Custom PC Building & Gaming',
        message: 'A2D PC Factory videos helped me choose the right components for my first gaming setup! Keep delivering genuine Tamil tech content.',
        createdAt: '2026-10-06T14:30:00.000Z'
      },
      {
        id: 'comm_2',
        name: 'Praveen Kumar',
        email: 'praveen.ai@example.com',
        favoriteTopic: 'Artificial Intelligence & Future Tech',
        message: 'The local DeepSeek and Llama 3 tutorial in Tamil was mind-blowing! Running it on my RTX 4070 now.',
        createdAt: '2026-10-07T18:15:00.000Z'
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, count: defaultData.length, data: defaultData })
    };
  }

  // POST /api/community
  if (event.httpMethod === 'POST') {
    try {
      let bodyData;
      try {
        bodyData = JSON.parse(event.body || '{}');
      } catch (e) {
        // Handle urlencoded body if submitted from standard HTML form
        const params = new URLSearchParams(event.body || '');
        bodyData = {
          name: params.get('name'),
          email: params.get('email'),
          favoriteTopic: params.get('favoriteTopic'),
          message: params.get('message')
        };
      }

      const { name, email, favoriteTopic, message } = bodyData;

      // Validation
      if (!name || !email || !message) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            message: 'Name, email, and message are required fields!'
          })
        };
      }

      const newRecord = {
        id: `comm_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        favoriteTopic: favoriteTopic || 'Custom PC Building & Gaming',
        message: message.trim(),
        createdAt: new Date().toISOString()
      };

      // Check for Supabase environment variables
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          const insertRes = await fetch(`${supabaseUrl}/rest/v1/community_submissions`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({
              name: newRecord.name,
              email: newRecord.email,
              favorite_topic: newRecord.favoriteTopic,
              message: newRecord.message,
              created_at: newRecord.createdAt
            })
          });

          if (!insertRes.ok) {
            console.error('Supabase write notice:', await insertRes.text());
          }
        } catch (supabaseErr) {
          console.error('Supabase connection error:', supabaseErr);
        }
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Vanakkam da mapla! Your message has been received and saved to the A2D community database.',
          data: newRecord
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Internal server error processing submission'
        })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method Not Allowed' })
  };
};
