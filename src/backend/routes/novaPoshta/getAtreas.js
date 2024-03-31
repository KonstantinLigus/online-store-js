import { NextResponse } from "next/server";

const { NOVA_POSHTA_KEY, NOVA_POSHTA_URL } = process.env;

export async function getAtreas() {
  const res = await fetch(NOVA_POSHTA_URL, {
    method: "POST",
    body: JSON.stringify({
      apiKey: NOVA_POSHTA_KEY,
      modelName: "Address",
      calledMethod: "getSettlementAreas",
      methodProperties: {},
    }),
  });
  const { data, success, errors } = await res.json();
  if (!success) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  const filteredData = data.map(({ Ref, Description, RegionType }) => ({
    ref: Ref,
    description: Description,
    regionType: RegionType,
  }));
  return NextResponse.json({ data: filteredData }, { status: 200 });
}
