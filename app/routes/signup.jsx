import { Form, Link } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { json, redirect } from "@remix-run/node";
import { sessionStorage } from "../services/session.server";


export async function loader({ request }) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // Get the error message from the sessio
  const error = session.get("sessionErrorKey");
  return json({ error }); 
}

export async function action({ request }) {
    const formData = await request.formData(); // get the form data
    const newUser = Object.fromEntries(formData);
    const result = await mongoose.models.User.create(newUser); 
    await result.save();
    if (result) {
        return redirect("/signin");
    } else {
        return redirect("/signup");
    }
      }

export default function SignUp() {
  const loaderData = useLoaderData();
  console.log("loaderData", loaderData);
  return (
    <div id="sign-in-page" className="w-full flex justify-center flex-col items-center h-[100vh]">
      <h1 className="text-blue-700 text-4xl font-bold">clonebook</h1>
      <div className="shadow-2xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] 2xl:w-[25%] ">
      <div className=" mt-5 w-full text-center ">
        <h2 className="text-black text-xl font-bold">Create a new account</h2>
        <p className="text-gray-500">It is fast an easy</p>
        <div className="border-2 border-gray-300 mt-4 w-[80%] m-auto h-1"></div>
        </div>
      <Form id="sign-in-form" method="post" className="mt-5"> 
        <div className="flex justify-between pl-4 pr-4">
            <input className="p-2 border-2 rounded w-[45%]"
                type="text"
                id="name"
                name="firstName"
                placeholder="First name"
                required
            />
               <input className="p-2 border-2 border-gray-300 rounded w-[45%]"
                type="text"
                id="name"
                name="lastName"
                placeholder="Last name"
                required
            />
        </div>
        <div className="pl-4 pr-4">
        <input className="p-2 border-2 border-gray-300 rounded w-full mt-5"
            type="email"
            id="email"
            name="mail"
            placeholder="Email"
            required />
        <input className="p-2 border-2 border-gray-300 rounded w-full mt-5"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required />
            </div>
            <div className="pl-4 pr-4 mt-5">
                <label htmlFor="birthday" className="text-black">Birthday</label>
               <input type="date" id="birthday" name="birthday" className="p-2 border-2 border-gray-300 rounded w-full mt-1" required />
            </div>
            <div className="pl-4 pr-4 mt-5">
                <label htmlFor="gender">Gender</label>
                <div className="flex justify-around mt-2">
                    <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">
                    <label htmlFor="man">Man</label>
                    <input className="w-4" type="radio" name="gender"></input>
                    </div>
                    <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">                    <label htmlFor="woman">Woman</label>
                    <input className="w-4" type="radio" name="gender"></input>
                    </div>
                    <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">                    <label htmlFor="other">Other</label>
                    <input className="w-4" type="radio" name="gender"></input>
                    </div>
                </div>
            </div>
        <div className="p-2 mt-5 text-center">
        <button className="bg-blue-500 text-white p-2 w-[50%] rounded">Create an account</button>
        <p className="mt-2">Already have an account? <Link className="underline cursor-pointer" to="/signin">Sign In</Link></p>
        </div>
        <div className="error-message">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
      </Form>
      </div>
    
    </div>
  );
}