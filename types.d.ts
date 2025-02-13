import React from "react"

declare global {
	namespace JSX {
		interface IntrinsicElements {
			marquee: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				behavior?: "scroll" | "slide" | "alternate"
				direction?: "left" | "right" | "up" | "down"
				loop?: string | number
				scrollAmount?: string | number
				scrollDelay?: string | number
			}
		}
	}
}
