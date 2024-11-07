"use client";
import { Message, useAssistant } from "ai/react";

export default function Page() {
  const { status, messages, input, error, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/assistant" });

  return (
    <div className="flex flex-col gap-2">
      {error != null && (
        <div className="relative px-6 py-4 text-white bg-red-500 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}
      <div className="p-2">status: {status}</div>

      <div className="flex flex-col p-2 gap-2">
        {messages.map((m: Message) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <strong>{`${m.role}: `}</strong>
            {m.role !== "data" && m.content}
            {m.role === "data" && (
              <>
                {(m.data as any).toolName === "celsiusToFahrenheit" && (
                  <CelsiusToFarenheit value={(m.data as any).result.value} />
                )}
              </>
            )}
            <br />
            <br />
          </div>
        ))}

        {status === "in_progress" && (
          <div className="w-full h-8 max-w-md p-2 mb-8 bg-gray-300 rounded-lg dark:bg-gray-600 animate-pulse" />
        )}
      </div>

      <form
        onSubmit={submitMessage}
        className="fixed bottom-0 p-2 w-full mb-12"
      >
        <input
          disabled={status !== "awaiting_message"}
          value={input}
          onChange={handleInputChange}
          className="bg-zinc-100 w-full p-2"
        />
      </form>
    </div>
  );
}

function CelsiusToFarenheit(props: { value: number }) {
  return (
    <div className="p-4 drop-shadow-lg bg-red-300 rounded-xl w-auto">
      <p>Farenheit: {props.value}</p>
    </div>
  );
}
