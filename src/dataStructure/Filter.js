import { randomURI } from '../utils'

export default class Filter {
    constructor(accessor, value) {
        this.accessor = accessor
        this.value = String(value).toLocaleLowerCase()
        this.id = randomURI()
    }
}
