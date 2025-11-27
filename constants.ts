// REPLACE THIS WITH YOUR ACTUAL N8N WEBHOOK URL
// For demonstration, this points to a placeholder. 
// You must configure your n8n workflow to accept a POST body { "userGoal": string }
// and return { "videoRecommendations": [...] }
export const WEBHOOK_URL = 'https://akanshaagrawal.app.n8n.cloud/webhook-test/488827eb-80a5-44cc-9ecb-5e7a660f21ec';

export const PRESET_GOALS = [
  {
    label: "3-Day Strength & Power",
    text: "Generate 3-Day Strength & Power Videos"
  },
  {
    label: "5-Day Pure Hypertrophy",
    text: "Generate 5-Day Pure Hypertrophy Videos"
  },
  {
    label: "4-Day Lean Bulk",
    text: "Generate 4-Day Lean Bulk Maintenance Videos"
  }
];