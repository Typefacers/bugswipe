"use client"

import { useState } from "react"
import { Heart, MessageCircle, Star, X, Zap, ArrowLeft, User, Shield, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { TinderCard } from "@/components/tinder-card"

// Sample user data
const users = [
  {
    id: 1,
    name: "Jessica",
    age: 28,
    distance: "2 miles away",
    bio: "Adventure seeker. Coffee enthusiast. Dog lover.",
    images: ["/placeholder.svg?height=600&width=400"],
  },
  {
    id: 2,
    name: "Michael",
    age: 32,
    distance: "5 miles away",
    bio: "Hiking, photography, and good food. Let's explore together!",
    images: ["/placeholder.svg?height=600&width=400"],
  },
  {
    id: 3,
    name: "Emma",
    age: 26,
    distance: "3 miles away",
    bio: "Bookworm, yoga instructor, and plant mom. Looking for genuine connections.",
    images: ["/placeholder.svg?height=600&width=400"],
  },
]

// Sample matches data
const matches = [
  {
    id: 101,
    name: "Sarah",
    lastMessage: "Hey, how's it going?",
    time: "2h",
    image: "/placeholder.svg?height=100&width=100",
    unread: true,
  },
  {
    id: 102,
    name: "David",
    lastMessage: "Want to grab coffee sometime?",
    time: "1d",
    image: "/placeholder.svg?height=100&width=100",
    unread: false,
  },
  {
    id: 103,
    name: "Lisa",
    lastMessage: "That sounds fun!",
    time: "3d",
    image: "/placeholder.svg?height=100&width=100",
    unread: false,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hey there! I noticed we both like hiking. What's your favorite trail?",
    time: "2:30 PM",
  },
  {
    id: 2,
    sender: "me",
    text: "Hi! I love the Pacific Crest Trail. Have you ever been?",
    time: "2:35 PM",
  },
  {
    id: 3,
    sender: "them",
    text: "Not yet, but it's on my bucket list! I've mostly hiked around Yosemite.",
    time: "2:38 PM",
  },
  {
    id: 4,
    sender: "me",
    text: "Yosemite is amazing! We should go hiking sometime if we match 😊",
    time: "2:42 PM",
  },
]

export function TinderApp() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("swipe")
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(sampleMessages)

  const currentUser = users[currentUserIndex]

  const handleSwipeLeft = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
    } else {
      // Reset to first user when we reach the end
      setCurrentUserIndex(0)
    }
  }

  const handleSwipeRight = () => {
    // Simulate a match
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
    } else {
      // Reset to first user when we reach the end
      setCurrentUserIndex(0)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "me",
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setNewMessage("")
    }
  }

  console.log(currentUser)
  console.log(users)

  return (
    <div className="mx-auto max-w-5xl">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="swipe" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              Swipe
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="swipe" className="mt-0">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md h-[500px]">
              <TinderCard
                users={users}
                onSwipe={(direction, index) => {
                  console.log(`Swiped ${direction} on user ${users[index].name}`)
                  if (currentUserIndex < users.length - 1) {
                    setCurrentUserIndex(currentUserIndex + 1)
                  } else {
                    // Reset to first user when we reach the end
                    setCurrentUserIndex(0)
                  }
                }}
              />
            </div>
            <div className="flex justify-center gap-4 p-4 mt-4">
              <Button
                onClick={handleSwipeLeft}
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50"
              >
                <X className="h-8 w-8 text-red-500" />
                <span className="sr-only">Dislike</span>
              </Button>
              <Button
                onClick={handleSwipeRight}
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-gray-300 hover:border-green-500 hover:bg-green-50"
              >
                <Heart className="h-8 w-8 text-green-500" />
                <span className="sr-only">Like</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <Star className="h-8 w-8 text-blue-500" />
                <span className="sr-only">Super Like</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-14 w-14 rounded-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50"
              >
                <Zap className="h-8 w-8 text-purple-500" />
                <span className="sr-only">Boost</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="mt-0">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">New Matches</h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {matches.map((match) => (
                <div key={match.id} className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-rose-500">
                      <AvatarImage src={match.image || "/placeholder.svg"} alt={match.name} />
                      <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                  <span className="text-sm mt-1">{match.name}</span>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Messages</h2>
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100",
                    match.unread && "bg-rose-50",
                  )}
                  onClick={() => {
                    setSelectedMatch(match.id)
                    setActiveTab("messages")
                  }}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={match.image || "/placeholder.svg"} alt={match.name} />
                    <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{match.name}</h3>
                      <span className="text-xs text-gray-500">{match.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>
                  </div>
                  {match.unread && <div className="h-2 w-2 rounded-full bg-rose-500"></div>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="mt-0">
          <div className="bg-white rounded-xl shadow-lg max-w-md mx-auto overflow-hidden">
            {selectedMatch ? (
              <>
                <div className="flex items-center gap-3 p-4 border-b">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedMatch(null)}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={matches.find((m) => m.id === selectedMatch)?.image || "/placeholder.svg"}
                      alt={matches.find((m) => m.id === selectedMatch)?.name}
                    />
                    <AvatarFallback>{matches.find((m) => m.id === selectedMatch)?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{matches.find((m) => m.id === selectedMatch)?.name}</h3>
                    <p className="text-xs text-gray-500">Online now</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Shield className="h-4 w-4" />
                    <span className="sr-only">Safety</span>
                  </Button>
                </div>

                <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "max-w-[80%] p-3 rounded-lg",
                        message.sender === "me"
                          ? "bg-rose-500 text-white self-end rounded-br-none"
                          : "bg-gray-100 self-start rounded-bl-none",
                      )}
                    >
                      <p>{message.text}</p>
                      <p className={cn("text-xs mt-1", message.sender === "me" ? "text-rose-100" : "text-gray-500")}>
                        {message.time}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="bg-rose-500 hover:bg-rose-600">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">Your messages</h3>
                <p className="text-gray-500 mb-4">When you match with people, you can message them here.</p>
                <Button
                  onClick={() => setActiveTab("swipe")}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                >
                  Start Swiping
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
