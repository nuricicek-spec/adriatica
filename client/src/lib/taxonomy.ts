export const MARITIME_TAXONOMY: Record<string, string[]> = {
  // === REGULATIONS & COMPLIANCE ===
  "imo": ["imo", "international maritime organization"],
  "mepc": ["mepc", "marine environment protection committee", "mepc.378", "mepc.378(80)"],
  "marpol": ["marpol", "annex i", "annex ii", "annex iv", "annex v", "annex vi", "oil pollution", "sewage", "garbage", "air pollution"],
  "eu mrv": ["eu mrv", "mrv regulation", "monitoring reporting verification", "thetis-mrv"],
  "imo dcs": ["imo dcs", "data collection system", "fuel consumption data"],
  "paris mou": ["paris mou", "port state control", "psc", "port state inspection"],
  "helcom": ["helcom", "baltic sea", "baltic marine environment"],
  "united states coast guard": ["uscg", "united states coast guard"],
  "australian biofouling": ["australian biofouling", "biof125", "department of agriculture"],
  "new zealand biofouling": ["new zealand biofouling", "cawthron", "biosecurity"],
  "hong kong convention": ["hong kong convention", "ship recycling", "ihm"],
  "eu ship recycling regulation": ["eu ship recycling regulation", "european list of ship recycling facilities"],
  "solas": ["solas", "safety of life at sea", "fire control plan", "emergency equipment"],
  "load line": ["load line", "freeboard", "stability", "international load line convention"],
  "colreg": ["colreg", "collision regulations", "navigation lights", "right of way"],
  "ballast water management": ["ballast water", "bwmc", "ballast water management convention", "bwmp", "ballast water treatment system", "bwts"],
  "sox emission control": ["sec a", "sec b", "sec c", "emission control area", "eca", "low sulphur fuel", "scrubber"],
  "nox emission": ["nox", "tier ii", "tier iii", "nox emission control"],
  "co2 emission": ["co2", "carbon dioxide", "carbon intensity", "greenhouse gas", "ghg"],
  "cii": ["cii", "carbon intensity indicator", "cii rating", "operational carbon intensity"],
  "seemp": ["seemp", "ship energy efficiency management plan"],
  "ieec": ["ieec", "international energy efficiency certificate"],
  "eexi": ["eexi", "existing ship energy efficiency index", "energy efficiency existing ship index"],
  "polar code": ["polar code", "polar water operational manual", "pwom", "polar ship certificate", "arctic", "antarctic"],

  // === BIOFOULING ===
  "biofouling": ["biofouling", "biofouling management", "biofouling management plan", "bfmp", "biofouling record book", "bfrb", "niche area", "sea chest", "thruster tunnel", "stabilizer pocket", "propeller shaft", "rudder pintle"],
  "in-water cleaning": ["in-water cleaning", "underwater cleaning", "diver cleaning", "rov cleaning", "debris capture", "vacuum assisted cleaning", "non-abrasive cleaning"],
  "anti-fouling coating": ["anti-fouling coating", "afs", "foul release", "silicone coating", "copper-free", "eco-friendly coating", "coating advisory"],

  // === STRUCTURAL ===
  "structural integrity": ["structural integrity", "hull condition", "fatigue life", "life extension", "structural audit", "thickness measurement", "ultrasonic testing", "corrosion assessment", "wastage plan", "stress concentration", "finite element analysis", "fea"],
  "structural modification": ["structural modification", "hull modification", "deck reinforcement", "superstructure extension", "bulkhead relocation", "cutout reinforcement"],
  "vibration noise": ["vibration", "noise", "vibration diagnostic", "noise diagnostic", "acoustic measurement", "accelerometer", "resonance", "propeller imbalance", "machinery misalignment"],

  // === ENGINEERING PLANS & DOCUMENTATION ===
  "engineering plans": ["engineering plans", "structural drawings", "as-built drawings", "arrangement plan", "general arrangement", "ga", "machinery arrangement", "piping isometric", "fire plan", "safety plan"],
  "p&id": ["p&id", "piping and instrumentation diagram", "system manual", "pneumatic diagram", "hydraulic diagram"],
  "electrical load analysis": ["electrical load analysis", "eab", "power balance", "generator sizing", "load study", "short circuit analysis", "selective coordination"],
  "fuel management": ["fuel management booklet", "fuel quality", "bunkering procedure", "fuel sampling", "fuel oil changeover", "sulphur content recording", "mdo", "mgo", "hfo"],
  "ihm": ["inventory of hazardous materials", "ihm", "asbestos", "pcb", "ozone depleting substance", "hazardous material list"],

  // === PROJECT MANAGEMENT ===
  "project management": ["project management", "owner's representative", "refit supervision", "dry-docking management", "yard supervision", "technical troubleshooting", "cost control", "schedule control", "change order management", "quality control", "qc"],
  "refit": ["refit", "refit supervision", "retrofit", "conversion", "modernization", "upgrade"],
  "dry-docking": ["dry-docking", "dry dock", "floating dock", "block arrangement", "underwater ship repair", "docking survey"],

  // === SURVEY & INSPECTION ===
  "pre-purchase survey": ["pre-purchase survey", "buyer's survey", "condition survey", "second hand yacht survey"],
  "damage survey": ["damage survey", "hull damage", "collision damage", "grounding damage", "fire damage", "machinery damage", "repair cost estimation"],
  "insurance survey": ["insurance valuation", "insurance survey", "market value assessment", "replacement value", "hull insurance"],
  "charter survey": ["on-hire survey", "off-hire survey", "charter inspection", "charter condition survey"],
  "technical condition report": ["technical condition report", "general health check", "vessel inspection", "safety inspection"],

  // === SUSTAINABLE TECHNOLOGIES ===
  "energy audit": ["energy audit", "efficiency survey", "fuel saving", "energy saving measure", "led lighting", "variable frequency drive", "waste heat recovery", "trim optimization"],
  "alternative fuel": ["lng", "lpg", "methanol", "hydrogen", "ammonia", "battery", "hybrid propulsion", "electric propulsion", "shore power", "cold ironing"],
  "zero emission zone": ["zero emission zone", "zez", "green bay", "emission free area", "zero emission fjord", "geirangerfjord", "boka kotorska"],

  // === VESSEL TYPES ===
  "superyacht": ["superyacht", "megayacht", "motor yacht", "sailing yacht", "luxury yacht", "expedition yacht", "sport fisher", "gulet", "ketch"],
  "commercial vessel": ["commercial vessel", "cargo ship", "bulk carrier", "tanker", "container ship", "roro", "passenger ship", "ferry", "cruise ship", "offshore vessel", "psv", "ahst", "osv"],
  "fishing vessel": ["fishing boat", "fishing vessel", "trawler", "longliner", "purse seiner", "gillnetter", "fish carrier"],

  // === OPERATIONS & PORTS ===
  "adriatic sea": ["adriatic", "adriatic sea", "croatia", "montenegro", "albania", "slovenia", "italy adriatic", "bari", "ancona", "venice", "trieste", "dubrovnik", "split", "tivat", "kotor", "bar", "budva"],
  "mediterranean": ["mediterranean", "med", "west med", "east med", "cote d'azur", "monaco", "french riviera", "sardinia", "corsica", "sicily", "malta", "greece", "turkey", "cyprus", "israel", "lebanon", "egypt", "libya", "tunisia", "algeria", "morocco", "spain", "balearic", "barcelona", "palma", "ibiza", "valencia", "alicante", "cartagena", "malaga", "gibraltar"],
  "black sea": ["black sea", "ukraine", "russia black sea", "georgia", "bulgaria", "romania", "odessa", "constanta", "varna", "burgas", "batumi", "poti", "novorossiysk", "sochi"],
  "north sea": ["north sea", "netherlands", "belgium", "germany north sea", "denmark north sea", "norway south", "aberdeen", "rotterdam", "antwerp", "hamburg", "bremerhaven", "wilhelmshaven", "esbjerg"],
  "baltic sea": ["baltic sea", "poland", "sweden", "finland", "estonia", "latvia", "lithuania", "russia baltic", "gdansk", "gdynia", "szczecin", "stockholm", "helsinki", "tallinn", "riga", "klaipeda", "kaliningrad", "st petersburg", "helsingborg", "malmo", "copenhagen", "kiel", "lubeck", "rostock", "stralsund"],
  "atlantic": ["atlantic", "north atlantic", "south atlantic", "canary islands", "madeira", "azores", "iceland", "greenland", "faroe islands", "biscay", "english channel", "irish sea", "celtic sea"],
  "red sea": ["red sea", "suez canal", "gulf of aqaba", "jeddah", "port sudan", "massawa", "dubai", "abu dhabi", "sharjah", "fujairah", "ras al khaimah", "ajman", "umm al quwain", "qatar", "bahrain", "kuwait", "oman", "muscat", "salalah", "sohar"],
  "indian ocean": ["indian ocean", "maldives", "seychelles", "mauritius", "reunion", "sri lanka", "mumbai", "goa", "chennai", "kolkata", "chittagong", "yangon", "phuket", "langkawi", "port klang", "singapore", "jakarta", "surabaya", "bali", "darwin", "fremantle"],

  // === SHIPYARDS & HUBS ===
  "montenegro shipyard": ["bijela", "adriatic 42", "tivat", "navar", "bar shipyard", "kotor shipyard", "montenegro shipyard"],
  "croatian shipyard": ["brodosplit", "viktor lenac", "adriatic shipyard pula", "tehnomont", "greben", "lošinj shipyard", "kraljevica shipyard"],
  "italian shipyard": ["baglietto", "benetti", "azimut", "sanlorenzo", "ferretti", "cantiere navale", "viareggio", "carrara", "la spezia", "genova", "livorno", "naples", "palermo", "marina di carrara"],
  "turkish shipyard": ["istanbul shipyard", "pendik", "tuzla", "yalova", "antalya free zone", "bodrum shipyard", "marmaris shipyard", "cesme", "izmir alsancak", "samsun"],

  // === CLASSIFICATION SOCIETIES ===
  "dnv": ["dnv", "det norske veritas", "dnv gl"],
  "rina": ["rina", "registro italiano navale"],
  "bv": ["bureau veritas", "bv"],
  "lr": ["lloyd's register", "lr"],
  "abs": ["american bureau of shipping", "abs"],
  "nk": ["classnk", "nippon kaiji kyokai", "nk"],
  "kr": ["korean register", "kr"],
  "irs": ["indian register", "irs"],
  "crs": ["croatian register", "crs"],
  "prs": ["polski rejestr statkow", "prs"],

  // === GENERAL TECHNICAL ===
  "machinery": ["engine", "main engine", "auxiliary engine", "generator", "shaft", "propeller", "bow thruster", "stern thruster", "stabilizer", "hydraulic system", "pneumatic system", "cooling system", "lubrication system", "fuel system", "exhaust system"],
  "electrical": ["switchboard", "distribution panel", "transformer", "rectifier", "inverter", "battery", "charger", "alternator", "motor", "cable", "circuit breaker", "relay", "contactor", "plc", "scada", "monitoring system", "alarm system"],
  "safety equipment": ["life raft", "lifebuoy", "life jacket", "immersion suit", "epirb", "sart", "radar transponder", "fire extinguisher", "fire hose", "fire nozzle", "fire blanket", "fire detector", "smoke detector", "heat detector", "gas detector", "emergency lighting", "emergency generator", "emergency fire pump"]
};