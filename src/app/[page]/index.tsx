//import {Metadata} from "next";

type TParams = {
  params: Promise<{ page: string }>;
};

//TODO: объединить получение данных
/*export const generateMetadata = async ({params}: TParams): Promise<Metadata> => {
	const { page } = await params;
}*/

export default async function Page({ params }: TParams) {
  const { page } = await params;
  console.log("page: ", page);

  return (
    <div>
      <h1>Page: {page}</h1>
    </div>
  );
}
