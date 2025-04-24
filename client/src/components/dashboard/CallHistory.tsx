import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { storageService } from "@/services/storageService";
import { Call } from "@/types/call.types";

interface CallHistoryProps {
  onViewTranscript: (callId: string) => void;
  onSelectCall: (call: Call) => void;
}

export default function CallHistory({ onViewTranscript, onSelectCall }: CallHistoryProps) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const callHistory = await storageService.getCallHistory();
        setCalls(callHistory);
      } catch (error) {
        console.error("Failed to fetch call history:", error);
        toast.error("Failed to load call history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, []);

  const handleViewTranscript = (call: Call) => {
    onSelectCall(call);
    onViewTranscript(call.id);
  };

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

  if (isLoading) {
    return <div className="text-center py-8">Loading call history...</div>;
  }

  if (calls.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No call history available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Call History</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>
                  {format(new Date(call.timestamp), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell>{call.userName}</TableCell>
                <TableCell>{call.phoneNumber}</TableCell>
                <TableCell>{getStatusBadge(call.status)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewTranscript(call)}
                  >
                    View Transcript
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}