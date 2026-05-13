"use client";

import { useState, FormEvent } from "react";
import { addToWaitlist, type WaitlistSource } from "@/app/actions/waitlist";

interface WaitlistFormProps {
  source: WaitlistSource;
  placeholder?: string;
  buttonText?: string;
  loadingText?: string;
  successMessage?: string;
  errorMessage?: string;
  duplicateMessage?: string;
  className?: string;
}

export function WaitlistForm({
  source,
  placeholder = "Enter your email",
  buttonText = "Join Waitlist",
  loadingText = "Joining...",
  successMessage = "Thanks! You're on the waitlist.",
  errorMessage = "Something went wrong. Please try again.",
  duplicateMessage = "You're already on the waitlist!",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const result = await addToWaitlist(email, source);

      if (result.success) {
        setStatus("success");
        setMessage(successMessage);
        setEmail("");
      } else {
        setStatus("error");
        if (result.error === "duplicate") {
          setMessage(duplicateMessage);
        } else if (result.error === "invalid") {
          setMessage(result.message || errorMessage);
        } else {
          setMessage(result.message || errorMessage);
        }
      }
    } catch (err) {
      setStatus("error");
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className={`border-4 border-base-content bg-base-100 p-4 text-base-content brutal-shadow ${className}`}>
        <p className="font-mono-label text-sm font-medium uppercase">{message}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          required
          className="min-h-14 flex-1 border-4 border-base-content bg-base-100 px-4 font-mono-label text-sm uppercase outline-none focus:bg-primary disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="brutal-button brutal-button-dark px-5 py-3 disabled:translate-x-0 disabled:translate-y-0 disabled:opacity-60"
        >
          {isLoading ? loadingText : buttonText}
        </button>
      </form>
      {status === "error" && message && (
        <div className="mt-3 border-4 border-error bg-base-100 p-3 font-mono-label text-sm uppercase text-error">
          {message}
        </div>
      )}
    </div>
  );
}
