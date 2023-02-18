import { LightningElement, api } from 'lwc';

export default class MainCareerBlade extends LightningElement {
  @api careerHistWrap;
  listClass;
  showCareerDescription = false;
  showMoreInfo = false;


  careerHistorySectionAction() {
    this.showCareerDescription = !this.showCareerDescription;
    let openClass = 'slds-is-open';

    const mainBodyClassList = this.template.querySelector('[data-id=mainBody]').classList;

    if (mainBodyClassList.contains(openClass)) {

      try{
        mainBodyClassList.remove(openClass);
      }catch (e) {
      }

    } else {
      mainBodyClassList.add(openClass);
    }
  }

  connectedCallback() {
    if (this.careerHistWrap.careerHistory.End_Year__c) {
      this.listClass = 'slds-timeline__item_expandable slds-timeline__item_email';
    } else {
      this.listClass = 'slds-timeline__item_expandable slds-timeline__item_email';
    }
  }

  showMoreInfoAction() {
    this.showMoreInfo = !this.showMoreInfo;
  }

}