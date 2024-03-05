import React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 mt-40 w-full shrink-0 border-t border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-600">
      <div className="container flex flex-row justify-between gap-2 p-4 md:gap-4 md:px-6 lg:gap-6">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
          <span>© 2023 LinkChop. All rights reserved.</span>
        </div>
        <nav className="flex items-center space-x-4 bg-gray-200 text-sm dark:bg-gray-600 ">
          <Link
            className="font-medium text-gray-900 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
            href="/terms"
          >
            Terms of Service
          </Link>
          <Link
            className="font-medium text-gray-900 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
