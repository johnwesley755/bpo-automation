
import { PromptGenerationRequest } from "@/types/api.types";

// Mock implementation for demo purposes
export const geminiService = {
  generatePrompt: async (request: PromptGenerationRequest): Promise<string> => {
    // In a real app, this would call the Google Gemini API via the backend
    // For demo purposes, we'll simulate a response with a mock prompt
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock prompt based on the input
      const input = request.input.toLowerCase();
      let generatedPrompt = "";
      
      if (input.includes("appointment") || input.includes("schedule")) {
        generatedPrompt = `Hello, this is [Agent Name] calling from [Company Name]. 
I'm calling to confirm your appointment scheduled for tomorrow at [Time].
Could you please confirm if you'll be able to make it?
If you need to reschedule, we have openings on [Alternative Date] at [Alternative Time].
Thank you for your time, and we look forward to seeing you soon.`;
      } else if (input.includes("follow up") || input.includes("followup")) {
        generatedPrompt = `Hello, this is [Agent Name] from [Company Name].
I'm calling to follow up on our previous conversation regarding [Topic].
I wanted to check if you've had a chance to review the information we sent over.
Do you have any questions or concerns that I can address for you today?
Would you like me to provide any additional information or clarification?`;
      } else if (input.includes("survey") || input.includes("feedback")) {
        generatedPrompt = `Hello, this is [Agent Name] calling from [Company Name].
We value your opinion and would appreciate if you could participate in a brief survey about your recent experience with us.
This will only take about 2-3 minutes of your time.
Your feedback will help us improve our services.
Would you be willing to answer a few questions now?`;
      } else {
        generatedPrompt = `Hello, this is [Agent Name] calling from [Company Name].
I'm reaching out regarding ${request.input}.
I wanted to discuss this matter with you and provide any information you might need.
Is this a good time to talk, or would you prefer I call back at a more convenient time?
Thank you for your attention, and I look forward to speaking with you.`;
      }
      
      return generatedPrompt;
    } catch (error) {
      console.error("Error generating prompt:", error);
      throw new Error("Failed to generate prompt");
    }
  },
};

export default geminiService;