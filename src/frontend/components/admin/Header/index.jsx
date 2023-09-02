import Link from "next/link";

export default function Header() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        color: "green",
      }}
    >
      <Link href="/admin">Admin Home</Link>
      <Link href="/admin/additem">Add Item</Link>
      <Link href="/">Consumers page</Link>
    </nav>
  );
}
