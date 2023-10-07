db.items.updateMany({}, [
  {
    $set: {
      unit: {
        $regexFind: {
          input: "$price",
          regex: /[а-я]+\/[а-я]+/g,
        },
      },
    },
  },
  {
    $set: {
      unit: "$unit.match",
    },
  },
  {
    $set: {
      price: {
        $regexFind: {
          input: "$price",
          regex: /\d+/g,
        },
      },
    },
  },
  {
    $set: {
      price: {
        $toInt: "$price.match",
      },
    },
  },
]);
