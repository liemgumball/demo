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
import { Separator } from "@/components/ui/separator.jsx";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/services/auth.js";
import { isAuthenticated, setAuthentication } from "@/helpers/auth.js";
import { toast } from "@/components/ui/use-toast.js";
import { useUserStore } from "@/store/user.js";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
});

const Login = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit({ username, password }) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const { token, user } = await login(username, password);

      setAuthentication(token);
      setUser(user);

      if (isAuthenticated()) navigate("/");
    } catch (e) {
      console.error(e);
      toast({ title: "Failed to login!", variant: "destructive" });
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
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Separator />
          <Button asChild className="w-full" variant="secondary">
            <Link to="/register">Create new account?</Link>
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
