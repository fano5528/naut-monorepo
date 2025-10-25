"use client"

import type * as React from "react"
import { PanelTop, Edit3, BarChart2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"

interface Site {
  userId: string;
  domain: string;
  name: string;
  footerComponentName: string;
  headerComponentName: string;
  backgroundColor1: string;
  backgroundColor2: string;
  color1: string;
  color1Hover: string;
  metaId: string | null;
  // ... include other fields as needed
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  siteData: Site;
}

export function AppSidebar({ siteData, ...props }: AppSidebarProps) {
  const menuItems = [
    { icon: PanelTop, label: "Sitios", href: `/` },
    { icon: Edit3, label: "Editor", href: `/sitio/${siteData.domain}/paginas` },
    { icon: BarChart2, label: "Analytics", href: `/sitio/${siteData.domain}/analytics` },
    // { icon: Settings, label: "Ajustes", href: `/ajustes` },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-2">
          <Image 
            className="h-7 w-auto" 
            src="https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/logo.png" 
            alt="Logo" 
            width={1000} 
            height={1000}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <a href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center space-x-4">
          <UserButton />
          <div>
            <p className="text-sm font-medium">{siteData.name}</p>
            <p className="text-xs text-muted-foreground">{siteData.domain}</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

