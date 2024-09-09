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
import { registerSchema } from "@/schema/authSchema";
import authService from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  // submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const data = await authService.register(values);
      if (data.status === 201) {
        form.reset();
        toast({
          title: "Registered Successfully",
        });
        navigate("/login");
      } else {
        form.reset();
        toast({
          title: "Registered Failed",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className=" py-5 h-screen my-auto flex justify-center items-center ">
      <div className="w-96 shadow-lg p-10 rounded-lg">
        <div className="my-5">
          <h1 className="text-3xl font-bold py-5">Register</h1>
          <p className="pt-1 ">
            Already have an account?
            <Link
              to="/login"
              className="underline text-blue-900  font-bold pl-2"
            >
              Login
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      className="text-lg"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="text-lg"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      className="text-lg"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
