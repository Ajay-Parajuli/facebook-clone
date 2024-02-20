import { Form, Link } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import { json, redirect } from "@remix-run/node";
import { sessionStorage } from "../services/session.server";


export async function loader({ request }) {
  // If the user is already authenticated redirect to /posts directly
 

  // Retrieve error message from session if present
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
    <div id="sign-in-page" className="">
      <h1 className="text-blue-300">Sign Up</h1>
      <Form id="sign-in-form" method="post">
  
        <div className="error-message">{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</div>
      </Form>
     <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}