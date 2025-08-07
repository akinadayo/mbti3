// Netlify serverless function to act as a proxy for the OpenRouter API.
// This function securely handles the API key, preventing it from being exposed on the client-side.

// Use 'node-fetch' for making HTTP requests in a Node.js environment.
// Note: Netlify functions environment includes 'node-fetch' v2 automatically.
// For local testing, you might need to install it: `npm install node-fetch@2`
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // 1. Check for the correct HTTP method.
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ error: 'This function only accepts POST requests.' }),
    };
  }

  // 2. Retrieve the API key from environment variables.
  // The API key must be set in the Netlify project settings.
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('API key not found in environment variables.');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error: API key is missing.' }),
    };
  }

  try {
    // 3. Parse the incoming request body from the frontend.
    const { messages, model, temperature, max_tokens } = JSON.parse(event.body);

    // Basic validation for the presence of 'messages'.
    if (!messages) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ error: 'Missing required field: "messages".' }),
      };
    }

    // 4. Make the actual API call to OpenRouter.
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Securely add the Authorization token on the server-side.
        'Authorization': `Bearer ${apiKey}`,
        // It's good practice to add a custom user-agent or other headers
        // that OpenRouter recommends for tracking/identification.
        'HTTP-Referer': 'https://github.com/your-repo/project-chimera', // Replace with your repo
        'X-Title': 'Project Chimera',
      },
      body: JSON.stringify({
        // Pass through the parameters from the client.
        model: model || "openrouter/horizon-beta", // Default to horizon-beta if not provided
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 2000,
      }),
    });

    // 5. Check if the request to OpenRouter was successful.
    if (!response.ok) {
      // If not, pass the error status and message back to the client.
      const errorData = await response.json();
      console.error('Error from OpenRouter API:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `OpenRouter API error: ${errorData.error?.message || response.statusText}` }),
      };
    }

    // 6. Parse the JSON response from OpenRouter.
    const data = await response.json();

    // 7. Return the successful response to the frontend.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

  } catch (error) {
    // Handle JSON parsing errors or other unexpected errors.
    console.error('An unexpected error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `An internal server error occurred: ${error.message}` }),
    };
  }
};
