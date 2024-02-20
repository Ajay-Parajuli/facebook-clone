import { json } from "@remix-run/node";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";


export async function loader({ request }) { 
  return await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin"
      });
}



export default function HomePage() {
    return (
      <div id="sign-in-page" className="w-full flex justify-center flex-col items-center h-[100vh]">
       <h1>HomePage</h1>
      </div>
    );
  }