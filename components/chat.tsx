"use client"

import { useRouter } from "next/navigation"
import { Message } from "ai"
import { useChat } from "ai/react"

import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatList } from "@/components/chat-list"
import { ChatPanel } from "@/components/chat-panel"
import { EmptyScreen } from "@/components/empty-screen"

import { useState } from "react"
import { Maximize2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect } from "react"

export interface ChatProps extends React.ComponentProps<"div"> {
	initialMessages?: Message[]
	id: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const { messages, input, setInput, handleSubmit, append, isLoading } = useChat({
    id,
    initialMessages,
    body: { id },
    api: "/api/chat",
    sendExtraMessageFields: true,
    onResponse: response => {
      if (!response.ok) {
        router.push("/")
      }
    },
    onError: error => {
      console.log(error, "erorr")
    }
  })

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()
  const { 
    messagesRef: dialogMessagesRef, 
    scrollRef: dialogScrollRef, 
    visibilityRef: dialogVisibilityRef,
    isAtBottom: dialogIsAtBottom,
    scrollToBottom: dialogScrollToBottom 
  } = useScrollAnchor()

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
      if (isDialogOpen) {
        dialogScrollToBottom()
      }
    }
  }, [messages, isDialogOpen])
console.log(messages, 'messages');

  return (
    <>
      {/* Main chat component */}
      <div className="bg-zink-100 flex size-full flex-col pl-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Loop Assistant</h2>
          <button 
            onClick={() => setIsDialogOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Maximize2 className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="my-4 h-px bg-gray-200"></div>
        <ScrollArea
          className={cn("flex grow overflow-auto pt-10 pb-4", className)}
          data-scroll-lock="false"
          viewportRef={scrollRef}>
          <div ref={messagesRef}>
            {messages.length ? (
              <ChatList id={id} messages={messages} isLoading={isLoading} />
            ) : (
              <EmptyScreen />
            )}
            <div className="h-px w-full" ref={visibilityRef} />
          </div>
        </ScrollArea>
        <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
          append={append}
          messages={messages}
        />
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[800px] h-[80vh] max-w-[90vw] flex flex-col">
          <DialogHeader>
            <DialogTitle>Loop Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <ScrollArea
              className={cn("h-full flex flex-col", className)}
              data-scroll-lock="false"
              viewportRef={dialogScrollRef}>
              <div ref={dialogMessagesRef}>
                {messages.length ? (
                  <ChatList id={id} messages={messages} isLoading={isLoading} />
                ) : (
                  <EmptyScreen />
                )}
                <div className="h-px w-full" ref={dialogVisibilityRef} />
              </div>
            </ScrollArea>
          </div>
          <div className="mt-4">
            <ChatPanel
              id={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isAtBottom={dialogIsAtBottom}
              scrollToBottom={dialogScrollToBottom}
              append={append}
              messages={messages}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
