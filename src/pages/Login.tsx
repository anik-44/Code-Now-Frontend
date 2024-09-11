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
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    dispatch(
      // @ts-expect-error('')
      login({
        credentials: values,
        toast,
        successCallback: () => navigate("/"),
        form,
      })
    );
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
                      className="text-md"
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
                      className="text-md"
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
