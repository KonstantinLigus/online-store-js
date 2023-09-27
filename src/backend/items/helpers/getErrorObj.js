export function getNotFoundItemError(itemId) {
  return { error: `item with id: ${itemId} was not found`, status: 404 };
}
