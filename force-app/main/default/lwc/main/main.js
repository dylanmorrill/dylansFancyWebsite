import { LightningElement } from 'lwc';
import { CONSTANTS } from "c/mainConstants";
import getResumeSiteWrapper from '@salesforce/apex/ResumeSiteController.getResumeSiteWrapper';
import formFactorPropertyName from '@salesforce/client/formFactor'

export default class Main extends LightningElement {
  currentMapMarkerUrl;
  error;
  mapStuff;
  selectedCert;
  showCertModal = false;
  showGetInTouchModal = false;
  showHeader = !localStorage.getItem('hasClosedHeader');
  showHelpfulLinks = false;
  showMapModal = false;
  wrapper;

  get isFormFactorSupported() {
    return formFactorPropertyName === 'Small';
  }

  certClicked = (event) => {
    const certId = event.detail;
    if (certId) {
      this.selectedCert = this.wrapper.dev.Site_Certs__r.find(cert => cert.Id === certId);
    }
    this.showCertModal = !this.showCertModal;
  }

  changeMapMarker = (event) => {
    const title = event.currentTarget.dataset.title;
    for (const marker of CONSTANTS.mapStuff) {
      marker.pressed = (title === marker.addressTitle);
      this.currentMapMarkerUrl = marker.pressed ? marker.urlString : this.currentMapMarkerUrl;
    }
  }

  closeCertModal = () => {
    this.showCertModal = !this.showCertModal;
  }

  closeWelcomeMat = () => {
    this.showHeader = false;
    localStorage.setItem('hasClosedHeader', true);
  }

  connectedCallback() {
    this.mapStuff = CONSTANTS.mapStuff;
    this.currentMapMarkerUrl = this.mapStuff[0].urlString;
    getResumeSiteWrapper({timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, form: formFactorPropertyName, userAgent: navigator.userAgent})
        .then(result => {
            this.wrapper = result;
        })
        .catch(error => {
            this.error = error;
        });
  }

  emailClicked = () => {
    const emailBody = `Dylan,%0D%0A%0D%0A Who the hell do you think you are? %0D%0A%0D%0A Signed, %0D%0A%0D%0A Website Visitor from ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    window.open(`mailto:dylanjacksonmorrill@gmail.com?body=${emailBody}&subject=Listen here you!`, '_blank');
  }

  getInTouchModalHandler() {
    this.showGetInTouchModal = !this.showGetInTouchModal;
  }

  goToUrl(event) {
    let url = event.currentTarget.dataset.url;
    if (!url) {
      url = `mailto:dylanjacksonmorrill@gmail.com`;
    }
  }

  helpfulLinksHandler() {
    this.showHelpfulLinks = !this.showHelpfulLinks;
  }

  mapModalHandler() {
    this.showMapModal = !this.showMapModal;
  }
}