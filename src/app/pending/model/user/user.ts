import {Email} from '../email/email';
import {Phone} from '../phone/phone';
import {YoutubeChannel} from '../youtube_channel/youtube-channel';
import {CreditCard} from '../credit_card/credit-card';
import {Access} from '../access/access';
import {DuplicateAccount} from '../duplicate_account/duplicate-account';
import {Install} from '../install/install';
import {Note} from '../note/note';


export class User {
  UserID: bigint;
  GivenName: string;
  FamilyName: string;
  RewardStatusChangeTrigger: string;
  Emails: Email[] = [];
  Phones: Phone[] = [];
  YoutubeChannels: YoutubeChannel[] = [];
  CreditCards: CreditCard[] = [];
  Accesses: Access[] = [];
  DuplicateAccounts: DuplicateAccount[] = [];
  Installs: Install[] = [];
  Notes: Note[] = [];
  PrimaryEmail: string;
  LastAccessTime: string;
  // Calculated Columns
  Duplicates: number;
  IsCountryMatch: boolean;
  Country: string;
  LastNote: string;
}
