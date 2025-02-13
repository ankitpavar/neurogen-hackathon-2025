"use client"

import * as React from "react"

import { useBreakpoint } from "@/lib/hooks/use-breakpoint"

const LOCAL_STORAGE_KEY = "sidebar"

interface SidebarContext {
	isTouched: boolean
	isSidebarOpen: boolean
	toggleSidebar: () => void
	isLoading: boolean
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
	undefined
)

export function useSidebar() {
	const context = React.useContext(SidebarContext)
	if (!context) {
		throw new Error("useSidebarContext must be used within a SidebarProvider")
	}
	return context
}

interface SidebarProviderProps {
	children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
	const { isMobile } = useBreakpoint()

	const [isTouched, setIsTouched] = React.useState(false)
	const [isOpen, setIsOpen] = React.useState(true)
	const [isExtended, setIsExtended] = React.useState(true)
	const [isLoading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const value = localStorage.getItem(LOCAL_STORAGE_KEY)
		if (value) {
			setIsOpen(JSON.parse(value))
			setIsExtended(JSON.parse(value))
		}
		setLoading(false)
	}, [])

	const toggleSidebar = React.useCallback(() => {
		const func = isMobile ? setIsOpen : setIsExtended
		setIsTouched(true)
		func(value => {
			const newState = !value
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
			return newState
		})
	}, [isMobile])

	if (isLoading) return null

	return (
		<SidebarContext.Provider
			value={{
				isTouched: isTouched,
				isSidebarOpen: isMobile ? isOpen : isExtended,
				toggleSidebar,
				isLoading
			}}>
			{children}
		</SidebarContext.Provider>
	)
}
