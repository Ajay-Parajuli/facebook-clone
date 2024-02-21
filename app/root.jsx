
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import appStylesHref from "./app.css";

import Nav from "./components/Nav";
import stylesheet from "~/tailwind.css";
import { authenticator } from "./services/auth.server";
import { useLoaderData } from "@remix-run/react";


export const links = () => [{ rel: "stylesheet", href: appStylesHref } , { rel: "stylesheet", href: stylesheet }] ;


export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return { user };
}



export default function App() {
  const { user } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      {user && <Nav />}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
