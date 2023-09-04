import Game from './Components/game'
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Game />
    </main>
  )
}
