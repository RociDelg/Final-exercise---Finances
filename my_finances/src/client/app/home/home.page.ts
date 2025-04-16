
const html = String.raw;

/**
 * Home page component
 */
export class HomePage extends HTMLElement {
	#appName = "Fullstack Blueprint";
	#template = html`
    <h1>Welcome</h1>
    <p>This is the home page of the ${this.#appName} application.</p>
  `;
	constructor() {
		super();
		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="home-page">
        <h1>Welcome to My Finances</h1>
        <p>Manage your financial data with ease</p>
      </div>
    `;
	}
}
