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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone } from "lucide-react";
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
  const [countryCode, setCountryCode] = useState("+1");

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
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Phone className="h-5 w-5 text-primary" />
        New Call
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-background" 
                    {...field} 
                  />
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
                <div className="flex gap-2">
                  <Select 
                    defaultValue="+1" 
                    onValueChange={(value) => setCountryCode(value)}
                  >
                    <SelectTrigger className="w-[110px] bg-background">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1 (US)</SelectItem>
                      <SelectItem value="+44">+44 (UK)</SelectItem>
                      <SelectItem value="+91">+91 (IN)</SelectItem>
                      <SelectItem value="+61">+61 (AU)</SelectItem>
                      <SelectItem value="+86">+86 (CN)</SelectItem>
                      <SelectItem value="+49">+49 (DE)</SelectItem>
                      <SelectItem value="+33">+33 (FR)</SelectItem>
                      <SelectItem value="+81">+81 (JP)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormControl>
                    <Input 
                      placeholder="Phone number" 
                      className="bg-background flex-1"
                      value={field.value.startsWith("+") ? field.value.substring(countryCode.length) : field.value}
                      onChange={(e) => {
                        // Only allow numbers
                        const value = e.target.value.replace(/[^\d]/g, '');
                        field.onChange(countryCode + value);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4 bg-background/50 p-4 rounded-md border">
            <Tabs 
              defaultValue="manual" 
              onValueChange={(value) => setPromptType(value as "manual" | "auto")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
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
                          className="min-h-32 bg-background"
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
                          className="min-h-32 bg-background"
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
          
          <Button 
            type="submit" 
            className="w-full font-semibold" 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Initiating Call..." : "Start Call"}
          </Button>
        </form>
      </Form>
    </div>
  );
}