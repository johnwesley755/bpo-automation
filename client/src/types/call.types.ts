export interface CallRequest {
  userName: string;
  phoneNumber: string;
  prompt: string;
  promptGenerationType?: "manual" | "auto"; // Add this optional property
}

export interface CallResponse {
  callId: string;
  status: string;
}

export interface Call {
  id: string;
  userName: string;
  phoneNumber: string;
  prompt: string;
  status: string;
  timestamp: string;
  promptGenerationType?: "manual" | "auto"; // Add this optional property
}

export interface CallTranscript {
  callId: string;
  transcript: string;
}