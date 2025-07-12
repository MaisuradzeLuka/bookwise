import { auth, signOut } from "@/auth";
import Signout from "@/components/Signout";

const page = async () => {
  const session = await auth();

  return <Signout />;
};

export default page;
