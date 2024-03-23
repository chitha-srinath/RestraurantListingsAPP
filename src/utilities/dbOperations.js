export async function insertData(model, data) {
  try {
    return await model.create(data);
  } catch (err) {
    return err;
  }
}

export async function updateone(model, filter, data) {
  try {
    return await model.updateOne(filter, { $set: data });
  } catch (err) {
    return err;
  }
}
export async function updateData(model, filter, data) {
  try {
    return await model.updateMany(filter, { $set: data });
  } catch (err) {
    return err;
  }
}
export async function deleteone(model, data) {
  try {
    return await model.deleteOne(data);
  } catch (err) {
    return err;
  }
}
export async function deleteData(model, data) {
  try {
    return await model.deleteMany(data);
  } catch (err) {
    return err;
  }
}

export async function findone(model, data) {
  try {
    return await model.findOne(data);
  } catch (err) {
    return err;
  }
}
export async function findData(model, data) {
  try {
    return await model.find(data);
  } catch (err) {
    return err;
  }
}
export async function updateById(model, data, updatedData) {
  try {
    return await model.updateOne(
      { _id: data["_id"] },
      { $set: updatedData },
      { upsert: true }
    );
  } catch (err) {
    return err;
  }
}

export async function findwithproject(model, data, project) {
  try {
    return await model.find(data, project);
  } catch (err) {
    return err;
  }
}
