// const API_KEY = '24333864-29a9dd6df16fde5fb5603859e';


export default class PhotoCardsApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
    
    
    fetchPhotoCards() {
        
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=24333864-29a9dd6df16fde5fb5603859e`)
            .then(response => response.json())
            .then(photoCards => {
                this.incrementPage();
                console.log(photoCards)
                console.log(photoCards.hits)
                    return photoCards.hits;
                }
            );
  }

    incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

    get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

}
