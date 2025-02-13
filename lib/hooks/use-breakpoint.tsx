"use client"

import * as React from "react"

const BREAKPOINT_WIDTH = 768

export function useBreakpoint() {
	const [isMobile, setIsMobile] = React.useState(false)

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const onResize = () => setIsMobile(window.innerWidth <= BREAKPOINT_WIDTH)

			onResize()
			window.addEventListener("resize", onResize)
			return () => window.removeEventListener("resize", onResize)
		}
	}, [])

	return { isMobile }
}
