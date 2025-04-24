import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { geminiService } from "@/services/geminiService";

const formSchema = z.object({
  input: z.string().min(3, { message: "Input must be at least 3 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface PromptGeneratorProps {
  onPromptGenerated: (prompt: string) => void;
}

export default function PromptGenerator({ onPromptGenerated }: PromptGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const generatedPrompt = await geminiService.generatePrompt({
        input: values.input,
      });
      onPromptGenerated(generatedPrompt);
      toast.success("Prompt generated successfully");
    } catch (error) {
      console.error("Prompt generation failed:", error);
      toast.error("Failed to generate prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Description</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Call to confirm appointment for tomorrow" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Prompt"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}