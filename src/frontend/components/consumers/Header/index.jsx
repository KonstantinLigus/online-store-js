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
      <Link href="/">Home</Link>
      <Link href="/user">User</Link>
      <Link href="/admin">Admin Page</Link>
    </nav>
  );
}
