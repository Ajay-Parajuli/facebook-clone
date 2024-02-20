import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";

export async function loader({ request }) {
  const user = await authenticator.isAuthenticated(request, {
    // Check if the user is authenticated and get the user data
    failureRedirect: "/signin"
  });
  return { user };
}

export async function action({ request }) {
  const formData = await request.formData();
  const newData = Object.fromEntries(formData);

  try {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin"
    });

    // Update user profile
    await mongoose.models.User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          firstname: newData.firstname,
          lastname: newData.lastname,
          image: newData.image,
          gender: newData.gender,
        }
      }
    );

    return redirect(`/homepage`);
  } catch (error) {
    // Handle authentication error
    return redirect("/signin");
  }
}

export default function UpdateProfile() {
  const { user } = useLoaderData();
  const [image, setImage] = useState(user.image);

  const navigate = useNavigate(); // Define useNavigate hook

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <div id="sign-in-page" className="w-full flex justify-center flex-col items-center mt-2">
        <h1 className="text-blue-700 text-4xl font-bold">Update Profile</h1>
        <div className="shadow-2xl w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] 2xl:w-[25%] ">
          <div className=" mt-5 w-full text-center ">
            <div className="border-2 border-gray-300 mt-4 w-[80%] m-auto h-1"></div>
          </div>
          <Form id="sign-in-form" method="post" className="mt-5">
            <div className="flex justify-between pl-4 pr-4">
              <input
                className="p-2 border-2 rounded w-[45%]"
                type="text"
                id="name"
                defaultValue={user.firstname}
                name="firstname"
                placeholder="First name"
                required
              />
              <input
                className="p-2 border-2 border-gray-300 rounded w-[45%]"
                type="text"
                id="name"
                defaultValue={user.lastname}
                name="lastname"
                placeholder="Last name"
                required
              />
            </div>
            <div className="pl-4 pr-4 mt-5">
              <label htmlFor="gender">Gender</label>
              <div className="flex justify-around mt-2">
                <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">
                  <label htmlFor="man">Man</label>
                  <input value="Man" className="w-4" type="radio" name="gender" defaultChecked={user.gender === "Man"}></input>
                </div>
                <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">
                  <label htmlFor="woman">Woman</label>
                  <input value="Woman" className="w-4" type="radio" name="gender" defaultChecked={user.gender === "Woman"}></input>
                </div>
                <div className="border-2 w-[30%] flex justify-around h-8 items-center rounded">
                  <label htmlFor="other">Other</label>
                  <input value="Other" className="w-4" type="radio" name="gender" defaultChecked={user.gender === "Other"}></input>
                </div>
              </div>
            </div>
            <div className="pl-4 pr-4 mt-5 flex flex-col">
              <label htmlFor="image">Image URL</label>

              <input
                name="image"
                className="p-2 border-2 border-gray-300 rounded w-full mt-2"
                defaultValue={user.image}
                type="url"
                onChange={e => setImage(e.target.value)}
                placeholder="Paste an image URL..."
              />

              <label className="mt-5 mb-2" htmlFor="image-preview">Image Preview</label>
              <img
                id="image-preview"
                className="object-cover"
                src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
                alt="Choose"
                onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
              />
            </div>
            <div className="p-2 mt-5 text-center">
              <button className="bg-blue-500 text-white p-2 w-[50%] rounded">Update</button> <br></br>
              <button className="mt-3 bg-red-400 p-2 rounded-md text-white" onClick={handleCancel}>Cancel</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
