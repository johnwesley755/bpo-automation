export interface PromptGenerationRequest {
  input: string;
}

export interface PromptGenerationResponse {
  generatedPrompt: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}