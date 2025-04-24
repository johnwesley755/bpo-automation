import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, User, Phone, Calendar, Activity } from "lucide-react";
import { Call } from "@/types/call.types";

interface TranscriptViewerProps {
  transcript: string | null;
  call: Call | null;
}

export default function TranscriptViewer({ transcript, call }: TranscriptViewerProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "in_progress":
        return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Call Transcript
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {call ? (
          <div className="grid grid-cols-2 gap-4 mb-4 bg-muted/30 p-4 rounded-md border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Name:</span>
              <span className="text-sm ml-auto">{call.userName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Phone:</span>
              <span className="text-sm ml-auto">{call.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date:</span>
              <span className="text-sm ml-auto">
                {format(new Date(call.timestamp), "MMM d, yyyy h:mm a")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm ml-auto">{getStatusBadge(call.status)}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 bg-muted/30 rounded-md border">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-muted-foreground">Select a call to view details</p>
          </div>
        )}
        
        <div className="border rounded-md bg-muted/30 overflow-hidden">
          {transcript ? (
            <div className="p-1">
              <div className="bg-card rounded-md">
                <ScrollArea className="h-[400px] p-4">
                  <div className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {transcript.split('\n').map((line, index) => {
                      // Highlight speaker parts
                      if (line.startsWith('Agent:')) {
                        return (
                          <div key={index} className="mb-2">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">Agent: </span>
                            <span>{line.substring(6)}</span>
                          </div>
                        );
                      } else if (line.startsWith('Customer:')) {
                        return (
                          <div key={index} className="mb-2">
                            <span className="font-semibold text-green-600 dark:text-green-400">Customer: </span>
                            <span>{line.substring(9)}</span>
                          </div>
                        );
                      } else {
                        return <div key={index} className="mb-2">{line}</div>;
                      }
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-2 opacity-30" />
              <p className="text-muted-foreground">
                {call ? "No transcript available for this call" : "Select a call to view transcript"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}