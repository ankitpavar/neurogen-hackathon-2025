import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const LogoutButton = () => {
	return (
		<a className={cn(buttonVariants({ variant: "ghost" }))} href="/auth/logout">
			Log out
		</a>
	)
}
