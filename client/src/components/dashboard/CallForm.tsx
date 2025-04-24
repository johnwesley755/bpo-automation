import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PromptGenerator from "./PromptGenerator";
import { blandService } from "@/services/blandService";
import { Call } from "@/types/call.types";

const formSchema = z.object({
  userName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, { 
    message: "Please enter a valid phone number" 
  }),
  prompt: z.string().min(10, { message: "Prompt must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface CallFormProps {
  onCallInitiated: (call: Call) => void;
}

export default function CallForm({ onCallInitiated }: CallFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [promptType, setPromptType] = useState<"manual" | "auto">("manual");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      phoneNumber: "",
      prompt: "",
    },
  });

  // Use the promptType in a useEffect to log when it changes
  useEffect(() => {
    console.log(`Prompt type changed to: ${promptType}`);
    // You could also perform other actions based on the promptType here
  }, [promptType]);

  const handleGeneratedPrompt = (prompt: string) => {
    form.setValue("prompt", prompt);
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // Use promptType in the submission logic
      const callData = {
        ...values,
        promptGenerationType: promptType // Add this to track how the prompt was created
      };
      
      // Use callData instead of values
      const response = await blandService.initiateCall(callData);
      onCallInitiated({
        id: response.callId,
        userName: values.userName,
        phoneNumber: values.phoneNumber,
        prompt: values.prompt,
        status: response.status,
        timestamp: new Date().toISOString(),
        promptGenerationType: promptType, // Also include this in the call object
      });
      form.reset();
    } catch (error) {
      console.error("Call initiation failed:", error);
      toast.error("Failed to initiate call. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">New Call</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <Tabs 
              defaultValue="manual" 
              onValueChange={(value) => setPromptType(value as "manual" | "auto")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Prompt</TabsTrigger>
                <TabsTrigger value="auto">Auto-Generate</TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the script for the call..." 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="auto">
                <PromptGenerator onPromptGenerated={handleGeneratedPrompt} />
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Generated Prompt</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="min-h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Initiating Call..." : "Start Call"}
          </Button>
        </form>
      </Form>
    </div>
  );
}