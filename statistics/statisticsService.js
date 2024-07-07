import mongoose from "../app.js";

const getStats = async (id) => {
  const Sales = mongoose.connection.collection("sales");
  const Operations = mongoose.connection.collection("operations");

  const sales = await Sales.find({ shopId: id })
    .sort({ date: -1 })
    .limit(5)
    .toArray();

  const operations = await Operations.find({ shopId: id }).toArray();

  const stats = {
    sales: sales || [],
    operations: operations || [],
  };

  return stats;
};

export default {
  getStats,
};
