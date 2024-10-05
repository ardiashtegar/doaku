class BackButton extends HTMLElement {
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

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        .back-btn {
            background-color: #27374D;
            color: #DDE6ED;
            padding: 12px 24px;
            margin-top: 28px;
            font-size: .9rem;
            border: 1px solid black;
            cursor: pointer;
            transition: all .2s ease-in-out;
        }

        .back-btn:hover {
            background-color: #526D82;
            color: white;
        }
    </style>

    <button class="back-btn">Kembali</button>
    `;

    if (this._clickEvent) {
      this.shadowDOM
        .querySelector('.back-btn')
        .addEventListener('click', this._clickEvent);
    }
  }
}

customElements.define('back-button', BackButton);
