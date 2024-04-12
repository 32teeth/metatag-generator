class Metatags extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
  }
}

class Metatag extends HTMLElement {
  constructor() {
    super();
    this.name = '';
    this.type = '';
    this.label = '';
    this.placeholder = '';
    this.maxlength = false;
    this.length = 0;
    this.value = '';
    this.slug = '';
  }

  static get observedAttributes() {
    return [
      'data-name',
      'data-type',
      'data-label',
      'data-placeholder',
      'data-maxlength',
      'data-value',
      'data-slug'
    ]
  }

  populateSlugs() {
    const slugs = this.slug.split(',');
    const blocks = document.querySelectorAll('code');
    blocks.forEach(block => {
      let code = block.innerHTML;
      slugs.forEach(slug => {
        const regex = new RegExp(`(${slug}" content=")([^"]*)(")`, 'g');
        code = code.replace(regex, `$1${this.value}$3`);
      });
      block.innerHTML = code;
    });

    if (this.label === 'image') {
      const images = document.querySelectorAll('[data-image]');
      images.forEach(image => {
        image.style.backgroundImage = this.value.length !== 0 ?
          `url(${this.value})`:
          'url(https://place-hold.it/1200x630/ebe7f1/9f68eb.jpg&text=preview&fontsize=32)'
      });
    }

    if (this.label === 'title') {
      const titles = document.querySelectorAll('[data-title]');
      titles.forEach(title => {
        title.innerHTML = this.value;
      });
    }

    if (this.label === 'description') {
      const descriptions = document.querySelectorAll('[data-description]');
      descriptions.forEach(description => {
        description.innerHTML = this.value;
      });
    }

    if (this.label === 'url') {
      const urls = document.querySelectorAll('[data-url]');
      urls.forEach(url => {
        url.innerHTML = this.value;
      });
    }

    if (this.label === 'title') {
      const titles = document.querySelectorAll('[data-title]');
      titles.forEach(title => {
        title.innerHTML = this.value;
      });
    }




    if(this.label === 'title') {
      document.querySelector('#metatitle').innerHTML = `&lt;!-- Place this data between the &lt;head&gt; tags of your website --&gt;
      &lt;title&gt;${this.value}&lt;/title&gt;`;
    }
  }

  creactLabel() {
    const label = document.createElement('label');
    label.setAttribute('for', this.name);
    label.innerHTML = this.label;
    return label;
  }

  createInput() {
    const input = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('name', this.name);
    input.setAttribute('id', this.name);
    input.setAttribute('placeholder', this.placeholder);
    input.setAttribute('maxlength', this.maxlength);
    input.setAttribute('value', this.value);

    if(this.maxlength) {
      this.setAttribute('data-count', `${this.length}/${this.maxlength}`);
    }

    input.addEventListener('input', (e) => {
      if(this.maxlength) {
        this.length = e.target.value.length;
        this.setAttribute('data-count', `${this.length}/${this.maxlength}`);
      }
      this.setAttribute('data-value', `${e.target.value}`);
      this.populateSlugs();
    });
    return input;
  }

  connectedCallback() {
    this.appendChild(this.creactLabel());
    this.appendChild(this.createInput());
  }

  render() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, prev, current) {
    this[name.replace('data-', '')] = current;
  }
}

customElements.define('meta-tags', Metatags);
customElements.define('meta-tag', Metatag);

export { Metatags, Metatag };