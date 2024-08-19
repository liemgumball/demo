import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editResource, getResourceById } from "@/services/resourse.js";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useUserStore } from "@/store/user.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "@/components/ui/use-toast.js";
// import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  content: z.string().min(5).max(100),
});

const Resource = () => {
  const { resourceId } = useParams();
  const { user } = useUserStore();
  const isAllowed = user.role === "admin" || user.role === "editor";

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const query = useQueryClient();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["resources", resourceId],
    queryFn: () => getResourceById(resourceId),
  });

  const { mutate } = useMutation({
    mutationKey: ["resources", resourceId],
    mutationFn: (resource) => editResource(resourceId, resource),
    onSuccess: () => toast({ title: "Update successfully" }),
    onSettled: () => query.invalidateQueries({ queryKey: ["resources"] }),
    // onError: () =>
    //   toast({ title: "Failed to update.", variant: "destructive" }),
  });

  // useEffect(() => {
  //   if (data)
  //     form.setValue({
  //       name: data.name,
  //       description: data.description,
  //       content: data.content,
  //     });
  // }, [data]);

  if (isLoading) return <Skeleton className="h-32 w-full rounded-lg" />;

  if (isError)
    return <h2 className="text-destructive">Failed to get resource details</h2>;

  const { id, name, description, content } = data;

  const onSubmit = (values) => {
    console.log(values);
    mutate(values);
  };

  return (
    <div className="container p-4 space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 rounded border max-w-3xl mx-auto"
        >
          <p className="text-muted-foreground text-base">Id: {id}</p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    {...field}
                    defaultValue={name}
                  />
                </FormControl>
                <FormDescription>This is your resource name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your description"
                    defaultValue={description}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your description.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your content"
                    defaultValue={content}
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isAllowed && (
            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isDirty}
            >
              Save
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Resource;
