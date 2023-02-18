public without sharing class ResumeSiteController {
    @AuraEnabled(cacheable=true)
    public static ResumeSiteWrapper getResumeSiteWrapper() {
        return new ResumeSiteWrapper();
    }

    public class ResumeSiteWrapper {
        @AuraEnabled
        public Site_Developer_Info__c dev =
            [SELECT Id, Address_Text__c, College_Logo__c, College_Major__c,
                    College_More_Info__c, College_Name__c,
                    Name, Where_I_Work__c, Where_I_Work_Logo__c,
                    Where_I_Work_Responsibilities__c, Where_I_Work_Title__c,
                    (SELECT Company__c, Description_Long__c,
                            Description_Long_Rich__c,
                            Description_Short__c, End_Year__c, Logo__c,
                            Site_Developer_Info__c,
                            Start_Year__c, Title__c,
                            End_Date_Raw__c, Start_Date_Raw__c
                     FROM Site_Career_Histories__r
                     ORDER BY Order__c DESC),
                    (SELECT Date_Achieved__c, Image__c, Name, Full_Name__c,
                    Description__C, Description_More_Info__c
                     FROM Site_Certs__r
                     ORDER BY Pride_Level__c)
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

        public SiteCareerHistoryWrapper (Site_Career_History__c careerHistory) {
            this.careerHistory = careerHistory;

            Integer totalMonths = careerHistory.Start_Date_Raw__c.monthsBetween(
                careerHistory.End_Date_Raw__c);

            String monthsDisplay = String.valueOf(Math.mod(totalMonths, 12));
            String yearsDisplay = String.valueOf(totalMonths / 12);



            timeFrameString = yearsDisplay != '0'
                ? yearsDisplay + ' yr ' + monthsDisplay + ' mo'
                : monthsDisplay + ' mo';
        }
    }
}