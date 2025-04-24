import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import CallForm from "@/components/dashboard/CallForm";
import CallHistory from "@/components/dashboard/CallHistory";
import TranscriptViewer from "@/components/dashboard/TranscriptViewer";
import { blandService } from "@/services/blandService";
import { Call } from "@/types/call.types";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"newCall" | "history">("newCall");
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleCallInitiated = (call: Call) => {
    toast.success("Call initiated successfully", {
      description: `Call to ${call.phoneNumber} has been queued`,
    });
  };

  const handleViewTranscript = async (callId: string) => {
    try {
      const response = await blandService.getCallTranscript(callId);
      setTranscript(response.transcript);
    } catch (error) {
      console.error("Failed to fetch transcript:", error);
      toast.error("Failed to fetch transcript");
    }
  };

  const handleSelectCall = (call: Call) => {
    setSelectedCall(call);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <Button
                variant={activeTab === "newCall" ? "default" : "outline"}
                onClick={() => setActiveTab("newCall")}
                className="rounded-l-md"
              >
                New Call
              </Button>
              <Button
                variant={activeTab === "history" ? "default" : "outline"}
                onClick={() => setActiveTab("history")}
                className="rounded-r-md"
              >
                Call History
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                {activeTab === "newCall" ? (
                  <CallForm onCallInitiated={handleCallInitiated} />
                ) : (
                  <CallHistory 
                    onViewTranscript={handleViewTranscript} 
                    onSelectCall={handleSelectCall}
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TranscriptViewer 
                  transcript={transcript} 
                  call={selectedCall} 
                />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}