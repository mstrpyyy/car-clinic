import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import LoginStaff from "./loginPage";




export default async function login() {
  const { getPermissions } = getKindeServerSession()
  const permissions = await getPermissions()

   if (permissions && permissions.permissions.includes('user')) {
      redirect('/')
    }
    if (permissions &&permissions.permissions.includes('employee')) {
      redirect('/dashboard/home')
    }

    return (
      <LoginStaff />
    )
}