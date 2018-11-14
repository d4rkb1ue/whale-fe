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
    {
        Header: 'Degree',
        accessor: 'degree',
    },
    {
        Header: 'Area',
        accessor: 'area',
    },
    {
        Header: 'Experience',
        accessor: 'experience_level',
    },
    // {
    //     Header: 'experience',
    //     accessor: 'experience',
    // },
    {
        Header: 'post_time',
        accessor: 'post_time',
    },
    {
        Header: 'season mo.',
        accessor: 'season',
    },
    {
        Header: 'Link',
        accessor: 'url',
    },
]

