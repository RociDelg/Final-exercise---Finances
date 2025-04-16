import { ToolsTableComponent } from "./tools-table.component";
import { getTools } from "./tools.repository";

const html = String.raw;
customElements.define("app-tools-table", ToolsTableComponent);

/**
 * Tools page component
 */
export class ToolsPage extends HTMLElement {
	constructor() {
		super();
		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="tools-page">
        <h1>Financial Tools</h1>
        <p>Use our tools to analyze your financial data</p>
      </div>
    `;
	}
}
