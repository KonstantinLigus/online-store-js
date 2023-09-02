import { getItemsServices } from "@/backend/items";
import Image from "next/image";

export default async function HomePage() {
  const itemServices = await getItemsServices();
  const items = await itemServices.getAllItems();
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
        {items.map(({ _id, title, description, price, images }) => (
          <li key={_id}>
            <Image
              src={images[0]}
              alt={title}
              width={200}
              height={200}
              priority
            />
            <div>{title}</div>
            <div>{price}</div>
            <div>{description}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
