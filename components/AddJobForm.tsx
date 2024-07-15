"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { JobSchema } from "@/app/_formSchemas/JobSchema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useJobs from "@/app/_hooks/useJobs";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";

const AddJobForm = () => {
  const { loading, setLoading } = useJobs();
  const router = useRouter();

  const form = useForm<z.infer<typeof JobSchema>>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      description: "",
      jobLocation: "",
      jobType: "Permanent",
      applicationDeadline: undefined,
      grade: "",
    },
  });

  //Function to create or Register a User
  async function onSubmit(job: z.infer<typeof JobSchema>) {
    setLoading(true);

    try {
      const response = await axios.post("/api/jobs", job);
      toast.success("Job Created successfully");
      setLoading(false);
      router.refresh();
      form.reset();
    } catch (error: any) {
      console.error("Error registering user:", error);
      toast.error(error);
      setLoading(false);
      form.reset();
    }
  }

  const formRef = useRef<ElementRef<"form">>(null);

  return (
    <>
      <Form {...form}>
        {/**loginRedirect && userResponse?.flag == true && <Loader2 />*/}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          ref={formRef}
        >
          <div className="flex gap-3">
            {" "}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="HR Officer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Harare" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nature of Job</FormLabel>
                  <FormControl>
                    {/* Fixed placeholder text and improved value mapping */}
                    <Select
                      {...field}
                      defaultValue="Select Job Type" // Common default value
                      value={field.value || "Permanent"} // Set default value to "Permanent"
                    >
                      <SelectTrigger className="w-[180px]">
                        {/* Trigger element */}
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Job Type</SelectLabel>
                          {/* Mapped options with correct values */}
                          <SelectItem value="Permanent">Permanent</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Closing Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        // Ensure selected value is a Date object:
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input placeholder="Job Grade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Summary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this job all about...."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <TailSpin
                visible={true}
                height="16"
                width="16"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="3"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddJobForm;
