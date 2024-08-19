import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/services/auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast.js";

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit({ username, password }) {
    try {
      await register(username, password, "user");
      navigate("/login");
    } catch (e) {
      toast({
        title: "Failed to register!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 rounded border max-w-xl mx-auto"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your secret password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your password confirmation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
