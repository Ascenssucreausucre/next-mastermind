"use client"
import fetcher from '@/utils/fetcher';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { SWRConfig } from 'swr';
export function Providers({ children } : { children: React.ReactNode }) {
 return (
 <MantineProvider defaultColorScheme='light'>
 <SWRConfig
 value={{
 fetcher: fetcher
 }}
 >
 <Notifications position='top-center' zIndex={1000} />
 {children}
 </SWRConfig>
 </MantineProvider>
 );
}
export default Providers;