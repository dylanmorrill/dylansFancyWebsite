public without sharing class ResumeSiteController {
    @AuraEnabled
    public static ResumeSiteWrapper getResumeSiteWrapper(String timeZone, String form, String userAgent) {

      insert new Site_Visitor_Log__c(Name = timeZone, Form__c = form, User_Agent__c = userAgent);
      return new ResumeSiteWrapper();
    }

    public class ResumeSiteWrapper {
        @AuraEnabled
        public Site_Developer_Info__c dev =
            [SELECT Id, Address_Text__c, College_Logo__c, College_Major__c,
                    College_More_Info__c, College_Name__c,
                    Name, Where_I_Work__c, Where_I_Work_Logo__c,
                    Where_I_Work_Responsibilities__c, Where_I_Work_Title__c,
                    (SELECT Button_Text__c, Url__c
                     FROM Site_Buttons__r
                     ORDER BY CreatedDate),
                    (SELECT Company__c, Company_Url__c,
                            Description_Short__c, Logo__c, Title__c,
                            End_Date_Raw__c, Start_Date_Raw__c
                     FROM Site_Career_Histories__r
                     ORDER BY Order__c DESC),
                    (SELECT Date_Achieved__c, Image__c, Name, Full_Name__c,
                            Description__C, Description_More_Info__c
                     FROM Site_Certs__r
                     ORDER BY Pride_Level__c),
                    (SELECT Description__c, Image__c, Name, Url__c
                     FROM Site_Projects__r)
             FROM Site_Developer_Info__c
             WHERE Name = 'Dylan Morrill'];

        @AuraEnabled
        public List<SiteCareerHistoryWrapper> careerHistories =
            new List<SiteCareerHistoryWrapper>();

        public ResumeSiteWrapper() {
            for (Site_Career_History__c careerHistory :
                dev.Site_Career_Histories__r) {

                careerHistories.add(new SiteCareerHistoryWrapper(
                    careerHistory));
            }
        }
    }

    public class SiteCareerHistoryWrapper {
        @AuraEnabled
        public Site_Career_History__c careerHistory;
        @AuraEnabled
        public String timeFrameString;
        @AuraEnabled
        public String startYearTwoDigits;
        @AuraEnabled
        public String endYearTwoDigits;

        public SiteCareerHistoryWrapper (Site_Career_History__c careerHistory) {
            this.careerHistory = careerHistory;
            Integer totalMonths = careerHistory.Start_Date_Raw__c.monthsBetween(
                careerHistory.End_Date_Raw__c == null
                ? Date.today()
                : careerHistory.End_Date_Raw__c);

            String monthsDisplay = String.valueOf(Math.mod(totalMonths, 12));
            String yearsDisplay = String.valueOf(totalMonths / 12);
            startYearTwoDigits = String.valueOf(careerHistory.Start_Date_Raw__c.year()).subString(2,4);
            if (careerHistory.End_Date_Raw__c != null) {
              endYearTwoDigits = String.valueOf(careerHistory.End_Date_Raw__c.year()).subString(2,4);
            }
            timeFrameString = yearsDisplay != '0'
                ? yearsDisplay + ' yr ' + monthsDisplay + ' mo'
                : monthsDisplay + ' mo';
        }
    }
}