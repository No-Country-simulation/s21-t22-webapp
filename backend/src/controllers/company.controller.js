import companyService from "../services/company.service.js"

export const createCompany = async (req, res) => {
    try {
        const company = await companyService.createCompany(req.body);
        return res.status(201).json(company)
    } catch(e) {
        console.log(e)
    }
}

export const getCompanies = async (req, res) => {
    const companies = await companyService.getCompanies();
    return res.status(200).json(companies)
}