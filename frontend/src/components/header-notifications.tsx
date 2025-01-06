import { User } from "@/lib/types"
import { authPrefix } from "@/pages/auth/constants.auth";
import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

export const VerifyAccountHeaderBar = ({user}: {user: User}) => {
  const encodedEmail = encodeURIComponent(user.email);
  const firstName = user.name.split(' ')[0];
  return (
    <div className=" bg-transparent text-white  bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-1 text-sm flex justify-between items-center">
          <span>✨ Welcome {firstName} !</span>
          <Link
            to={`${authPrefix}/verify-email?email=${encodedEmail}`}
            className="flex items-center hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify Account Please
            <ExternalLink className="ml-1" size={14} />
          </Link>
        </div>
    </div>
  )
}