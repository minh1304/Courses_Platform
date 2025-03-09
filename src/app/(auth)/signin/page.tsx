"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  const form = useForm({
    defaultValues: {
      userName: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      alert(`${value.userName} login success`);
    },
  });
  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="tex-xl font-bold text-gray-900 md:text-2xl text-center">
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
                  name="userName"
                  validators={{
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      return !value ? "User Name is required" : undefined;
                    },
                  }}
                  children={(field) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        User Name:
                      </label>
                      <input
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
                    disabled={!canSubmit}
                    className="w-full mt-4"
                    variant="default"
                  >
                    {isSubmitting ? "..." : "Login"}
                  </Button>
                )}
              />
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

export default SignInPage;
