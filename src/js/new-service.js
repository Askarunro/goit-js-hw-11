const API_KEY = '24828507-89537ba0cc73f2aa36f96abcf'

import axios from 'axios';

export default class NewsApiServece {
    constructor() {
        this.searchName = '';
        this.page = 1;
    }


    // async fetchArticles() {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchName}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`,
    //         })
    //         const todoItems = await response.data;
    //         const n = await this.incrementPage();
    //         return await todoItems.hits
    //     } catch (errors) {
    //         console.error(errors);
    //     }
    // };

    // FETCH

    fetchArticles() {
        return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${this.searchName}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`).then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then(({ hits }) => {
            if (hits.length < 1) {
                throw new Error(response.status);
            }
            this.incrementPage();
            
            return hits
        });
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchName;
    }

    set query(newQuery) {
        this.searchName = newQuery;
    }
}