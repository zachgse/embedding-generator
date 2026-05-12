"use client"
import React from "react";
import clsx from "clsx";
import { Clipboard } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "./components/Loading";
import { toast } from "react-toastify";
import Error from "./components/Error";

type Inputs = {
  message: string
}

type GeneratedData = {
  text: string
  embedding: number[]
}

export default function Home() {
  const {
    reset,
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<Inputs>();
  const [isPending,startTransition] = React.useTransition();
  const [error,isError] = React.useState<boolean>(false);
  const [result,setResult] = React.useState<GeneratedData>(); 
  const [copied,setCopied] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> =  async(data) => {
    reset();
    startTransition(async() => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify(data.message)
        });
        if (!response.ok) isError(true);
        const result = await response.json();
        setResult({
          text:result.text,
          embedding:result.embedding
        });
      } catch (error) {
        console.error(error);
        isError(true);
      }
    })
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  }

  const handleCopy = async() => {
    if (result && result.embedding.length > 0) {
      try {
        await navigator.clipboard.writeText(result.embedding.toString());
        setCopied(true);
        toast.success("Successfully copied to clipboard.")
        setTimeout(() => setCopied(false),2000);
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 py-12">
      <p className="text-gray-500 text-xs font-semibold">
        The model used for embedding data is "gemini-embedding-2" which generates 3072 embedded values mainly used for RAGs
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea {...register("message", {required:"Message is required"})} onKeyDown={handleKeyDown}
          className={clsx("w-full h-40 rounded-lg border overflow-y-auto p-4",
          errors.message ? "border-red-500 hover:border-red-500 focus:outline-red-500"
                        : "border-gray-300 hover:border-gray-300 focus:outline-gray-300"
          )}/>
          {errors.message && (
            <p className="text-red-500 text-xs">A message is required.</p>
          )}
        <div className="w-full flex justify-end">
          <button type="submit" disabled={isPending}
            className={clsx(`border rounded-lg text-white px-8 py-2`,
                          isPending ? "border-green-300 bg-green-300 cursor-not-allowed" 
                                    : "border-green-500 bg-green-500 cursor-pointer hover:opacity-80"
            )}>
            Embed
          </button>
        </div>
      </form>
      {isPending && <Loading/>}
      {error && <Error/>}
      {result && (
      <div className="bg-gray-100 w-full min-h-fit flex flex-col gap-2 p-4">
        <div className="flex items-center">
          <p className="font-semibold">Embedded value for text:</p>
          <Clipboard onClick={handleCopy} size={24} className="ms-auto cursor-pointer"/>
        </div>
        <p>
          {result?.text}
        </p>
        <div className="flex flex-wrap text-xs mt-4">
        [
        {result.embedding.map((r,index) => (
          <p key={index}>
            {r}{result.embedding.length - 1 != index ? "," : ""}
          </p>
        ))}]
        </div>
      </div>
      )}
    </div>
  );
}
