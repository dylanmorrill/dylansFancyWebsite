import { LightningElement } from 'lwc';
import { CONSTANTS } from "c/mainConstants";
import getResumeSiteWrapper from '@salesforce/apex/ResumeSiteController.getResumeSiteWrapper';
import formFactorPropertyName from '@salesforce/client/formFactor'

export default class Main extends LightningElement {
  currentMapMarkerUrl;
  error;
  desktopBypass = false;
  logoImage;
  mapStuff;
  selectedCert;
  showCertModal = false;
  showHeader = !localStorage.getItem('hasClosedHeader');
  showMapModal = false;
  wrapper;

  get isFormFactorSupported() {
    return formFactorPropertyName == 'Small' || this.desktopBypass;
  }

  certModalHandler(event) {
    if (event.currentTarget.dataset.id) {
      this.selectedCert = this.wrapper.dev.Site_Certs__r.find(cert => cert.Id == event.currentTarget.dataset.id);
    }
    this.showCertModal = !this.showCertModal
  }

  changeDesktopBypass() {
    this.desktopBypass= !this.desktopBypass;
  }

  changeLogoImage() {
    let index = CONSTANTS.logoImages.indexOf(this.logoImage);
    if (index == 4) {
      this.logoImage = CONSTANTS.logoImages[0];
    } else {
      this.logoImage = CONSTANTS.logoImages[index+1];
    }
  }

  changeMapMarker(event) {
    let title = event.currentTarget.dataset.title;
    for (const marker of CONSTANTS.mapStuff) {
      if (title == marker.addressTitle) {
        marker.pressed = true;
        this.currentMapMarkerUrl = marker.urlString;
      } else {
        marker.pressed = false;
      }
    }
  }

  closeWelcomeMat() {
    this.showHeader = false;
    localStorage.setItem('hasClosedHeader', true);
  }

  connectedCallback() {
    this.logoImage = CONSTANTS.logoImages[0];
    this.mapStuff = CONSTANTS.mapStuff;
    this.currentMapMarkerUrl = this.mapStuff[0].urlString;
    getResumeSiteWrapper()
        .then(result => {
            this.wrapper = result;
        })
        .catch(error => {
            this.error = error;
        });
  }

  emailClicked() {
    let emailBody = 'Dylan,%0D%0A%0D%0A Who the hell do you think you are? %0D%0A%0D%0A Signed, %0D%0A%0D%0A Website Visitor' +
      ' from ' + Intl.DateTimeFormat().resolvedOptions().timeZone;
    window.open(`mailto:dylanjacksonmorrill@gmail.com?body=${emailBody}&subject=Listen here you!` , '_blank');
  }

  goToUrl(event) {
    window.open(event.currentTarget.dataset.url);
  }

  mapModalHandler() {
    this.showMapModal = !this.showMapModal;
  }
}