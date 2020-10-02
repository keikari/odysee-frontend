import {User} from './model/user';
import {Discord} from './model/discord';
import {Github} from './model/github';
import {Twitter} from './model/twitter';
import {Linkedin} from './model/linkedin';
import {Facebook} from './model/facebook';
import {LbryInc} from './model/lbry-inc';

export class PendingUser {
  form: User;
  discord: Discord;
  github: Github;
  twitter: Twitter;
  facebook: Facebook;
  linkedin: Linkedin;
  duplicates: PendingUser[];
  lbryInc: LbryInc;
  is_good_email: boolean;

  constructor( u: any) {
    this.form = new User();
    this.discord = new Discord();
    this.github = new Github();
    this.twitter = new Twitter();
    this.facebook = new Facebook();
    this.linkedin = new Linkedin();
    this.lbryInc = new LbryInc();
    this.duplicates = [];
    this.is_good_email = true;
    if (u === null) {
      return this;
    }
    if (u.user) {
      const formData = new User();
      formData.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      formData.name = u.user.name;
      formData.last_name = u.user.last_name;
      formData.email = u.user.email;
      formData.ip = u.user.ip;
      formData.score = u.user.score;
      formData.motivation = u.user.motivation;
      formData.feedback = u.user.feedback;
      formData.uses_vpn = u.user.uses_vpn;
      formData.is_first_account = u.user.is_first_account;
      formData.is_first_application = u.user.is_first_application;
      formData.fingerprint = u.user.fingerprint;
      formData.ticket_id = u.user.ticket_id;
      formData.browser = u.user.browser;
      formData.os = u.user.os;
      formData.device = u.user.device;
      formData.status = u.user.status;
      formData.created_at = new Date(u.user.created_at);
      formData.updated_at = new Date(u.user.updated_at);
      this.form = formData;
    }
    if (u.discord) {
      const d = new Discord();
      d.user_id = u.discord.user_id;
      d.username = u.discord.username;
      d.discriminator = u.discord.discriminator;
      d.discord_user_id = u.discord.discord_user_id;
      d.discord_created_at = new Date(u.discord.discord_created_at);
      d.email = u.discord.email;
      d.verified = u.discord.verified;
      d.in_guild = u.discord.in_guild;
      d.ticket_exists = u.discord.ticket_exists;
      d.created_at = new Date(u.discord.created_at);
      d.updated_at = new Date(u.discord.updated_at);
      this.discord = d;
      if (d.email!=u.user.email) this.is_good_email=false
    }
    if (u.github) {
      const gh = new Github();
      gh.user_id = u.github.user_id;
      gh.name = u.github.name;
      gh.username = u.github.username;
      gh.github_created_at = new Date(u.github.github_created_at);
      gh.followers_count = u.github.followers_count;
      gh.following_count = u.github.following_count;
      gh.owned_repositories = u.github.owned_repositories;
      gh.location = u.github.location;
      gh.description = u.github.description;
      gh.created_at = new Date(u.github.created_at);
      gh.updated_at = new Date(u.github.updated_at);
      gh.emails = u.github.emails.join(' ');
      this.github = gh;
      let is_match=false;
      u.github.emails.forEach(email => {
        if (email==u.user.email) is_match=is_match||true
      });
      if (!is_match) this.is_good_email = false
    }

    if (u.twitter) {
      const twitter = new Twitter();
      twitter.user_id = u.twitter.user_id;
      twitter.name = u.twitter.name;
      twitter.screen_name = u.twitter.screen_name;
      twitter.email = u.twitter.email;
      twitter.twitter_created_at = u.twitter.twitter_created_at;
      twitter.followers_count = u.twitter.followers_count;
      twitter.friends_count = u.twitter.friends_count;
      twitter.statuses_count = u.twitter.statuses_count;
      twitter.location = u.twitter.location;
      twitter.profile_image_url = u.twitter.profile_image_url;
      twitter.description = u.twitter.description;
      twitter.created_at = u.twitter.created_at;
      twitter.updated_at = u.twitter.updated_at;
      this.twitter = twitter;
      if (twitter.email!=u.user.email) this.is_good_email=false
    }

    if (u.facebook) {
      const fb = new Facebook()
      fb.user_id = u.facebook.user_id;
      fb.name = u.facebook.name;
      fb.last_name = u.facebook.last_name;
      fb.email = u.facebook.email;
      fb.created_at = u.facebook.created_at;
      fb.updated_at = u.facebook.updated_at;
      this.facebook = fb;
      if (fb.email!=u.user.email) this.is_good_email=false
    }

    if (u.linkedin) {
      const lin = new Linkedin();
      lin.user_id = u.linkedin.user_id;
      lin.name = u.linkedin.name;
      lin.last_name = u.linkedin.last_name;
      lin.email = u.linkedin.email;
      lin.created_at = u.linkedin.created_at;
      lin.updated_at = u.linkedin.updated_at;
      this.linkedin = lin;
      if (lin.email!=u.user.email) this.is_good_email=false
    }


    if (u.duplicates) {
      this.duplicates = u.duplicates.map((p) => new PendingUser(p) );
    }
    if (u.lbry_inc_data) {
      console.log(u.lbry_inc_data)
      this.lbryInc.user_id = u.lbry_inc_data.user_id;
      this.lbryInc.manually_blocked = u.lbry_inc_data.manually_blocked;
      this.lbryInc.rewards_enabled = u.lbry_inc_data.rewards_enabled;
    }
    return this;
  }
}
