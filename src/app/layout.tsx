import './globals.css'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import SupabaseProvider from "@/providers/SupabaseProvider"
import UserProvider from '../providers/userProvider'
import ModalProvider from '../providers/ModalProvider'
import ToasterProvider from '../providers/ToastProvider'
import getSongsByUserId from '../../actions/getSongsByUserId'
import Player from '../components/Player'
import getActiveProductsWithPrices from '../../actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Lisen to music!',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId()
  const products = await getActiveProductsWithPrices()
  return (
    <html lang="en">
      <body className={`${font.className} h-full`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            < Sidebar songs={userSongs}>
              <div className="
          bg-neutral-900
          h-full  
          w-full
          rounded-lg
          overflow-hidden
          overflow-y-auto
          text-white-500">
                {children}
              </div>
            </Sidebar>
            < Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html >
  )
}
