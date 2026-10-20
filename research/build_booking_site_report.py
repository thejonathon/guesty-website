from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.style import WD_STYLE_TYPE
from pathlib import Path

OUT = Path('artifacts/direct-booking-design-benchmark.docx')
OUT.parent.mkdir(parents=True, exist_ok=True)

top = [
('1','Chalets Hygge','https://chaletshygge.com/','Best overall fit','A focused, calm chalet presentation with a logical, scan-friendly property page. It proves a single stay can feel premium without a large catalog.','Use a full-bleed seasonal hero, concise value proposition, compact amenity highlights, and persistent availability CTA.','Keep the custom site responsible for persuasion and route dates, live rates, terms, payment, and confirmation to Guesty.'),
('2','Amaris Mykonos','https://www.amarismykonos.com/','Best minimalist trust model','High-quality imagery does most of the selling while ratings and testimonials add credibility without clutter.','Lead with the property mood, then place verified review excerpts and a clear booking action close together.','Do not hard-code ratings; use only verified, maintainable social proof. Guesty remains the transactional source.'),
('3','Kinross House','https://www.kinrosshouse.com/','Best estate storytelling','Editorial pacing, strong photography, and restrained typography turn one destination into a complete world.','Borrow the chapter-like scroll: promise, setting, interiors, experience, gallery, then booking.','A lighter implementation is preferable; preserve performance and hand off availability and checkout to Guesty.'),
('4','Lewa House','https://www.lewahouse.com/','Best sense of place','The site sells the emotional reason to travel before it explains logistics, using place-led imagery and human storytelling.','Use concise local context and host/property story to differentiate from OTA listings.','Keep claims factual and property-specific; Guesty controls bookable inventory and commercial terms.'),
('5','Petunia Ibiza','https://petuniaibiza.com/','Best visual rhythm','Bold imagery, generous whitespace, and an elevated editorial grid create a polished hospitality feel.','Use alternating image/text modules and one unmistakable accent color for booking actions.','Avoid animation that delays the first meaningful image or obstructs the booking CTA.'),
('6','Eliamos Villas Hotel & Spa','https://eliamos.com/','Best refined conversion path','The interface balances a serene luxury identity with visible reservation intent.','Adopt a slim sticky header, clear Book button, and modular content that works equally well on mobile.','The CTA should launch Guesty’s embedded or hosted booking flow with dates and guest count when supported.'),
('7','Silena','https://www.silena.com/','Best distinctive brand voice','A memorable visual system and editorial tone make the property recognizable rather than interchangeable.','Develop a small set of ownable colors, type treatments, and photographic rules around the property’s real character.','Use expressive branding around, not inside, the Guesty checkout handoff.'),
('8','Musha Cay','https://www.mushacay.com/','Best one-property aspiration','A single destination is treated as a complete experience through cinematic imagery, exclusivity, and narrative sequencing.','Use one decisive hero, a short emotional promise, and experience-led sections rather than a property-search interface.','Scale the cinematic approach to the actual photo library and performance budget; do not imitate unsupported luxury claims.'),
('9','Bawah Reserve','https://www.bawahreserve.com/','Best immersive nature story','Exceptional destination imagery and environmental storytelling sustain interest through a long page.','Use landscape-led section breaks and a visual map or concise local guide when it helps orientation.','For one home, reduce the number of sections and keep Book/Check availability continuously accessible.'),
('10','Colette’s Bed & Breakfast','https://colettes.com/','Best personality and warmth','The design feels owner-operated and specific, showing that character can outperform generic luxury polish.','Let authentic voice, recognizable details, and warm photography carry the brand.','Maintain modern accessibility, mobile usability, and a clean Guesty booking handoff even if the visual voice is homespun.'),
]

