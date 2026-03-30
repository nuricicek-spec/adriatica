export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO format YYYY-MM-DD
  readTime: number;
  description: string;
  contentHtml: string;
  pdfUrl: string;
  relatedSlugs?: string[];
  relatedServices?: string[];
  relatedCaseStudies?: string[];
}

export const insights: Insight[] = [
  {
    slug: 'zero-emission-zone-boka-kotorska',
    title: 'The Case for a "Zero-Emission Zone": Why is Boka Kotorska Not Protected Yet?',
    category: 'Strategic Outlook',
    date: '2026-03-25',
    readTime: 8,
    description: 'A strategic policy paper comparing Boka Kotorska with UNESCO‑protected sites that have implemented Zero‑Emission Zones (ZEZ).',
    contentHtml: `
      <figure class="my-8">
        <img src="/insights-images/boka-kotorska-map.jpg" 
             alt="Map of Boka Kotorska Bay, Montenegro" 
             class="rounded-lg shadow-md w-full"
             loading="lazy">
        <figcaption class="text-sm text-muted-foreground mt-2 text-center">
          Boka Kotorska (Bay of Kotor), a UNESCO World Heritage site, remains vulnerable to maritime emissions.
        </figcaption>
      </figure>

      <p class="lead text-lg font-medium mb-6">Listed as a UNESCO World Heritage site since 1979, Boka Kotorska is one of the most significant and fragile ecosystems in the Mediterranean. While structurally similar regions (e.g., Gulf of Girolata, Geirangerfjord) have rapidly implemented Zero-Emission Zones (ZEZ) - areas where vessel operations are restricted to zero-emission propulsion or equivalent emission-neutral technologies - Boka Kotorska remains without comprehensive protection against maritime emissions. This paper analyzes global benchmarks, identifies structural risks, and proposes a strategic "Blue Economy" roadmap. It calls for immediate preparatory actions in 2026-2027, followed by a phased administrative framework between 2027 and 2030, supported by an EU-backed innovation ecosystem to preserve this heritage for future generations.</p>

      <h2>1. Structural Sensitivity and Cultural Heritage</h2>
      <p>Boka Kotorska was inscribed on the UNESCO World Heritage list as the "Natural and Culturo-Historical Region of Kotor" in 1979. Its unique semi-enclosed fjord-like structure, connected by narrow straits (Verige), results in extremely limited water circulation and air exchange.</p>
      <p>In critical zones such as the Blue Cave and the inner basins of Perast and Kotor, exhaust emissions (NOx, SOx, and Particulate Matter) from internal combustion engines and generators become trapped. Due to the bay’s restricted water exchange, even moderate emission loads can result in locally elevated pollutant concentrations, significantly exceeding open‑sea dispersion conditions. This anthropogenic pressure not only degrades marine biodiversity but also accelerates the physical erosion of historic limestone structures due to the acidic nature of soot and gas deposits.</p>

      <h2>2. Comparative Analysis: UNESCO Milestones vs. Regulatory Action</h2>
      <p>The following table illustrates the "protection gap" between Boka Kotorska and its global structural twins:</p>

      <div class="overflow-x-auto my-8">
        <table class="w-full border-collapse border border-border text-sm">
          <thead>
            <tr class="bg-neutral-100">
              <th class="border border-border p-3 text-left font-medium">Region / Destination</th>
              <th class="border border-border p-3 text-left font-medium">UNESCO Status (Year)</th>
              <th class="border border-border p-3 text-left font-medium">Restriction Milestones</th>
              <th class="border border-border p-3 text-left font-medium">Primary Rationale &amp; Policy</th>
              <th class="border border-border p-3 text-left font-medium">Legal Basis / Instrument</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-3">Boka Kotorska (Montenegro)</td>
              <td class="border border-border p-3">1979</td>
              <td class="border border-border p-3">Undefined</td>
              <td class="border border-border p-3">No structured motor or emission restrictions currently in place.</td>
              <td class="border border-border p-3">None (No specific instrument)</td>
            </tr>
            <tr>
              <td class="border border-border p-3">Gulf of Girolata (France)</td>
              <td class="border border-border p-3">1983</td>
              <td class="border border-border p-3">Late 1990s</td>
              <td class="border border-border p-3">Rigid mooring and motor restrictions to protect marine reserves.</td>
              <td class="border border-border p-3">National Park Regulations</td>
            </tr>
            <tr>
              <td class="border border-border p-3">Cinque Terre (Italy)</td>
              <td class="border border-border p-3">1997</td>
              <td class="border border-border p-3">2002</td>
              <td class="border border-border p-3">Marine Protected Area (MPA) designation; strict transit control.</td>
              <td class="border border-border p-3">MPA Decree / Local Ordinance</td>
            </tr>
            <tr>
              <td class="border border-border p-3">Geirangerfjord (Norway)</td>
              <td class="border border-border p-3">2005</td>
              <td class="border border-border p-3">2018 / 2026</td>
              <td class="border border-border p-3">Mandatory zero‑emission requirement for tourist vessels, with entry into force in 2026.</td>
              <td class="border border-border p-3">National Zero-Emission Regulation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. The Catalyst for Restriction: Anthropogenic Impact</h2>
      <p>Global precedents indicate two primary drivers for implementing Zero-Emission Zones (ZEZ), both of which are currently at critical levels in Boka Kotorska:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Pollution Surge:</strong> Many areas were once isolated but faced a "sharp increase in human activity" with the rise of modern yachting. When the rate of pollution exceeds the ecosystem's self-renewal capacity, radical operational bans become the only viable solution.</li>
        <li><strong>Material Degradation and Aesthetic Erosion:</strong> Acidic exhaust gases cause irreversible damage to UNESCO-protected stone architecture. This "structural erosion" has served as the legal basis for ZEZ implementation in Europe.</li>
      </ul>

      <h2>4. Administrative Action Plan: A Roadmap for Protection</h2>
      <p>To ensure the preservation of this natural beauty for future generations, Montenegro’s maritime and coastal authorities should prioritize a structural protection discipline:</p>
      <ol class="list-decimal pl-6 space-y-4">
        <li><strong>Phase 1 (2026-2027):</strong> Feasibility and baseline emission assessment. Conduct comprehensive monitoring of current emission levels and vessel activity to establish a reference point.</li>
        <li><strong>Phase 2 (2027-2028):</strong> Regulatory drafting and stakeholder consultation. Develop a draft ZEZ regulation; engage with local operators, marinas, and international experts to refine requirements.</li>
        <li><strong>Phase 3 (2028-2030):</strong> Gradual enforcement and infrastructure deployment. Introduce the ZEZ in stages, initially for tourist vessels, supported by investments in shore-side charging and retrofitting incentives. Following the models of Girolata and Cinque Terre, dedicated monitoring and enforcement mechanisms may be required. These units will serve as the guardians of the bay’s prestige and ecological health.</li>
      </ol>

      <figure class="my-8">
        <img src="/insights-images/roadmap-zero-emission-boka.png" 
             alt="Phased roadmap for a Zero-Emission Zone in Boka Kotorska" 
             class="rounded-lg shadow-md w-full"
             loading="lazy">
        <figcaption class="text-sm text-muted-foreground mt-2 text-center">
          A 3‑phase roadmap to a fully protected Boka Kotorska Bay.
        </figcaption>
      </figure>

      <h2>5. The Strategic Opportunity: An EU-Backed Blue Economy</h2>
      <p>Declaring Boka Kotorska a "Zero-Emission Zone" is not merely a restriction; it is an invitation for high-tech investment and international cooperation:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>EU Green Deal &amp; Funding:</strong> As a candidate country, Montenegro can leverage IPA III and Horizon Europe funds to transform Boka Kotorska into a "Living Lab" for green maritime technology.</li>
        <li><strong>The Triple Helix Model:</strong> A collaboration between Academia (University of Montenegro), Government, and Industry (Adriatica D.O.O. as a potential technical contributor to feasibility and engineering assessment studies) can foster a unique innovation hub. This ecosystem will focus on developing specialized electric vessels, eco-taxis, and hybrid service boats tailored for the bay.</li>
        <li><strong>Sustainable Economic Growth:</strong> By creating a market for zero-emission technology, Montenegro can shift from "mass/low-value" tourism to "high-end/sustainable" maritime operations, ensuring long-term economic prosperity and local employment.</li>
      </ul>

      <h2>6. Conclusion</h2>
      <p>The protection of Boka Kotorska is not an environmental romance; it is a strategic necessity. Proactive engineering solutions such as active exhaust aftertreatment and hybrid conversions, combined with an EU-backed administrative roadmap, will secure the bay’s status as a world-class, "clean-sea" destination. Delaying structured intervention may result in irreversible environmental degradation and increased future regulatory burden. The time to act is not when the damage is permanent, but while the vision for a "Green Adriatic" is still within reach.</p>

      <h2>References</h2>
      <ol class="list-decimal pl-6 space-y-1 text-sm">
        <li>UNESCO (1979): Natural and Culturo-Historical Region of Kotor - Ref: 125.</li>
        <li>UNESCO (1983): Gulf of Porto: Calanche of Piana, Gulf of Girolata, Scandola Reserve - Ref: 258.</li>
        <li>UNESCO (1997): Portovenere, Cinque Terre, and the Islands - Ref: 826.</li>
        <li>UNESCO (2005): West Norwegian Fjords - Geirangerfjord and Nærøyfjord - Ref: 1195.</li>
        <li>Norwegian Maritime Authority (2026 Strategy): Regulations relating to zero emission requirements in the World Heritage fjords.</li>
        <li>EU Green Deal (COM(2019) 640 final): Communication from the Commission - The European Green Deal.</li>
        <li>Adriatica D.O.O. Engineering Archives: Comparative analysis on anthropogenic impact and ZEZ feasibility (2025).</li>
      </ol>
    `,
    pdfUrl: '/pdfs/ADRI-TIS-004.pdf',
    relatedSlugs: ['biofouling-compliance-imo-2026'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: [],
  },
  {
    slug: 'technical-operations-montenegro',
    title: 'Technical Operations in Montenegro: Navigating Local Regulations and Shipyard Excellence',
    category: 'Case Insight',
    date: '2026-03-20',
    readTime: 5,
    description: 'Examination of Montenegro\'s maritime landscape, focusing on UPSUL regulations and shipyard capabilities.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-003.pdf',
    relatedSlugs: [],
    relatedServices: ['project-management'],
    relatedCaseStudies: ['refit-supervision-shipyard'],
  },
  {
    slug: 'sustainable-in-water-cleaning-yacht',
    title: 'Sustainable In-Water Cleaning: Engineering Management for European Coastal Yacht Compliance',
    category: 'Technical Guidance',
    date: '2026-02-20',
    readTime: 7,
    description: 'Technical guidance on managing in-water cleaning operations for vessels 25m+ and 50m+.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-002.pdf',
    relatedSlugs: ['biofouling-compliance-imo-2026'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: ['managed-in-water-cleaning'],
  },
  {
    slug: 'biofouling-compliance-imo-2026',
    title: 'Biofouling Compliance: Preparing for the IMO 2026 Transition',
    category: 'Regulation',
    date: '2026-01-20',
    readTime: 6,
    description: 'A real-world superyacht case study on proactive biofouling management.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-001.pdf',
    relatedSlugs: ['sustainable-in-water-cleaning-yacht'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: ['biofouling-management-mediterranean', 'managed-in-water-cleaning'],
  },
];