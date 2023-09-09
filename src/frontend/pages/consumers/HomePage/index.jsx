import getItemsController from "@/backend/items";
import Image from "next/image";

export default async function HomePage() {
  const getAllItems = await getItemsController("GET_ALL_ITEMS_ON_SERVER");
  const { items } = await getAllItems({ categories: "популярні" });
  return (
    <>
      <div>Home consumers page</div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "50px",
        }}
      >
        {items.map(({ _id, title, price, mainImage }) => (
          <li key={_id}>
            <Image
              src={mainImage}
              alt={title}
              width={200}
              height={200}
              priority
            />
            <div>{title}</div>
            <div>{price}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
