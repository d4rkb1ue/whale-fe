import { EMPTY_QUERY, makeQuery } from './get'

const t = (ques, ans) => {
    it(ans, () => {
        expect(ques).toEqual(ans)
    })
}

t(makeQuery({
    ...EMPTY_QUERY,
    limit: 10
}), '?limit=10')

t(makeQuery({
    ...EMPTY_QUERY,
}), '')

t(makeQuery({
    ...EMPTY_QUERY,
    degree: 'phd',
    limit: 10,
    list_id: true
}), '?limit=10&list_id=true&by_degree=phd')

t(makeQuery({
    ...EMPTY_QUERY,
    degree: 'phd',
    limit: 10,
}), '?limit=10&by_degree=phd')
