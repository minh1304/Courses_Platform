'use client'

import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const SignUp = () => {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [emailSentTo, setEmailSentTo] = useState('');
  
  
    const handleVerifyClick = async () => {
      const userRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-user-id`,
        {
          email: emailSentTo,
        })
        const userId = userRes.data.data.userId;
        router.push(`/verifyAccount?userId=${userId}`);
    }
    const mutationFn = async (userData: UserSignUp) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
        {
          email: userData.email,
          fullname: userData.fullName,
          password: userData.password,
        }
      );
      if (res.status !== 201 && res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
  
    };
    const mutation = useMutation({
      mutationFn,
      onSuccess: async (_res, variables) => {
        setEmailSentTo(variables.email);
        setShowDialog(true);
      },
      onError: (error) => {
        alert(`Signup failed: ${error.message}`);
      },
    });
    const form = useForm({
      defaultValues: {
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      },
      onSubmit: async ({ value }) => {
        mutation.mutate(value);
      },
    });
  return (
    <>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
                Create an account
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
                        return !value
                          ? "An email is required"
                          : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                              value
                            )
                          ? "Invalid Email Address"
                          : undefined;
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

                <div>
                  <form.Field
                    name="fullName"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        return !value
                          ? "Full Name is required"
                          : value.length < 3
                          ? "Full Name must be at least 3 characters"
                          : undefined;
                      },
                    }}
                    children={(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name:
                        </label>
                        <input
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

                <div>
                  <form.Field
                    name="confirmPassword"
                    validators={{
                      onChangeListenTo: ["password"],
                      onChange: ({ value, fieldApi }) => {
                        if (value !== fieldApi.form.getFieldValue("password")) {
                          return "Passwords do not match";
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <div>
                        <label>
                          <div className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                          </div>
                          <input
                            type="password"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          {field.state.meta.errors && (
                            <p className="text-red-500 text-sm mt-1">
                              {field.state.meta.errors}
                            </p>
                          )}
                        </label>
                      </div>
                    )}
                  </form.Field>
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
                      {isSubmitting ? "..." : "Create"}
                    </Button>
                  )}
                />
              </form>
              <div className="flex items-center">
                <div className="text-sm m-auto">
                  Already a member?{" "}
                  <Link href="/signin" className="text-blue-600 font-bold">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Email</DialogTitle>
            <DialogDescription>
              We've sent a verification email to <strong>{emailSentTo}</strong>.
              Please check your inbox and follow the instructions to activate
              your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleVerifyClick()}>
              Go to Verify Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SignUp
