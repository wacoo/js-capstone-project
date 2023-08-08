
class APILoader {
    constructor() {
        this.url = '';
    }

    getData = async() => {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
    }
}

export default APILoader;