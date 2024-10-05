import './doa-item';

class DoaList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set doas(doas) {
    this._doas = doas;
    this.render();
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
    <style>
      * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

      .placeholder {
        text-align: center;
        font-weight: 400;
        color: rgba(0,0,0,0.5);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    </style>

    <h2 class="placeholder">${message}</h2>
    `;
  }

  renderLoading() {
    this.shadowDOM.innerHTML = `
    <style>
        .loading h2 {
          width: fit-content;
          margin: auto;
          font-weight: 500;
          color: #27374d;
        }
    </style>
    <div class="loading"><h2>Loading...</h2></div>
    `;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        .doa-list {
            border: 2px solid black;
            background-color: #9db2bf;
            margin: auto;
            padding: 12px 12px 22px 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .doa-list h1 {
            color: #27374d;
            margin: auto;
        }
    </style>

    <div class="doa-list">
        <h1>Daftar Doa</h1>
    </div> 
    `;

    const doaListElement = this.shadowDOM.querySelector('.doa-list');

    if (Array.isArray(this._doas) && this._doas.length > 0) {
      this._doas.forEach((doa) => {
        const doaItemElement = document.createElement('doa-item');
        if (doa?.title && doa?.arabic && doa?.latin && doa?.translation) {
          doaItemElement.doa = doa;
          doaListElement.appendChild(doaItemElement);
        } else {
          this.renderError('No matching doa found.');
        }
      });
    }
  }
}

customElements.define('doa-list', DoaList);
