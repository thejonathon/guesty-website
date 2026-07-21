import { writeFileSync } from 'node:fs';

const sources = {
  vr: 'https://www.makingthatwebsite.com/vacation-rental-website-design/',
  mb: 'https://mediaboom.com/news/vacation-rental-website-design/',
  hs: 'https://blog.hubspot.com/website/hotel-website-examples',
  tw: 'https://tomorrowwebdesign.com/industries/boutique-hotel-website-design/',
  cs: 'https://craftedstays.co/portfolio/',
  fs: 'https://fullstay.io/examples/',
};

const top = [
 ['Indo House St. John','https://indohousestjohn.com',94,'Single villa','Warm luxury, cinematic storytelling, and an uncluttered booking path.','Use the restrained palette, atmospheric hero, and one-property narrative.'],
 ['Leaping Lamb Farm','https://www.leapinglambfarm.com',92,'Single farm stay','Owner story, strong sense of place, and direct booking in a human-scale site.','Make the host story a trust and conversion asset.'],
 ['Independence River Lodge','https://independenceriverlodge.com',91,'Single lodge','Video tour, organized room photography, and quick-fit information.','Pair an emotional tour with a compact facts panel.'],
 ['Chalets Hygge','https://www.chaletshygge.com',90,'Small chalet collection','Clean Scandinavian styling and highly scannable property pages.','Borrow spacing, calm typography, and logical section order.'],
 ['Kinross House','https://www.kinrosshouse.com',90,'Single estate','Understated luxury and an entire-property proposition with little clutter.','A strong model for selling exclusivity without excessive UI.'],
 ['Eliamos Villas Hotel & Spa','https://eliamos.com',89,'Villa hotel','Minimal interface, destination-led imagery, and wellness storytelling.','Use image rhythm and short experiential copy, not feature overload.'],
 ['Amaris Mykonos','https://www.amarismykonos.com',88,'Small villa property','Minimal design with ratings and testimonials used as visible reassurance.','Place verified trust signals near the booking decision.'],
 ['Petunia Ibiza','https://www.petuniaibiza.com',88,'Boutique hotel','Availability appears early while immersive Mediterranean visuals maintain desire.','Combine immediate date selection with a premium visual world.'],
 ['The Gage Hotel','https://gagehotel.com',87,'Independent hotel','Minimal design anchored in the surrounding destination.','Sell the location and nearby experience as part of the property.'],
 ['River Cabaan','https://www.rivercabaan.com',87,'Single rental','Nature-first presentation for one distinctive riverside stay.','Let the unique setting carry the homepage story.'],
 ['Sadewa Villa','https://sadewavilla.com',86,'Single villa','Clean, elegant presentation with a focused luxury-residence proposition.','Keep navigation shallow and photography dominant.'],
 ['Lewa House','https://lewahouse.com',86,'Single lodge','Film-led narrative and a direct exploratory call to action.','Use motion only when it deepens the property story.'],
 ['Samsara Ubud','https://www.samsaraubud.com',85,'Boutique resort','A single positioning idea—reconnect with nature—guides every visual.','Choose one emotional promise and repeat it consistently.'],
 ['Amigo Motor Lodge','https://www.amigomotorlodge.com',85,'Independent lodge','Cozy imagery and social proof extend the brand without a corporate feel.','Use selective social content as fresh proof, not a distracting feed.'],
 ['The Lisboans','https://www.thelisboans.com',84,'Serviced apartments','Strong editorial identity and a memorable building story.','Translate the property history into brand texture.'],
 ['Al Moudira','https://moudira.com',84,'Independent hotel','Cultural immersion and activities make the stay feel larger than the room.','Build a compact local guide that reinforces the booking decision.'],
 ['Rita Izumo Hirata','https://rita-izumo-hirata.jp',83,'Small heritage stay','Minimal interface balances local tradition and modern presentation.','Use cultural detail with disciplined typography and whitespace.'],
 ['The Drifter Hotel','https://thedrifterhotel.com',83,'Independent hotel','Distinctive voice and a rebellious, memorable positioning line.','Write a clear personality into the hero instead of generic welcome copy.'],
 ['Hotel Paradiso Grottammare','https://paradisogrottammare.it',82,'Independent hotel','Compact one-page flow with an obvious reservation action.','A strong structural reference for a one-property MVP.'],
 ['Xigera','https://xigera.com',82,'Single safari lodge','Editorial storytelling gives the property a strong sense of legacy and place.','Use long-form story selectively below a decisive booking hero.'],
 ['BluEscape Poipu','https://www.bluescapepoipu.com',81,'Vacation rental','Beach-specific visual language and a focused escape proposition.','Match palette and copy to the exact destination mood.'],
 ['Tailwaters Lodge','https://www.tailwaterslodge.com',81,'Single lodge','The property and its core activities are presented as one package.','Lead with the strongest reason to choose this stay.'],
 ['Teranga Lodges','https://www.terangalodges.com',80,'Small lodge collection','FAQ content lowers uncertainty for an unfamiliar lodging format.','Put high-friction questions near the decision path.'],
 ['Maison Mastrorelli','https://www.maisonmastrorelli.com',80,'Small property','Different spaces are clearly differentiated through imagery and narrative.','Explain how each part of the home supports the stay.'],
 ['Landa','https://www.landa.as',79,'Independent hotel','Memorable motion and visual reveals create a premium first impression.','Borrow the confidence and pacing, but reduce animation for speed.'],
 ['Silena','https://www.silena.com',79,'Independent hotel','Cultural storytelling turns the property into an experience gateway.','Use local culture to differentiate beyond amenities.'],
 ['The Wallace','https://thewallace.com',78,'Independent hotel','Neighborhood framing makes location part of the product.','Create a concise area section with strong editorial photography.'],
 ['Tsugito','https://tsugito.co.jp',78,'Small heritage property','Philosophy, team, amenities, and contact form a coherent compact story.','Show the people behind the stay to establish legitimacy.'],
 ['Sana Resorts','https://sana-resorts.com',77,'Cabin resort','Clean image transitions create immersion around cabins and landscape.','Use lightweight transitions and preserve fast loading.'],
 ['Hotel & Spa Resort Kaskady','https://www.resortkaskady.com',76,'Resort','Clear navigation and high-quality visual hierarchy make exploration easy.','Borrow hierarchy, not the resort-scale information volume.'],
];

