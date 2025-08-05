import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import LogoIcon from "./icons/logo";
export default function LPNav() {
  return (
    <nav className="flex justify-between p-4 items-center md:max-w-7xl mx-auto">
      <Menubar className="border-none shadow-none text-foreground w-full md:hidden">
        <MenubarMenu>
          <MenubarTrigger className="bg-none border-none data-[state=open]:bg-transparent focus:bg-transparent">
            <MenuIcon />
          </MenubarTrigger>
          <MenubarContent className="bg-background border-foreground font-bold">
            <MenubarItem>
              <Link href="#how-it-feels">HOW SUNDAY™ FEELS</Link>
            </MenubarItem>
            <MenubarSeparator className="bg-foreground" />
            <MenubarItem>
              <Link href="#whats-in-the-can">WHAT'S IN THE CAN</Link>
            </MenubarItem>
            <MenubarSeparator className="bg-foreground" />
            <MenubarItem>
              <Link href="#faqs">FAQS</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <ul className="md:flex flex-row justify-between items-center font-heading text-nowrap text-xl hidden w-full">
        <li>
          <Link href="#how-it-feels"> HOW SUNDAY™ FEELS</Link>
        </li>
        <li>
          <Link href="#whats-in-the-can"> WHAT'S IN THE CAN</Link>
        </li>
        <li>
          <Link href="#faqs"> FAQS</Link>
        </li>
      </ul>

      <LogoIcon className="h-12 lg:h-14 w-full md:w-full" />
      <div className="md:w-full flex justify-end items-center">
        <Link
          href="#product"
          className="bg-transparent rounded-full border-foreground uppercase text-foreground font-bold border-[1px] text-md md:text-lg px-3 py-3 lg:px-6 text-nowrap font-heading"
        >
          SHOP SUNDAY
        </Link>
      </div>
    </nav>
  );
}
