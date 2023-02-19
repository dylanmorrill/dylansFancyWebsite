import { LightningElement, api } from 'lwc';

export default class MainCareerBlade extends LightningElement {
  @api careerHistWrap;
  openClass = 'slds-is-open';
  showCareerDescription = false;

  careerHistorySectionAction() {
    this.showCareerDescription = !this.showCareerDescription;
    const mainBodyClassList = this.template.querySelector('[data-id=mainBody]').classList;
    if (mainBodyClassList.contains(this.openClass)) {
      mainBodyClassList.remove(this.openClass);
    } else {
      mainBodyClassList.add(this.openClass);
    }
  }
}