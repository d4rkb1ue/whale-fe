export const API = 'http://whaleapi.drkbl.com/api/v1/'
export const OFFER_API = API + '/offers'
export const OFFER_HEADER = [
    {
        Header: 'CompanyName',
        accessor: 'company_name',
    },
    {
        Header: 'Base',
        accessor: 'base_salary',
    },
    {
        Header: 'Equity',
        accessor: 'equity',
    },
    {
        Header: 'SignBonus',
        accessor: 'sign_bonus_string',
    },
    {
        Header: 'YearlyBonus',
        accessor: 'yearly_bonus',
    },
]

