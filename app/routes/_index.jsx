import { redirect } from "@remix-run/node";


export const meta = () => {
  return [{ title: "Facebook Clone" }];
};

export async function loader() {
  return redirect ("/signup");
}
