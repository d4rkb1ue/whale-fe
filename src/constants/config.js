export const API = 'http://whaleapi.drkbl.com/api/v1/'
export const OFFER_API = API + '/offers'
export const DEFAULT_OFFER_PAGESIZE = 20
export const OFFER_HEADER_CHOICES = {
    'season': [
        { key: '1-3', value: '1-3', text: 'Spring' },
        { key: '4-6', value: '4-6', text: 'Summer' },
        { key: '7-9', value: '7-9', text: 'Fall' },
        { key: '10-12', value: '10-12', text: 'Winter' },
    ]
}
export const OFFER_HEADER = [
    {
        Header: 'Company',
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
    // {
    //     Header: 'post_time',
    //     accessor: 'post_time',
    // },
    {
        Header: 'Year',
        accessor: 'year',
    },
    {
        Header: 'Season',
        accessor: 'season',
    },
    {
        Header: 'Link',
        accessor: 'url',
    },    
]


