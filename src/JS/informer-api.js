class Informer {
    constructor(ref) {
        this.ref = ref;
    }
    show() {
        this.ref.classList.remove('is-hidden');
    }
    close() {
        this.ref.classList.add('is-hidden');
    }
}

export { Informer };