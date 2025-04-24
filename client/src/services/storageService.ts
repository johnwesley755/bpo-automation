import { Call } from "@/types/call.types";

// Mock implementation for demo purposes
export const storageService = {
  saveCall: async (call: Call): Promise<void> => {
    try {
      // In a real app, this would save to a backend database
      // For demo purposes, we'll use localStorage
      const existingCallsStr = localStorage.getItem("calls");
      const existingCalls: Call[] = existingCallsStr ? JSON.parse(existingCallsStr) : [];
      
      // Add the new call to the array
      existingCalls.push(call);
      
      // Save back to localStorage
      localStorage.setItem("calls", JSON.stringify(existingCalls));
    } catch (error) {
      console.error("Error saving call:", error);
      throw new Error("Failed to save call data");
    }
  },
  
  getCallHistory: async (): Promise<Call[]> => {
    try {
      // In a real app, this would fetch from a backend database
      // For demo purposes, we'll use localStorage
      const callsStr = localStorage.getItem("calls");
      if (!callsStr) {
        return [];
      }
      
      const calls: Call[] = JSON.parse(callsStr);
      
      // Sort by timestamp (newest first)
      return calls.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error("Error fetching call history:", error);
      throw new Error("Failed to fetch call history");
    }
  },
  
  getCallById: async (callId: string): Promise<Call | null> => {
    try {
      const callsStr = localStorage.getItem("calls");
      if (!callsStr) {
        return null;
      }
      
      const calls: Call[] = JSON.parse(callsStr);
      return calls.find(call => call.id === callId) || null;
    } catch (error) {
      console.error("Error fetching call:", error);
      throw new Error("Failed to fetch call data");
    }
  },
  
  updateCallStatus: async (callId: string, status: string): Promise<void> => {
    try {
      const callsStr = localStorage.getItem("calls");
      if (!callsStr) {
        return;
      }
      
      const calls: Call[] = JSON.parse(callsStr);
      const updatedCalls = calls.map(call => 
        call.id === callId ? { ...call, status } : call
      );
      
      localStorage.setItem("calls", JSON.stringify(updatedCalls));
    } catch (error) {
      console.error("Error updating call status:", error);
      throw new Error("Failed to update call status");
    }
  },
};

export default storageService;