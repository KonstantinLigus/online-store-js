import { NextResponse } from "next/server";

const { NOVA_POSHTA_KEY, NOVA_POSHTA_URL } = process.env;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cityName = searchParams.get("cityName");
  const areaRef = searchParams.get("areaRef");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  if (!cityName || !areaRef) {
    return NextResponse.json(
      { error: "empty cityName or areaRef query parameter!" },
      { status: 400 },
    );
  }
  const res = await fetch(NOVA_POSHTA_URL, {
    method: "POST",
    body: JSON.stringify({
      apiKey: NOVA_POSHTA_KEY,
      modelName: "Address",
      calledMethod: "getSettlements",
      methodProperties: {
        AreaRef: areaRef,
        FindByString: cityName,
        Warehouse: "1",
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
      Ref,
      Description,
      SettlementTypeDescription,
      AreaDescription,
      RegionsDescription,
    }) => ({
      cityRef: Ref,
      description: Description,
      regionDescription: RegionsDescription,
      areaDescription: AreaDescription,
      cityType: SettlementTypeDescription,
    }),
  );
  return NextResponse.json({ data: filteredData }, { staus: 200 });
}
