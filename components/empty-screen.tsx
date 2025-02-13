export function EmptyScreen() {
	return (
		<div className="mx-auto max-w-2xl px-4">
			<div className="bg-background flex flex-col gap-2 rounded-lg border p-4">
				<h1 className="text-lg font-semibold">Welcome to Loop Chatbot!</h1>
				<p className="text-muted-foreground leading-normal">
					You can interact here.
				</p>
			</div>
		</div>
	)
}
