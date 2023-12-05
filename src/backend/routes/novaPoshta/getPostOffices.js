import { NextResponse } from "next/server";

const { NOVA_POSHTA_KEY, NOVA_POSHTA_URL } = process.env;

export async function getPostOffices(req) {
  const { searchParams } = new URL(req.url);
  const cityRef = searchParams.get("cityRef");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  if (!cityRef) {
    return NextResponse.json(
      { error: "empty cityRef query parameter!" },
      { status: 400 },
    );
  }
  const res = await fetch(NOVA_POSHTA_URL, {
    method: "POST",
    body: JSON.stringify({
      apiKey: NOVA_POSHTA_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        SettlementRef: cityRef,
        Limit: limit,
        Page: page,
      },
    }),
  });
  const { data, success, errors } = await res.json();
  if (!success) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  const filteredData = data.map(
    ({
      Description,
      ShortAddress,
      Number,
      SettlementAreaDescription,
      SettlementRegionsDescription,
    }) => ({
      description: Description,
      areaDescription: SettlementAreaDescription,
      regionDescription: SettlementRegionsDescription,
      address: ShortAddress,
      number: Number,
    }),
  );
  return NextResponse.json({ data: filteredData }, { status: 200 });
}
