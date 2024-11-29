export interface IPayloadSendEmail {
  name: string;
  email: string;
  interests: string;
  message: string;
}

export interface IPayloadCreateContact {
  email: string; // Email address
  attributes: {
    FIRSTNAME: string; // First name
    [key: string]: any; // Additional dynamic attributes, if any
  };
  emailBlacklisted: boolean; // Whether the email is blacklisted for emails
  smsBlacklisted: boolean; // Whether the email is blacklisted for SMS
  listIds: number[]; // Array of list IDs the email belongs to
  updateEnabled: boolean; // Whether to enable updating if the contact exists
  smtpBlacklistSender: string[]; // Array of email addresses blacklisted for SMTP
}
