
import { Icons } from "@/components/icons"

export const Space = () => {
    // return <>{" "}</>
    return <>&nbsp;</>
};

export function Loading() {
  return (
    <div className="container flex h-dvh mx-auto -mt-16 w-full flex-col items-center justify-center px-4">
      <Icons.spinner className="h-16 w-16 animate-spin text-primary" />
    </div>
  )
}

