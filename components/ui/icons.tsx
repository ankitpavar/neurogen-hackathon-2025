import { cn } from "@/lib/utils"

/* eslint-disable max-len */

function UserIcon({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn("size-4", className)}
			{...props}>
			<path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
		</svg>
	)
}

function AIIcon({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1000 1000"
			fill="none"
			className={cn("size-4", className)}
			{...props}>
			<path
				d="M420.278 381.366C440.865 360.779 471.885 356.302 501 356.302C530.115 356.302 561.135 360.779 581.722 381.366L600.678 400.322C632.779 432.423 638.091 482.199 647.477 526.616C652.434 550.07 664.019 572.402 682.233 590.616C732.279 640.662 813.419 640.662 863.465 590.616C913.511 540.57 913.511 459.43 863.465 409.384C845.251 391.17 822.919 379.585 799.465 374.628C755.048 365.242 705.272 359.93 673.171 327.829C641.07 295.728 635.758 245.952 626.372 201.535C621.415 178.081 609.83 155.749 591.616 137.535C541.57 87.4885 460.43 87.4885 410.384 137.535C392.17 155.749 380.585 178.081 375.628 201.535C366.242 245.952 360.93 295.728 328.829 327.829C296.728 359.93 246.952 365.242 202.535 374.628C179.081 379.585 156.749 391.17 138.535 409.384C88.4885 459.43 88.4885 540.57 138.535 590.616C188.581 640.662 269.721 640.662 319.767 590.616C337.981 572.402 349.566 550.07 354.523 526.616C363.909 482.199 369.221 432.423 401.322 400.322L420.278 381.366Z"
				fill="#FD6262"
			/>
			<path
				d="M410.384 862.465C460.43 912.511 541.57 912.511 591.616 862.465C641.662 812.419 641.662 731.279 591.616 681.233C541.57 631.187 460.43 631.187 410.384 681.233C360.338 731.279 360.338 812.419 410.384 862.465Z"
				fill="#FD6262"
			/>
		</svg>
	)
}

function SpinnerIcon({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn("size-4 animate-spin", className)}
			{...props}>
			<path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
		</svg>
	)
}

function IconMessage({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			fill="currentColor"
			className={cn("size-4", className)}
			{...props}>
			<path d="M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z" />
		</svg>
	)
}

function IconUsers({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			className={cn("size-4", className)}
			viewBox="0 0 256 256"
			{...props}>
			<path d="M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z" />
		</svg>
	)
}

function IconClock({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 256 256"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-4", className)}
			{...props}>
			<path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z"></path>
		</svg>
	)
}

function IconReload({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-4", className)}
			{...props}>
			<path
				fill="none"
				strokeLinecap="round"
				stroke-miterlimit="10"
				strokeWidth="32"
				d="m400 148-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"></path>
			<path d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"></path>
		</svg>
	)
}

function IconPlay({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-4", className)}
			{...props}>
			<path
				fill="none"
				strokeMiterlimit="10"
				strokeWidth="32"
				d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path>
			<path d="m216.32 334.44 114.45-69.14a10.89 10.89 0 0 0 0-18.6l-114.45-69.14a10.78 10.78 0 0 0-16.32 9.31v138.26a10.78 10.78 0 0 0 16.32 9.31z"></path>
		</svg>
	)
}

function IconExclamation({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-4", className)}
			{...props}>
			<path fill="none" d="M0 0h24v24H0V0z"></path>
			<path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
		</svg>
	)
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			viewBox="0 0 15 15"
			fill="none"
			className={cn("size-4", className)}
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"></path>
		</svg>
	)
}

function IconChevronDown({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-4", className)}
			{...props}>
			<path
				d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"></path>
		</svg>
	)
}

export {
	UserIcon,
	AIIcon,
	SpinnerIcon,
	IconMessage,
	IconUsers,
	IconCheck,
	IconClock,
	IconExclamation,
	IconReload,
	IconPlay,
	IconChevronDown
}
