import getAuthOptions from "@/app/authOptions";
import getOrderController from "@/backend/entities/orders";
import getUserController from "@/backend/entities/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(await getAuthOptions());
  let userId = null;
  if (session) {
    const getUserById = await getUserController("GET_USER_BY_ID");
    const { user } = await getUserById(session.user._id.toString());
    userId = user ? user._id.toString() : null;
  }
  const data = await req.json();
  data.isCompleted = false;
  data.owner = userId;
  const createOrder = await getOrderController("CREATE_ORDER");
  const res = await createOrder(data);

  return NextResponse.json({ ...res }, { status: res.status });
}
