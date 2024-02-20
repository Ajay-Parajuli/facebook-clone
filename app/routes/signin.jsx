import { Form, Link } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { sessionStorage } from "../services/session.server";

export async function loader({ request }) {
  // If the user is already authenticated redirect to /posts directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/homepage"
  });
  // Retrieve error message from session if present
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // Get the error message from the session
  const error = session.get("sessionErrorKey");
  return json({ error }); // return the error message
}

export async function action({ request }) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/homepage",
    failureRedirect: "/signin"
  });
}

export default function SignIn() {
    const loaderData = useLoaderData();
    console.log("loaderData", loaderData);
    return (
      <div id="sign-in-page" className="w-full flex justify-center flex-col items-center h-[100vh]">
        <h1 className="text-blue-700 text-4xl font-bold">clonebook</h1>
        <div className="shadow-2xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] 2xl:w-[25%] ">
        <div className=" mt-5 w-full text-center ">
          <h2 className="text-black text-xl font-bold">Login</h2>
          <p className="text-gray-500">clonebook helps connect with people</p>
          <div className="border-2 border-gray-300 mt-4 w-[80%] m-auto h-1"></div>
          </div>
        <Form id="sign-in-form" method="post" className="mt-5"> 
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
          <div className="p-2 mt-5 text-center">
          <button className="bg-blue-500 text-white p-2 w-[50%] rounded">Login</button>
          <p className="mt-2">Dont have an account? <Link className="underline cursor-pointer" to="/signup">Sign Up</Link></p>
          </div>
          <div className="error-message">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
        </Form>
        </div>
      
      </div>
    );
  }