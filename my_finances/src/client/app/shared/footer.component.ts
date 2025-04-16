import { Component } from "@angular/core";
import { renderAnchor } from "./dom.utils";

const html = String.raw;
/**
 * A semantic footer web component
 */
// Interface Chartoptions2
@Component({
	selector: "app-footer",
	template: `<footer><span>&copy; {{currentYear}}</span>
	<span>By Rocío Delgado</span>
	<span>for eMarketingSolutions</span>
	</footer>`
})
export class FooterComponent  {
	currentYear = new Date().getFullYear();
	
}
