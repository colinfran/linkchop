"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SettingsNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  className,
  items,
  ...props
}: SettingsNavigationProps) => {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-x-auto md:justify-center",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link className="mb-5 md:mb-0" href={item.href} key={item.href}>
          <Button
            className="w-full justify-start"
            variant={item.href === pathname ? "secondary" : "link"}
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
