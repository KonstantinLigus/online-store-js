import { NextResponse } from "next/server";
import { producerServices } from "../data-access/producersServices";

export async function getProducersEntry() {
  const producers = await producerServices.getProducers();

  return NextResponse.json(producers, { status: 200 });
}
