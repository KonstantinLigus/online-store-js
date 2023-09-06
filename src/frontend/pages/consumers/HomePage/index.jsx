import getItemsControllers from "@/backend/items";
import Image from "next/image";

export default async function HomePage() {
  const itemServices = await getItemsControllers();
  const { items } = await itemServices.getAllItems();
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
