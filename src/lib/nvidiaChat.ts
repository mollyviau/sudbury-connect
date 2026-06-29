function parseJsonFromResponse<T>(text: string): T {
  const cleaned = text.replace(/```(?:json)?/g, '').trim();
  const objectStart = cleaned.indexOf('{');
  const arrayStart = cleaned.indexOf('[');
  let start = -1;
  if (objectStart === -1) start = arrayStart;
  else if (arrayStart === -1) start = objectStart;
  else start = Math.min(objectStart, arrayStart);

  const objectEnd = cleaned.lastIndexOf('}');
  const arrayEnd = cleaned.lastIndexOf(']');
  const end = Math.max(objectEnd, arrayEnd);

  if (start === -1 || end <= start) {
    throw new Error(`Could not find JSON in model response: ${text.slice(0, 200)}`);
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function askNemotron(prompt: string, maxTokens = 300): Promise<string> {
  const response = await fetch('/api/nvidia/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-super-120b-a12b',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`NVIDIA API error (${response.status}): ${JSON.stringify(data)}`);
  }
  return data.choices[0].message.content as string;
}

export async function askNemotronJson<T>(prompt: string, maxTokens = 300): Promise<T> {
  const text = await askNemotron(prompt, maxTokens);
  return parseJsonFromResponse<T>(text);
}

export { parseJsonFromResponse };
