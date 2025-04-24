import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Call } from "@/types/call.types";

interface TranscriptViewerProps {
  transcript: string | null;
  call: Call | null;
}

export default function TranscriptViewer({ transcript, call }: TranscriptViewerProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Call Transcript</h2>
      
      {call ? (
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Name:</span>
            <span className="text-sm">{call.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Phone:</span>
            <span className="text-sm">{call.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Date:</span>
            <span className="text-sm">
              {format(new Date(call.timestamp), "MMM d, yyyy h:mm a")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Status:</span>
            <span className="text-sm">{call.status}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 mb-4">
          <p className="text-gray-500 dark:text-gray-400">Select a call to view details</p>
        </div>
      )}
      
      <div className="border rounded-md p-4 bg-muted/50">
        {transcript ? (
          <ScrollArea className="h-[400px]">
            <div className="whitespace-pre-wrap text-sm">
              {transcript}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">
              {call ? "No transcript available for this call" : "Select a call to view transcript"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}