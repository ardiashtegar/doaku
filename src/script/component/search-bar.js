class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        .search-container {
            display: flex;
            background-color: #9DB2BF;
            position: sticky;
            top: 10px;
            padding: 12px;
            margin-bottom: 28px;
            border: 2px solid black;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            gap: 8px;
            z-index: 999;
        }

        input[type="text"] {
            flex-grow: 4;
            outline: none;
            padding: 12px 15px;
            font-size: .9rem;
            border: 1px solid black;
        }

        .search-btn {
            flex-grow: 1;
            background-color: #27374D;
            color: #DDE6ED;
            padding: 12px 24px;
            font-size: .9rem;
            border: 1px solid black;
            cursor: pointer;
            transition: all .2s ease-in-out;
        }

        .search-btn:hover {
            background-color: #526D82;
            color: white;
        }

        @media screen and (max-width: 550px) {
        .search-container {
          flex-direction: column;
        }

        .search-container > button {
          width: 100%;
        }
      }
    </style>
    <div class="search-container">
        <input type="text" placeholder="Cari doa" id="searchElement"/>
        <button class="search-btn" id="searchButtonElement" type="submit">Cari</button>
    </div>
    `;

    const searchElement = this.shadowDOM.querySelector('#searchElement');
    const searchButtonElement = this.shadowDOM.querySelector('#searchButtonElement');

    if (this._clickEvent) {
      searchButtonElement.addEventListener('click', this._clickEvent);
    }

    searchButtonElement.addEventListener('click', () => {
      searchElement.value = '';
    });
  }
}

customElements.define('search-bar', SearchBar);
