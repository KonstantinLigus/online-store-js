export async function getServerTryCatchWrapper(callback) {
  return async function (args) {
    try {
      const response = await callback(args);
      return response;
    } catch (error) {
      return { error: error.message, status: error.status };
    }
  };
}
