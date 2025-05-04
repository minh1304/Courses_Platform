
'use client'
import { useForm } from '@tanstack/react-form';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const VerifyAccount = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const mutationFn = async (data: { code: string }) => {

    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`,{
      userId: userId,
      code: data.code
    })
    if (!res.status) {
      throw new Error(res.statusText);
    }
    return res;
  };
  const mutation = useMutation({
      mutationFn,
      onSuccess: async () => {
        console.log("Updated")
      },
      onError: (err: any) => {
        console.log(err)
      },
    });
  const form = useForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({value}) => {
      mutation.mutate(value);
    }
  });

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
              Active An Account
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
                  name="code"
                  children={(field) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Code:
                      </label>
                      <input
                        type="code"
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
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || mutation.isPending}
                    className="w-full mt-4"
                    variant="default"
                  >
                    {mutation.isPending ? "Verifying in..." : "Verify"}
                  </Button>
                )}
              />
              {mutation.isError && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {mutation.error instanceof Error
                    ? mutation.error.message
                    : "Verify failed. Please try again."}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyAccount
