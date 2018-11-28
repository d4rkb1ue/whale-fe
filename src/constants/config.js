export const API = 'http://whaleapi.drkbl.com/api/v1/'
export const OFFER_API = API + '/offers'
export const DEFAULT_OFFER_PAGESIZE = 20
export const OFFER_HEADER_CHOICES = {
    'season': [
        { key: '1-3', value: '1-3', text: 'Winter' },
        { key: '4-6', value: '4-6', text: 'Spring' },
        { key: '7-9', value: '7-9', text: 'Summer' },
        { key: '10-12', value: '10-12', text: 'Fall' },
    ]
}
export const SHOW_YEAR_BEFORE = 3
export const SHOW_YEAR_LATER = 1
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
    /**
     *  BayArea
     *  Greater Seattle Area
     *  Greater New York Area
     *  Greater Boston Area
     *  Texas
     *  Southern California
     *  Pittsburgh
     *  Chicago
     *  DC
     *  美国其他地区
     *  Canada
     *  欧洲
     *  澳大利亚
     *  北京
     *  上海
     *  广州
     *  成都
     *  沈阳
     *  国内其他地区
     *  亚洲其他地区
     *  South America
     *  Everywhere else
     */
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


