import dynamic from "next/dynamic";

const RafflePage = dynamic(() => import("./raffle"), { ssr: false });

export default async function Page() {
  return <RafflePage></RafflePage>;
}
