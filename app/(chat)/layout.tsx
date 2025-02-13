
interface ChatLayoutProps {
	children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
	return (
		<>
			<div className="flex w-full flex-col overflow-hidden">
				{children}
			</div>
		</>
	)
}
