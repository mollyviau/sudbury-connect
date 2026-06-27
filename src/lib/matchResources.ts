export async function matchResources(userAnswers: {
    categories: string[];
    whoAreYou: string;
    area: string;
    language: string;
  }) {
    // Load our resource list
    const resources = await import('../data/resources.json');
  
    const prompt = `
      You are a community resource assistant for Sudbury, Ontario.
      
      A person needs help. Here is what they told us:
      - They need help with: ${userAnswers.categories.join(', ')}
      - They are: ${userAnswers.whoAreYou}
      - They live in: ${userAnswers.area}
      - Their language: ${userAnswers.language}
      
      Here is our list of local resources:
      ${JSON.stringify(resources, null, 2)}
      
      Return ONLY a JSON array of the 3-5 most relevant resources for this person.
      Respond in ${userAnswers.language}.
      Format: [{ name, description, phone, hours, languages }]
    `;
  
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000
      })
    });
  
    const data = await response.json();
    const text = data.choices[0].message.content;
    return JSON.parse(text);
  }