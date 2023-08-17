export async function checkExit(schema, where) {
  const res = await schema.findOne(where).lean();
  return res;
}
interface Iquery {
  limit?: number;
  page?: number;
  order?: string;
  orderBy?: string;
}
export async function FindAll(schema, where, query: Iquery) {
  const { order, orderBy } = query;
  const items = await schema
    .find(where)
    .sort({ [orderBy]: order })
    .lean()
    .exec();
  const total = await schema.countDocuments(where).exec();
  return { items, total };
}
export async function FindAllPagination(schema, where, query: Iquery) {
  const { limit, page, order, orderBy } = query;
  const items = await schema
    .find(where)
    .sort({ [orderBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();
  const total = await schema.countDocuments(where).exec();
  return { items, total };
}

interface populateOp {
  path: string;
  match?: object;
  select?: string | object;
  options?: { limit: number; skip: number; sort: number };
}
interface populateArr {
  path: string;
  populate: populateOp[];
  match?: object;
  select?: string | object;
  options?: { limit: number; skip: number; sort: number };
}

export async function populatedAll(
  schema,
  where,
  query: Iquery,
  arrPopulate?: populateArr,
  objPopulate?: populateOp,
) {
  const { order, orderBy } = query;
  const items = await schema
    .find(where)
    .populate(arrPopulate)
    .populate(objPopulate)
    .sort({ [orderBy]: order })
    .lean()
    .exec();
  const total = await schema.countDocuments(where).exec();
  return { items, total };
}

export async function populatedAllPagination(
  schema,
  where,
  query: Iquery,
  arrPopulate: populateArr,
  objPopulate: populateOp,
) {
  const { limit, page, order, orderBy } = query;
  const items = await schema
    .find(where)
    .populate(arrPopulate)
    .populate(objPopulate)
    .sort({ [orderBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();
  const total = await schema.countDocuments(where).exec();
  return { items, total };
}