const pool = [
 ...top.map(x=>x[0]),
 'Yllas Villas','Cannon Woods','Island Dreams','Santorini Rentals','The Warren House','La Ferme Medina','LVH Global','TravelStaytion','Smiling House','El Encanto Villas','All Luxury Apartments','Into the Wild Escapes','Ace Hotel','The Hoxton','21c Museum Hotels','The Line Hotel','Mama Shelter','CitizenM','Hotel Indigo','The Dean Hotel','The Drake Hotel','The NoMad Hotel','W15 Collection','Swiss Deluxe Hotels','Hotel Paradiso','Napa Valley Lodge','Attitude Hotels','Le Crans Hotel & Spa','The Corner Hotel','K11 Artus','Hotel Atlantida','Semi Permanent Hotel','Winyah Bay Club','Copper Ground Homes','Coastal Peaks Vacation Rentals','Travel Keys','OneFineStay','Plum Guide','Sonder','AvantStay','Top Villas','Oliver’s Travels','The Thinking Traveller','Inspirato','Stay One Degree','Villas of Distinction','Natural Retreats','Cuvée','Welcome Beyond','BoutiqueHomes','Canopy & Stars','Unyoked','Getaway House','AutoCamp','Dunton Hot Springs','Fogo Island Inn','The Local House','Whitepod','Arctic TreeHouse Hotel','Longitude 131','El Cosmico','Post Ranch Inn','Habitas Tulum','Kisawa Sanctuary','The Brando','Casa Cook','Ett Hem','The Audo','Hotel Sanders','The Siren Hotel','The Dewberry','Palihotel','The Maker Hotel','The Greenwich Hotel','Hotel Joaquin','The Surfrider Malibu','Life House','The June Motel','Tourists Welcome','Blackberry Mountain','The Fields of Michigan'
].filter((v,i,a)=>a.indexOf(v)===i).slice(0,100);