names = [
'Chalets Hygge','Amaris Mykonos','Kinross House','Lewa House','Petunia Ibiza','Eliamos Villas Hotel & Spa','Silena','Musha Cay','Bawah Reserve',"Colette’s Bed & Breakfast",
'Hotel & Spa Resort Kaskady','Al Moudira','Swiss Deluxe Hotels','W15 Collection','Landa','Maison Mastrorelli','The Wallace','Hotel Paradiso Grottammare','Samsara Ubud','The Drifter Hotel','Rita Izumo Hirata','Semi Permanent Hotel','Sana Resorts Hotel','Teranga Lodges','Napa Valley Lodge','Attitude Hotels','Le Crans Hotel & Spa','Tsugito','The Corner Hotel','K11 Artus','Amigo Motor Lodge','The Gage Hotel','Xigera','Hotel Atlantida',
'Onefinestay','Plum Guide','Sun King Vacation Rentals','Inaterra','LVH Global','Cuvee','Smiling House','All Luxury Apartments',"Oliver’s Travels",'HVN','Vacasa','HOUFY','Evolve Vacation Rental','Hotels.com','Airbnb','Vrbo','Booking.com','Agoda','Expedia','Tripadvisor','Sonder','AvantStay','Inspirato','Homes & Villas by Marriott Bonvoy','The Thinking Traveller','Unique Homestays','BoutiqueHomes','Welcome Beyond','CoolStays','Sawday’s','Canopy & Stars','The Plum Guide','Kid & Coe','ThirdHome','Stay One Degree','Villas of Distinction','Exceptional Villas','Wimdu','HomeToGo','RedAwning','TurnKey Vacation Rentals','Natural Retreats','Blueground','Mint House','Sonder The Heid','Getaway House','AutoCamp','Habitas','The Newt in Somerset','Grove of Narberth','Carpe Diem Santorini','Casa Cook','Dexamenes Seaside Hotel','Hotel Sanders','Ett Hem','Fogo Island Inn','The Jaffa','The Audo','The Calile','The Hoxton','Ace Hotel','The Line Hotel','The Ludlow','The Greenwich Hotel','The NoMad Hotel','The Standard Hotels','The Pig Hotels','Artist Residence','Another Place','The Fish Hotel','The Other House']
names = names[:100]
assert len(names)==100

sources = [
('Guesty direct reservations and booking engine','https://www.guesty.com/features/direct-reservations/'),
('Making That Website: 35 vacation-rental designs','https://www.makingthatwebsite.com/vacation-rental-website-design/'),
('HubSpot: 30 hotel website examples','https://blog.hubspot.com/website/hotel-website-examples'),
('HotelTechReport: 35 hotel website designs','https://hoteltechreport.com/news/hotel-website-designs'),
('Mediaboom: 50 vacation-rental website examples','https://mediaboom.com/news/vacation-rental-website-design/'),
('Mediaboom: 50 travel website examples','https://mediaboom.com/news/travel-website-design/'),
]

doc=Document(); sec=doc.sections[0]
sec.top_margin=sec.bottom_margin=Inches(0.8); sec.left_margin=sec.right_margin=Inches(0.85)
styles=doc.styles
normal=styles['Normal']; normal.font.name='Calibri'; normal.font.size=Pt(10.5); normal.font.color.rgb=RGBColor.from_string('24313A')
normal.paragraph_format.space_after=Pt(6); normal.paragraph_format.line_spacing=1.1
for s,size,color,before,after in [('Title',29,'173F46',0,8),('Subtitle',12,'5D7074',0,18),('Heading 1',18,'173F46',18,8),('Heading 2',13,'B66A42',12,5),('Heading 3',11,'173F46',8,3)]:
 st=styles[s]; st.font.name='Calibri'; st.font.size=Pt(size); st.font.color.rgb=RGBColor.from_string(color); st.font.bold=(s!='Subtitle'); st.paragraph_format.space_before=Pt(before); st.paragraph_format.space_after=Pt(after)

def shade(cell, fill):
 tcPr=cell._tc.get_or_add_tcPr(); shd=OxmlElement('w:shd'); shd.set(qn('w:fill'),fill); tcPr.append(shd)
def set_cell(cell, text, bold=False, color='24313A', size=9):
 cell.text=''; p=cell.paragraphs[0]; p.paragraph_format.space_after=Pt(2); r=p.add_run(text); r.bold=bold; r.font.name='Calibri'; r.font.size=Pt(size); r.font.color.rgb=RGBColor.from_string(color); cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
def hyperlink(p, text, url):
 part=p.part; rid=part.relate_to(url,'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',is_external=True); h=OxmlElement('w:hyperlink'); h.set(qn('r:id'),rid); r=OxmlElement('w:r'); rp=OxmlElement('w:rPr'); c=OxmlElement('w:color'); c.set(qn('w:val'),'2B6F77'); rp.append(c); u=OxmlElement('w:u'); u.set(qn('w:val'),'single'); rp.append(u); r.append(rp); t=OxmlElement('w:t'); t.text=text; r.append(t); h.append(r); p._p.append(h)

p=doc.add_paragraph(style='Title'); p.add_run('Direct-Booking Website Design Benchmark')
p=doc.add_paragraph(style='Subtitle'); p.add_run('100-site research pool • Top 10 patterns for one Guesty-managed property • 11 July 2026')
p=doc.add_paragraph(); r=p.add_run('Recommendation in one line: '); r.bold=True; p.add_run('Build a focused editorial property site with a persistent availability action, then let Guesty own live pricing, availability, terms, payment, and reservation completion.')

