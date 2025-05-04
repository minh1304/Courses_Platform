"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { getSession, signIn, useSession } from "next-auth/react";

const SignIn = () => {
  const { data: session, status } = useSession();
  const mutationFn = async (userData: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: userData.email,
      password: userData.password,
    });

    if (res?.error) {
      if (res.error == "Inactive Account") {
        const userRes = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-user-id`,{
          email: userData.email
        })

        const userId = userRes.data.userId;
        router.push(`/verifyAccount?userId=${userId}`);
      }
      throw new Error(res.error);
    }
    return res;
  };
  const router = useRouter();
  const mutation = useMutation({
    mutationFn,
    onSuccess: async () => {
      router.refresh();

      const session = await getSession(); // this might still be null too early
      if (session?.user?.usertype === "teacher") {
        router.push("/teacher/courses");
      } else {
        router.push("/user/courses");
      }
    },
    onError: (err: any) => {
      if (err.message == "Inactive Account") {
        console.log(err)
      }
    },
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });
  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
              Sign In An Account
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <form.Field
                  name="email"
                  validators={{
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      return !value ? "Email is required" : undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {field.state.meta.errors && (
                        <p className="text-red-500 text-sm mt-1">
                          {field.state.meta.errors}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <form.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "Password is required"
                        : value.length < 6
                        ? "Password must be at least 6 characters"
                        : undefined,
                  }}
                  children={(field) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password:
                      </label>
                      <input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {field.state.meta.errors && (
                        <p className="text-red-500 text-sm mt-1">
                          {field.state.meta.errors}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || mutation.isPending}
                    className="w-full mt-4"
                    variant="default"
                  >
                    {mutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                )}
              />
              {mutation.isError && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Login failed. Please try again."}
                </p>
              )}
            </form>
            <div className="flex items-center">
              <div className="text-sm m-auto">
                Not a member yet?{" "}
                <Link href="/signup" className="text-blue-600 font-bold">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
