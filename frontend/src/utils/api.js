const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Safely parse JSON from a fetch Response.
 * If the body is empty or not valid JSON (e.g. Vite proxy returns an empty
 * response when the backend is offline), throw a clear connection error
 * instead of the cryptic "Unexpected end of JSON input".
 */
async function safeJson(response) {
  const text = await response.text();
  if (!text || text.trim() === '') {
    throw new Error(
      'Could not connect to PlantDoc AI backend. Make sure the backend server is running on port 8000.'
    );
  }
  try {
    return JSON.parse(text);
  } catch {
    // The proxy returned an HTML error page or garbage — backend is down
    throw new Error(
      'Could not connect to PlantDoc AI backend. Make sure the backend server is running on port 8000.'
    );
  }
}

export async function predictPlantDisease(fileOrBlob, domain = 'auto') {
  const formData = new FormData();
  formData.append('image', fileOrBlob);
  if (domain && domain !== 'auto') {
    formData.append('domain', domain);
  }

  const url = `${API_BASE_URL}/api/predict`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await safeJson(response);
    if (!response.ok) {
      throw new Error(data.message || data.detail || `Server error (${response.status})`);
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
      throw new Error(
        'Could not connect to PlantDoc AI backend. Make sure the backend server is running on port 8000.'
      );
    }
    throw err;
  }
}

export async function checkSystemHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) return null;
    return await safeJson(response);
  } catch {
    return null;
  }
}

export async function fetchModelStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) return null;
    return await safeJson(response);
  } catch {
    return null;
  }
}

export async function fetchClasses() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/classes`);
    if (!response.ok) return null;
    return await safeJson(response);
  } catch {
    return null;
  }
}
