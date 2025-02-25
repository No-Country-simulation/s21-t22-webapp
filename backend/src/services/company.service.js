import companyRepository from "../repositories/company.repository.js"

const createCompany = async (data) => {
    return await companyRepository.createCompany(data)
}

const getCompanies = async () => {
    return await companyRepository.getCompanies()
}

export default { createCompany, getCompanies };