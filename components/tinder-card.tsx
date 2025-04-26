"use client"

import { useState } from "react"
import Image from "next/image"
import { useSprings, animated, to as interpolate } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"

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

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// Used for card rotation
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(10deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export function TinderCard({ users, onSwipe }: TinderCardProps) {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

  // Create a bunch of springs using the helpers above
  const [props, api] = useSprings(users.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

    const isGone = gone.has(index)
    const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
    const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
    const scale = active ? 1.05 : 1 // Active cards lift up a bit

    // If the card is flicked out, call the onSwipe callback
    if (isGone && !active) {
      const direction = xDir > 0 ? "right" : "left"
      onSwipe(direction, index)
    }

    return {
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
    }
  })

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once.
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className="absolute w-full max-w-md" key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              touchAction: "none",
            }}
            className="relative h-[500px] rounded-xl overflow-hidden shadow-lg bg-white cursor-grab touch-none"
          >
            <Image src={users[i].images[0] || "/placeholder.svg"} alt={users[i].name} fill className="object-cover" />
            <div className="absolute top-5 left-5">
              <animated.div style={{ opacity: x.to({ range: [-100, -15, 15, 100], output: [1, 0, 0, 0] }) }}>
                <div className="border-4 border-red-500 rounded-lg px-4 py-2 font-bold text-red-500 transform rotate-[15deg]">
                  NOPE
                </div>
              </animated.div>
              <animated.div style={{ opacity: x.to({ range: [-100, -15, 15, 100], output: [0, 0, 0, 1] }) }}>
                <div className="border-4 border-green-500 rounded-lg px-4 py-2 font-bold text-green-500 transform rotate-[-15deg]">
                  LIKE
                </div>
              </animated.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">
                {users[i].name}, {users[i].age}
              </h2>
              <p className="text-sm opacity-90">{users[i].distance}</p>
              <p className="text-sm mt-2">{users[i].bio}</p>
            </div>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}
