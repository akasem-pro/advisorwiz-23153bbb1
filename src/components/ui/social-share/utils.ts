
export interface ShareOptions {
  title: string;
  description: string;
  url: string;
}

export const defaultShareOptions: ShareOptions = {
  title: 'AdvisorWiz - Match with the Perfect Financial Advisor',
  description: 'Find your perfect financial match with AdvisorWiz',
  url: window.location.href
};
