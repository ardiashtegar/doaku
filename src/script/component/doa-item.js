import arrowRight from 'assets/chevron_right.png';
import arrowDown from 'assets/expand_more.png';

class DoaItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  set doa(doa) {
    this._doa = doa;
    this.render();
  }

  setupEventListeners() {
    const doaTitle = this.shadowDOM.querySelector('.doa-title');
    doaTitle.addEventListener('click', () => {
      this.toggleDescription();
      const imgElement = doaTitle.querySelector('img');

      if (imgElement) {
        imgElement.src = imgElement.src.includes(arrowRight)
          ? imgElement.src.replace(
            arrowRight,
            arrowDown,
          )
          : imgElement.src.replace(
            arrowDown,
            arrowRight,
          );
      }
    });
  }

  toggleDescription() {
    const doaDescription = this.shadowDOM.querySelector('.doa-description');
    doaDescription.classList.toggle('active');
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          background-color: #dde6ed;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .doa-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 15px;
            padding-right: 10px;
            padding-block: 10px;
            font-size: 1.1rem;
            border: 1px solid black;
            cursor: pointer;
        }

        .doa-title img{
            width: 30px;
            transition: transform .2s;
            
        }

        .doa-title p {
          max-width: 80%;
        }

        .doa-title:hover p {
            font-weight: 500;
        }

        .doa-title:hover img {
            transform: translateX(5px);
        }

        .doa-description {
            background-color: white;
            padding: 15px;
            font-size: 1rem;
            border: 1px solid black;
            border-top: none;
            display: none;
        }

        .doa-description.active {
            display: block;
        } 
        
        .doa-description .ayat {
          font-size: 1.8rem;
          text-align: right;
          margin-bottom: 5px;
        }

        .doa-description .latin {
          margin-bottom: 10px;
        }

        .doa-description .artinya{
          font-weight: 500;
        }

        @media screen and (max-width: 550px){
          .doa-description .ayat {
            font-size: 1.7rem;
          }
        }
    </style>
  
    <div class="doa-item">
        <div class="doa-title">
            <p>${this._doa.title}</p>
            <img src="${arrowRight}" alt="arrow">
        </div>
        <div class="doa-description">
            <p class="ayat">
                ${this._doa.arabic}
            </p>
            <p class="latin">
                <i>${this._doa.latin}</i>
            </p>
            <p class="artinya">
                Artinya:
                <p>${this._doa.translation}</p>
            </p>
        </div>
    </div>`;
  }
}

customElements.define('doa-item', DoaItem);
