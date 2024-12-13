import { Link } from "react-router-dom"
import { Space } from "./utils"
export default function Footer() {
  return (
    <footer className="border-t px-4">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            The source code is available on<Space/>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/faq" className="text-sm underline underline-offset-4">
            FAQ
          </Link>
          <Link to="/contact" className="text-sm underline underline-offset-4">
            Contact
          </Link>
          <Link to="/privacy" className="text-sm underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm underline underline-offset-4">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

