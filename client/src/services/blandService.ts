
import { CallRequest, CallResponse, CallTranscript } from "@/types/call.types";
import { storageService } from "./storageService";

// Mock implementation for demo purposes
export const blandService = {
  initiateCall: async (callData: CallRequest): Promise<CallResponse> => {
    // In a real app, this would call the Bland.ai API via the backend
    // For demo purposes, we'll simulate a successful call
    
    const mockResponse: CallResponse = {
      callId: `call-${Date.now()}`,
      status: "in_progress",
    };
    
    // Store the call in local storage for demo purposes
    const call = {
      id: mockResponse.callId,
      userName: callData.userName,
      phoneNumber: callData.phoneNumber,
      prompt: callData.prompt,
      status: mockResponse.status,
      timestamp: new Date().toISOString(),
    };
    
    await storageService.saveCall(call);
    
    return mockResponse;
  },

  getCallStatus: async (callId: string): Promise<string> => {
    // In a real app, this would check the status with Bland.ai API
    // For demo purposes, we'll use the callId to get a deterministic status
    
    // Get the call from storage first
    try {
      const call = await storageService.getCallById(callId);
      if (call) {
        return call.status;
      }
    } catch (error) {
      console.error(`Error fetching status for call ${callId}:`, error);
    }
    
    // Fallback to random status if call not found
    const statuses = ["in_progress", "completed", "failed"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Update the call status in storage
    await storageService.updateCallStatus(callId, randomStatus);
    
    return randomStatus;
  },

  getCallTranscript: async (callId: string): Promise<CallTranscript> => {
    // In a real app, this would fetch the transcript from Bland.ai API
    // For demo purposes, we'll return a mock transcript
    
    return {
      callId,
      transcript: `This is a mock transcript for call ${callId}.\n\nAgent: Hello, this is a test call. How can I help you today?\n\nCustomer: Hi, I'm just responding to your call about my appointment.\n\nAgent: Yes, I'm calling to confirm your appointment for tomorrow at 2 PM. Will you be able to make it?\n\nCustomer: Yes, I'll be there. Thank you for confirming.\n\nAgent: Great! We look forward to seeing you tomorrow. Have a nice day!\n\nCustomer: You too. Goodbye.`,
    };
  },
};