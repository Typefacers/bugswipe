"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface User {
  id: number
  name: string
  age: number
  distance: string
  bio: string
  images: string[]
}

interface TinderCardProps {
  users: User[]
  onSwipe: (direction: "left" | "right", index: number) => void
}

export function TinderCard({ users, onSwipe }: TinderCardProps) {
  const [gone] = useState(() => new Set())
  const [xDir, setXDir] = useState(0)
  const [dragX, setDragX] = useState(0)

  return (
    <div className="relative w-full max-w-md h-[500px]">
      <AnimatePresence>
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            className="absolute w-full h-full"
            style={{
              zIndex: users.length - i,
            }}
            initial={{ scale: 0.8, opacity: 0, y: 100, rotate: i * -2 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotate: i * -2,
              x: gone.has(i) ? (200 + window.innerWidth) * (xDir > 0 ? 1 : -1) : 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              x: gone.has(i) ? (200 + window.innerWidth) * (xDir > 0 ? 1 : -1) : 0,
              rotate: xDir > 0 ? 30 : -30,
              opacity: 0,
              transition: {
                duration: 0.2
              }
            }}
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.5}
            onDrag={(event, info) => {
              setDragX(info.offset.x)
              setXDir(info.offset.x > 0 ? 1 : -1)
            }}
            onDragEnd={(event, info) => {
              const velocity = info.velocity.x
              const offset = info.offset.x
              const direction = velocity > 0 ? 1 : -1
              
              if (Math.abs(velocity) > 500 || Math.abs(offset) > 100) {
                gone.add(i)
                onSwipe(direction > 0 ? "right" : "left", i)
              } else {
                // Reset position if not swiped far enough
                setDragX(0)
              }
            }}
          >
            <motion.div
              className="relative h-full rounded-xl overflow-hidden shadow-lg bg-white cursor-grab touch-none"
              style={{
                rotate: dragX / 20,
                scale: Math.abs(dragX) > 50 ? 1.05 : 1,
              }}
            >
              <Image src={user.images[0] || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              <div className="absolute top-5 left-5">
                <motion.div
                  className="border-4 border-red-500 rounded-lg px-4 py-2 font-bold text-red-500 transform rotate-[15deg]"
                  animate={{
                    opacity: dragX < -15 ? 1 : 0,
                    scale: dragX < -15 ? 1.2 : 1,
                  }}
                >
                  NOPE
                </motion.div>
                <motion.div
                  className="border-4 border-green-500 rounded-lg px-4 py-2 font-bold text-green-500 transform rotate-[-15deg]"
                  animate={{
                    opacity: dragX > 15 ? 1 : 0,
                    scale: dragX > 15 ? 1.2 : 1,
                  }}
                >
                  LIKE
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold">
                  {user.name}, {user.age}
                </h2>
                <p className="text-sm opacity-90">{user.distance}</p>
                <p className="text-sm mt-2">{user.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
