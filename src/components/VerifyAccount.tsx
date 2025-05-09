
'use client'
import { useForm } from '@tanstack/react-form';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const VerifyAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null); // countdown in seconds

  useEffect(() => {
    if (!userId) return;

    const fetchExpiredTime = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-expired-time`,{userid: userId}
        );
        const expiredAt = new Date(res.data.data.expiredAt).getTime();
        const now = new Date().getTime();
        const secondsLeft = Math.max(0, Math.floor((expiredAt - now) / 1000));
        setCountdown(secondsLeft);
      } catch (err) {
        console.error("Failed to fetch expired time", err);
      }
    };

    fetchExpiredTime();
  }, [userId]);

  // Countdown logic
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);


  const handleLoginClick = async () => {
    router.push("/signin", {
      scroll: false,
    });
  }

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
        setShowDialog(true);
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

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResend = async () => {
    if (!userId) return;
  
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-mail`, {
        userid: userId,
      });
  
      // After resending, re-fetch the expiration time
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-expired-time`, {
        userid: userId,
      });
  
      const expiredAt = new Date(res.data.data.expiredAt).getTime();
      const now = new Date().getTime();
      const secondsLeft = Math.max(0, Math.floor((expiredAt - now) / 1000));
      setCountdown(secondsLeft);
    } catch (error) {
      console.error("Failed to resend email", error);
    }
  };
  
  return (
    <>
      <section className="bg-gray-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
                Active Account
              </h1>
              {countdown !== null && (
                <p className="text-sm text-center text-gray-600">
                  Code expires in:{" "}
                  <span className="font-medium text-blue-500">
                    {formatTime(countdown)}
                  </span>
                </p>
              )}
              {countdown === 0 && (
                <div className="text-center mt-4">
                  <Button onClick={() => handleResend()} variant="outline">
                    Resend Code
                  </Button>
                </div>
              )}
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
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Email</DialogTitle>
            <DialogDescription>
              Your account updated, please try login again
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleLoginClick()}>Go to sign in</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VerifyAccount
