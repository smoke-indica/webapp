import extractContent from './ExtractContent';
import {objAccessor} from './Accessors';
import normalizeProfile from './NormalizeProfile';

const siteDescription = 'Join the fastest growing cannabis network of like-minded individuals and earn rewards';

function addSiteMeta(metas) {
  metas.push({title: 'Smoke.io | Cannabis Social Network'});
  metas.push({name: 'description', content: siteDescription});
  metas.push({property: 'og:type', content: 'website'});
  metas.push({property: 'og:site_name', content: 'Smoke.io'});
  metas.push({property: 'og:title', content: 'Smoke.io | Cannabis Social Network'});
  metas.push({property: 'og:description', content: siteDescription});
  metas.push({property: 'og:image', content: 'https://smoke.io/images/socials.jpg'});
  metas.push({property: 'fb:app_id', content: $STM_Config.fb_app});
  metas.push({name: 'twitter:card', content: 'summary'});
  metas.push({name: 'twitter:site', content: '@smoke_io'});
  metas.push({name: 'twitter:title', content: 'Smoke.io | Cannabis Social Network'});
  metas.push({name: 'twitter:description', site_desc: siteDescription});
  metas.push({name: 'twitter:image', content: 'https://smoke.io/images/twitter.jpg'});
}

export default function extractMeta(chain_data, rp) {
  const metas = [];
  if (rp.username && rp.slug) { // post
    const post = `${rp.username}/${rp.slug}`;
    const content = chain_data.content[post];
    const author = chain_data.accounts[rp.username];
    const profile = normalizeProfile(author);
    if (content && content.id !== '0.0.0') { // API currently returns 'false' data with id 0.0.0 for posts that do not exist
      const d = extractContent(objAccessor, content, false);
      const url = 'https://smoke.io' + d.link;
      const title = d.title + ' — Smoke';
      const desc = d.desc + " by " + d.author;
      const image = d.image_link || profile.profile_image;
      const {category, created} = d;

      // Standard meta
      metas.push({title});
      metas.push({canonical: url});
      metas.push({name: 'description', content: desc});

      // Open Graph data
      metas.push({property: 'og:title', content: title});
      metas.push({property: 'og:type', content: 'article'});
      metas.push({property: 'og:url', content: url});
      metas.push({property: 'og:image', content: image || 'https://smoke.io/images/socials.jpg'});
      metas.push({property: 'og:description', content: desc});
      metas.push({property: 'og:site_name', content: 'Smoke.io'});
      metas.push({property: 'fb:app_id', content: $STM_Config.fb_app});
      metas.push({property: 'article:tag', content: category});
      metas.push({property: 'article:published_time', content: created});

      // Twitter card data
      metas.push({name: 'twitter:card', content: image ? 'summary_large_image' : 'summary'});
      metas.push({name: 'twitter:site', content: '@smoke_io'});
      metas.push({name: 'twitter:title', content: title});
      metas.push({name: 'twitter:description', content: desc});
      metas.push({name: 'twitter:image', content: image || 'https://smoke.io/images/twitter.jpg'});
    } else {
      addSiteMeta(metas);
    }
  } else if (rp.accountname) { // user profile root
    const account = chain_data.accounts[rp.accountname];
    let {name, about, profile_image} = normalizeProfile(account);
    if (name == null) name = account.name;
    if (about == null) about = "Join thousands of like-minded cannabis users on smoke.io who share, post and earn rewards.";
    if (profile_image == null) profile_image = 'https://smoke.io/images/images/twitter.jpg';
    // Set profile tags
    const title = `@${account.name}`;
    const desc = `The latest posts from ${name}. Follow me at @${account.name}. ${about}`;
    const image = profile_image;

    // Standard meta
    metas.push({name: 'description', content: desc});

    // Twitter card data
    metas.push({name: 'twitter:card', content: 'summary'});
    metas.push({name: 'twitter:site', content: '@smoke_io'});
    metas.push({name: 'twitter:title', content: title});
    metas.push({name: 'twitter:description', content: desc});
    metas.push({name: 'twitter:image', content: image});
  } else { // site
    addSiteMeta(metas);
  }
  return metas;
}
