"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useUsers from "@/app/_hooks/useUsers";
import { UserSchema } from "@/app/_formSchemas/userSchema";

import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";

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

import { TailSpin } from "react-loader-spinner";

interface PersonalInfoFormProps {
  handleClick: () => void;
}

export const PersonalInfoForm = ({ handleClick }: PersonalInfoFormProps) => {
  const { loader, setLoader, error } = useUsers();
  const [userInfo, setUserInfo] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      Religion: "",
      Nationality: "",
      NationalIdNumber: "",
    },
  });

  // Function to create or register a user
  const onSubmit = async (user: z.infer<typeof UserSchema>) => {
    setLoader(true);

    try {
      const response = await axios.post("/api/register", user);
      toast.success(response.data.message);
      setLoader(false);
      setIsClosed(true);
      form.reset();
    } catch (error: any) {
      console.error("Error registering user:", error);
      toast.error(error);
      setLoader(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full gap-3 justify-between">
          <FormField
            control={form.control}
            name="Religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl>
                  <Input placeholder="Religion" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input placeholder="Religion" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="PhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Religion" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="MaritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <FormControl>
                  <Input placeholder="Religion" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-between">
          <FormField
            control={form.control}
            name="DateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="Religion" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="Zimbabwe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="NationalIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id Number</FormLabel>
              <FormControl>
                <Input placeholder="63-1682652 Z 07" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isClosed ? (
          <Button type="submit" className="w-full" disabled={loader}>
            {loader ? (
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
              "Save"
            )}
          </Button>
        ) : (
          <Button onClick={handleClick}>Close</Button>
        )}
      </form>
    </Form>
  );
};
