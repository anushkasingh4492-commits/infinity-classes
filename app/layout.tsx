import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Infinity Classes — Where excellence becomes a habit',
  description: 'Infinity Classes, Thane — CBSE & ICSE Classes 8–10 and Science for 11–12 with JEE Main, NEET and MHT CET preparation.',
}

export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}
