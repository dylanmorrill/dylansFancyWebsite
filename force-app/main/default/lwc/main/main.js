import { LightningElement } from 'lwc';
import { CONSTANTS } from "c/mainConstants";

export default class Main extends LightningElement {
  showHeader = !localStorage.getItem('hasClosedHeader');
  showGlobeModal = false;
  mapHeader = CONSTANTS.mapMarkerHomeTitle;
  mapMarkersZoomLevel = 5;
  mapMarkerContext = 'home';
  mapMarkers = CONSTANTS.mapMarkerHome;
  mapMarkerOptions = CONSTANTS.mapMarkerOptions;
  certs = CONSTANTS.certs;

  activeSections = ['A', 'B'];
  
  handleMapTypeChange(event) {
   this.mapMarkerContext = event.detail.value;
   switch (this.mapMarkerContext) {
    case'home':
      this.mapHeader = CONSTANTS.mapMarkerHomeTitle;
      this.mapMarkers = CONSTANTS.mapMarkerHome;
      break;
    case'college':
      this.mapHeader = CONSTANTS.mapMarkerCollegeTitle;
      this.mapMarkers = CONSTANTS.mapMarkerCollege
      break;
    case'hometown':
      this.mapHeader = CONSTANTS.mapMarkerHometownTitle;
      this.mapMarkers = CONSTANTS.mapMarkerHometown;
      break;
  }
  }

  closeWelcomeMat() {
    this.showHeader = false;
    localStorage.setItem('hasClosedHeader', true);
  }

  globeModalTrigger() {
    this.showGlobeModal = !this.showGlobeModal;
  }
}