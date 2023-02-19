import { api, LightningElement } from 'lwc';

export default class SiteCert extends LightningElement {
  @api cert;

  certClicked() {
    this.dispatchEvent(new CustomEvent('certclicked', { detail: this.cert.Id }));
  }
}