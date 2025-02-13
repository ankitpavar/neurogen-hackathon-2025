import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

import { SidebarProvider } from "@/lib/hooks/use-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"font-sans antialiased",
					GeistSans.variable,
					GeistMono.variable
				)}>
				<NextThemesProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
						<SidebarProvider>
							<TooltipProvider>
								<div className="">
									<main>
										{children}
									</main>
								</div>
							</TooltipProvider>
						</SidebarProvider>
				</NextThemesProvider>
				<Toaster position="top-center" richColors />
			</body>
		</html>
	)
}
