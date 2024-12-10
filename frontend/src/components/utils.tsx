
import { Icons } from "@/components/icons"

export const Space = () => {
    return <>{" "}</>
};

export function Loading() {
  return (
    <div className="container flex h-screen mx-auto -mt-16 w-screen flex-col items-center justify-center px-4">
      <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
}

