'use client'

import { useForm } from '@tanstack/react-form';
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const SignUpPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      alert(`${value.email} created success`);
    },
  });
  return (
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
                  name="phone"
                  validators={{
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      return !value
                        ? "Phone is required"
                        : !/^\d+$/.test(value)
                        ? "Phone must contain only numbers"
                        : value.length < 10
                        ? "Phone must be at least 10 digits"
                        : undefined;
                    },
                  }}
                  children={(field) => {
                    return (
                      <>
                        <label
                          className="block text-sm font-medium text-gray-700"
                          htmlFor={field.name}
                        >
                          Phone:
                        </label>
                        <input
                          type="text"
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
                    );
                  }}
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <form.Field
                    name="firstName"
                    validators={{
                      onChangeAsyncDebounceMs: 500,
                      onChangeAsync: async ({ value }) => {
                        return !value
                          ? "A first name is required"
                          : value.length < 3
                          ? "First name must be at least 3 characters"
                          : undefined;
                      },
                    }}
                    children={(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name:
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
                <div className="flex-1">
                  <form.Field
                    name="lastName"
                    children={(field) => (
                      <>
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name:
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
              </div>

              <div>
                <form.Field
                  name="userName"
                  validators={{
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      return !value
                        ? "User Name is required"
                        : value.length < 3
                        ? "User Name must be at least 3 characters"
                        : undefined;
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
  );
}

export default SignUpPage;