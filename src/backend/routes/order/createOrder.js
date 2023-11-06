import getAuthOptions from "@/backend/libs/authOptions";
import getOrderController from "@/backend/entities/orders";
import getUserController from "@/backend/entities/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function createOrder(req) {
  const session = await getServerSession(getAuthOptions());
  let userId = null;
  if (session) {
    const getUserById = getUserController("GET_USER_BY_ID");
    const { user } = getUserById(session.user._id.toString());
    userId = user ? user._id.toString() : null;
  }
  const data = await req.json();
  data.isCompleted = false;
  data.owner = userId;
  const createOrder = getOrderController("CREATE_ORDER");
  const res = await createOrder(data);

  return NextResponse.json({ ...res }, { status: res.status });
}