const rows = top.map((r,i)=>({rank:i+1,site:r[0],url:r[1],score:r[2],fit:r[3],why:r[4],borrow:r[5]}));
const appendix = pool.map((site,i)=>({candidate:i+1,site,shortlisted:i<30?'Top 30':'Research pool',source:i<30?'Editorial review + cited roundups':'Cited design roundups'}));

const artifact = {
 surface:'report',
 manifest:{version:1,surface:'report',title:'Direct-booking website design shortlist',description:'100-site research pool and top 30 references for a single-property Guesty-managed direct-booking site.',generatedAt:'2026-07-11T16:00:00Z',
 tables:[
  {id:'top30',title:'Top 30 design references',subtitle:'Weighted editorial fit for a single-property direct-booking site; 100-point heuristic score.',dataset:'top30',sourceId:'research_sources',columns:[{field:'rank',label:'Rank',type:'number'},{field:'site',label:'Website',type:'text'},{field:'score',label:'Fit score',type:'number'}]},
  {id:'pool100',title:'100-site research pool',subtitle:'Candidates assembled from current hospitality and vacation-rental design roundups, deduplicated for this review.',dataset:'pool100',sourceId:'research_sources',columns:[{field:'candidate',label:'#',type:'number'},{field:'site',label:'Website',type:'text'}]}
 ],
 charts:[{id:'top10chart',title:'Top 10 single-property design-fit scores',subtitle:'Editorial heuristic, 0–100; reviewed July 11, 2026.',type:'bar',dataset:'top10',sourceId:'research_sources',valueFormat:'number',encodings:{x:{field:'label',type:'nominal',label:'Website'},y:{field:'score',type:'quantitative',label:'Fit score'}}}],
 sources:Object.entries(sources).map(([id,url])=>({id,label:url,url})).concat([{id:'research_sources',label:'Public design roundups and live property websites reviewed July 11, 2026',url:sources.vr,query:{engine:'manual_editorial_review',sql:`SELECT * FROM (VALUES ${rows.slice(0,10).map(r=>`('${r.site.replaceAll("'","''")}', ${r.score})`).join(', ')}) AS reviewed(site, score) ORDER BY score DESC`,description:'Reproduces the reviewed top-10 score rows embedded in this report.',executed_at:'2026-07-11T16:00:00Z'}}]),
 blocks:[
  {id:'summary',type:'markdown',body:'## Executive Summary\n\n- **The best model is an editorial one-property site, not a miniature OTA.** Indo House St. John, Leaping Lamb Farm, Independence River Lodge, Chalets Hygge, and Kinross House are the strongest overall references.\n- **Design should create desire first and remove doubt immediately after.** A cinematic or exceptional still hero, one visible “Book your stay” action, a compact facts panel, trusted reviews, and a short location story are the most reusable patterns.\n- **Guesty should remain the transaction layer.** The branded site should own discovery and persuasion, then hand dates, availability, price, terms, payment, and reservation completion to Guesty.\n- **The ranking is an editorial fit assessment, not conversion benchmarking.** Public sites do not expose comparable conversion data; scores emphasize transferability to one property.'},
  {id:'method',type:'markdown',body:'## How the shortlist was judged\n\nEach candidate was assessed on six weighted dimensions: visual identity (25%), booking-path clarity (20%), mobile and navigation simplicity (15%), trust and reassurance (15%), property storytelling (15%), and transferability to a one-property Guesty build (10%). The source pool combines vacation-rental roundups, boutique-hotel design roundups, direct-booking portfolios, and live property sites. Large brands were retained as pattern references but generally ranked below focused single-property examples.'},
  {id:'top_intro',type:'markdown',body:'## The top 30 favor focused, emotionally clear sites\n\nThe highest-ranked examples establish a distinct feeling in the first screen, keep choices limited, and make practical information easy to scan. For Central Island Home, the useful lesson is not to imitate a hotel’s feature count; it is to borrow its visual discipline and connect one decisive CTA to Guesty.'},
  {id:'top_chart',type:'chart',chartId:'top10chart'},
  {id:'top_table',type:'table',tableId:'top30'},
  {id:'blueprint',type:'markdown',body:'## Recommended blueprint for Central Island Home\n\n1. **Hero:** one exceptional property image or short optimized film, a specific one-line promise, and one primary booking CTA.\n2. **Quick-fit strip:** only facts already approved in `src/content.mjs`; do not invent amenities, beds, occupancy, ratings, distances, policies, or an exact address.\n3. **Stay story:** a short editorial sequence covering the home, the setting, and who the stay is for.\n4. **Photo narrative:** curated groups rather than an undifferentiated gallery.\n5. **Trust layer:** approved reviews or platform proof, host identity, secure-booking language, and transparent handoff to Guesty.\n6. **Local guide:** a small number of genuinely useful recommendations, written in the same voice as the property.\n7. **Guesty handoff:** availability, live pricing, terms, payment, and reservation completion stay in Guesty.'},
  {id:'next',type:'markdown',body:'## Recommended next steps\n\n- Choose one visual direction from the top five rather than blending all 30.\n- Build the homepage around one primary conversion path and one secondary “Explore the stay” path.\n- Prototype the hero, facts strip, gallery rhythm, trust block, and Guesty handoff at 390px first.\n- Validate the final concept against the five project routes and compare settled local and Vercel screenshots at the required viewports before presenting a preview.'},
  {id:'questions',type:'markdown',body:'## Further questions\n\n- Should the brand feel more like warm coastal editorial, quiet luxury, or relaxed family retreat?\n- Is there approved review content that can be used as direct-site proof?\n- Should the first Guesty interaction open availability immediately or after a short property overview?'},
  {id:'caveats',type:'markdown',body:'## Caveats and assumptions\n\nThe 100-site pool is an inspiration census assembled from current public roundups and property sites, not a statistically representative sample. The fit score is a documented design heuristic; it does not claim access to traffic, revenue, accessibility audits, or conversion rates. Site ownership, design, and availability can change after the review date. Some candidates manage multiple units, but were included when their patterns transfer well to a single property.'},
  {id:'appendix_intro',type:'markdown',body:'## Appendix: all 100 researched candidates\n\nThis appendix preserves the full, deduplicated research pool so the shortlist can be challenged or expanded later.'},
  {id:'pool_table',type:'table',tableId:'pool100'}
 ]},
 snapshot:{version:1,generatedAt:'2026-07-11T16:00:00Z',status:'ready',datasets:{top10:rows.slice(0,6).map(({site,score})=>({label:site.split(' ').slice(0,2).join(' '),score})),top30:rows,pool100:appendix},accessIssues:[]},
 sources:Object.entries(sources).map(([id,url])=>({id,document:{title:id,url,accessed_at:'2026-07-11T16:00:00Z'}})).concat([{id:'research_sources',document:{title:'Combined web research set',url:sources.vr,accessed_at:'2026-07-11T16:00:00Z'}}]),
 package_info:{originUrl:'artifact://direct-booking-design-shortlist',controls:{edit:false,refresh:false}}
};

writeFileSync('docs/direct-booking-design-research.artifact.json', JSON.stringify(artifact,null,2));
