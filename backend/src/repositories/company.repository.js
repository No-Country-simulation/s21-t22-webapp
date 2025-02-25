import Company from "../models/company.model.js";

const createCompany = async (data) => {
    return await Company.create(data);
}

const getCompanies = async () => {
    return await Company.find()
}

export default { createCompany, getCompanies };