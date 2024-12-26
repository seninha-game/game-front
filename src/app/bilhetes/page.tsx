import { IRaffleData } from "@/interfaces/raffle";
import { cookies } from "next/headers";
import { seninhaApi } from "../../api/seninhaApi";
import Tickets from "./tickets";


const getLastResults = async (): Promise<IRaffleData> => {
  let response = await seninhaApi.get("/raffle/data");
  try {
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    return response.data.data;
  }
};

export default async function Page() {
  const pageInformations = await getLastResults();
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value || "";
  const userId = cookieStore.get("userId")?.value || "";

  return <Tickets pageInformations={pageInformations} authToken={authToken} userId={userId} />;
}
