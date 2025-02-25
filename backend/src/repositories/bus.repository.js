import Bus from "../models/bus.model.js";

const createBus = async (data) => {
    return await Bus.create(data);
}

const getBuses = async () => {
    return await Bus.find().populate("company_id");
}

export default { createBus, getBuses };