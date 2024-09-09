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
import { loginSchema } from "@/schema/authSchema";
import { Link, useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const data = await authService.login(values);
      if (data.status === 200) {
        form.reset();
        toast({
          title: "Login Successful",
        });
        navigate("/");
      } else {
        form.reset();
        toast({
          title: "Login Failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <div className=" py-5 h-screen my-auto flex justify-center items-center ">
      <div className="w-96 shadow-lg p-10 rounded-lg">
        <div className="my-5">
          <h1 className="text-3xl font-bold py-5">Login</h1>
          <p className="pt-1 ">
            {"Doesn't have an account yet?"}
            <Link
              to="/register"
              className="underline text-blue-900  font-bold pl-2"
            >
              SignUp
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