doc.add_heading('How to read this report',1)
doc.add_paragraph('This is an inspiration benchmark, not a claim that every listed website uses Guesty. The 100-site pool combines direct-booking vacation rentals, independent hotels, and high-performing travel brands. The top 10 are ranked for transferability to a single-property site: visual clarity, mobile suitability, trust, booking-path visibility, storytelling discipline, and feasibility around a Guesty booking-engine handoff.')
doc.add_paragraph('Important constraint: individual sites can change after review. Any ratings, property facts, policies, or commercial claims must be verified before reuse. The proposed site should never duplicate or override Guesty’s live transactional data.')

doc.add_heading('Evaluation framework',1)
for x in ['Single-property fit (25%)','Booking-path clarity (20%)','Mobile and scanning behavior (15%)','Visual storytelling (15%)','Trust and decision support (10%)','Performance restraint (10%)','Guesty handoff feasibility (5%)']:
 doc.add_paragraph(x,style='List Bullet')

doc.add_heading('Top 10 shortlist',1)
for rank,name,url,label,why,borrow,guesty in top:
 doc.add_heading(f'{rank}. {name} — {label}',2)
 p=doc.add_paragraph(); hyperlink(p,'Visit website',url)
 p=doc.add_paragraph(); r=p.add_run('Why it ranks: '); r.bold=True; p.add_run(why)
 p=doc.add_paragraph(); r=p.add_run('Borrow: '); r.bold=True; p.add_run(borrow)
 p=doc.add_paragraph(); r=p.add_run('Guesty implementation note: '); r.bold=True; p.add_run(guesty)

doc.add_heading('Recommended design direction for one property',1)
for h,t in [
('Hero','One exceptional property image, a specific non-invented promise, and an always-visible “Check availability” action.'),
('Page flow','Hero → essential stay facts → image-led story → verified amenities → gallery → location context → verified reviews → FAQ/policies summary → Guesty booking handoff.'),
('Navigation','Keep it compact: Stay, Gallery, Location, FAQ, Check availability. Avoid a “Properties” catalog or destination search.'),
('Booking','Open Guesty’s embedded or hosted booking engine. Guesty remains authoritative for availability, rates, fees, policies, payment, and confirmation.'),
('Mobile','Use a bottom sticky availability button, short text blocks, swipe-friendly galleries, and no autoplay media that blocks interaction.'),
('Trust','Use accurate host/property identity, secure booking cues, contact path, and only verified testimonials or ratings.'),
('Performance','Prioritize the first hero image, responsive image sizes, restrained motion, and minimal third-party scripts before booking intent.')]:
 p=doc.add_paragraph(); r=p.add_run(h+': '); r.bold=True; p.add_run(t)

doc.add_heading('100-site research pool',1)
doc.add_paragraph('The pool is intentionally broad. Entries 1–10 are the ranked shortlist; entries 11–100 were used as comparative references for visual systems, content pacing, trust, search/booking UI, or hospitality storytelling. Large marketplaces are included only as pattern references and are not recommended as the information architecture for one property.')
table=doc.add_table(rows=1, cols=3); table.alignment=WD_TABLE_ALIGNMENT.CENTER; table.autofit=False
widths=[Inches(.55),Inches(2.65),Inches(3.55)]
for i,(txt,w) in enumerate(zip(['#','Website','Benchmark role'],widths)):
 table.columns[i].width=w; set_cell(table.rows[0].cells[i],txt,True,'FFFFFF',9); shade(table.rows[0].cells[i],'173F46')
for i,n in enumerate(names,1):
 cells=table.add_row().cells
 role='Top-10 single-property reference' if i<=10 else ('Hotel / independent-property inspiration' if i in list(range(11,35))+list(range(80,101)) else 'Vacation-rental / travel conversion reference')
 for j,(txt,w) in enumerate(zip([str(i),n,role],widths)):
  cells[j].width=w; set_cell(cells[j],txt,False,'24313A',8.5)
 if i%2==0:
  for c in cells: shade(c,'F3F6F5')

doc.add_heading('Source trail and methodology',1)
doc.add_paragraph('Candidate discovery used current web roundups plus direct inspection of selected sites. The selection favors transferable design patterns over awards alone. Source collections overlap, so names were deduplicated into a 100-site pool.')
for label,url in sources:
 p=doc.add_paragraph(style='List Bullet'); hyperlink(p,label,url)
doc.add_paragraph('Guesty compatibility is architectural: Guesty states that its booking engine can be embedded in Guesty-built or custom websites and handles real-time availability, rates, pricing rules, fees, policies, reservation confirmation, and calendar synchronization. This report does not assert that the example sites are Guesty customers.')

footer=sec.footer.paragraphs[0]; footer.alignment=WD_ALIGN_PARAGRAPH.CENTER; rr=footer.add_run('Central Island Home • Design research • July 2026'); rr.font.size=Pt(8); rr.font.color.rgb=RGBColor.from_string('6C7B7E')
doc.save(OUT)
print(OUT.resolve())
