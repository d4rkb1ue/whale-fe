export default class Filter {
    constructor(accessor, value) {
        this.accessor = accessor
        this.value = value
        this.id = Math.random().toString(36).substr(2);
    }
}
