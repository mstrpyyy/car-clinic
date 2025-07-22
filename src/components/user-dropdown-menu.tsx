import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useEffect, useState } from "react";

type UserDropdownMenuProps = {
  align?: "center" | "start" | "end"
  side?: "top" | "right" | "bottom" | "left"
}


export const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ align, side }) => {
  const { getUser, getPermissions, isAuthenticated } = useKindeBrowserClient();
  const [data, setData] = useState({
    name: "",
    initials: "",
    role: "",
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    (async () => {
      const [user, permissions] = await Promise.all([getUser(), getPermissions()]);

      const given = user?.given_name ?? "";
      const family = user?.family_name ?? "";
      const name = `${given} ${family}`.trim();
      const initials = given && family ? `${given[0]}${family[0]}`.toUpperCase() : "";

      const role =
        permissions?.permissions.includes("admin")
          ? "Admin"
          : permissions?.permissions.includes("manager")
          ? "Manager"
          : "Employee";

      setData({ name, initials, role });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button
          variant={'outline'}
          className="h-10 w-10"
          aria-label='UserMenu'
          title='User Menu'
        >
          {data.initials}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align={align ?? "start"} side={side ?? "top"}>
        <DropdownMenuLabel>
          <div>
            <p className="truncate w-full text-semibold">{data.name}</p>
            <p className="text-muted-foreground text-xs">{data.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
           Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
           <LogoutLink className="hover:!bg-red-500/10 group flex justify-between hover:cursor-pointer font-medium text-red-500 hover:!text-red-500">
              Log Out
              <RiLogoutBoxRLine className="text-red-500 group-hover:text-red-500"/>
           </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
