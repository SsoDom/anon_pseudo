import { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function KIPromptUebung() {
  const [selectedCase, setSelectedCase] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [feedback, setFeedback] = useState<{
    text: string;
    level: string;
    erfuellteKriterien: number[];
  } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
  const steuerFaelle = [
    {
      id: 1,
      titel: "Betriebsausgabenabzug für Homeoffice",
      beschreibung: "Ein Mandant arbeitet seit 2023 zu 60% im Homeoffice. Er hat einen separaten Raum ausschließlich für berufliche Zwecke eingerichtet und möchte wissen, welche Kosten er steuerlich geltend machen kann.",
      musterPrompt: "Als Steuerexperte mit Spezialisierung auf Einkommensteuerrecht erstelle bitte eine präzise und aktuelle steuerrechtliche Übersicht zu den Möglichkeiten des Betriebsausgabenabzugs für ein Homeoffice in Deutschland für das Jahr 2023. Gehe dabei auf folgende Aspekte ein: 1) Voraussetzungen für die Anerkennung eines häuslichen Arbeitszimmers, 2) die Höhe der möglichen Absetzbarkeit der Kosten bei ausschließlicher beruflicher Nutzung, 3) die Homeoffice-Pauschale als Alternative, 4) absetzbare Kosten für Arbeitsmittel wie Büromöbel und Computer, 5) Unterschiede zwischen Arbeitnehmern und Selbstständigen. Basiere deine Antwort auf aktueller Gesetzgebung und Rechtsprechung, und strukturiere die Informationen klar nach den verschiedenen Abzugsmöglichkeiten."
    },
    {
      id: 2,
      titel: "Umsatzsteuer bei gemischter Nutzung eines Fahrzeugs",
      beschreibung: "Ein Unternehmer hat im Januar 2024 einen Neuwagen für 59.500 € (inkl. MwSt.) angeschafft. Er nutzt das Fahrzeug zu 70% betrieblich und zu 30% privat. Welche umsatzsteuerlichen Konsequenzen ergeben sich?",
      musterPrompt: "Als Steuerberater mit Expertise im Umsatzsteuerrecht erläutere bitte detailliert die umsatzsteuerliche Behandlung eines im Januar 2024 angeschafften Neuwagens im Unternehmen bei gemischter betrieblicher (70%) und privater (30%) Nutzung. Der Kaufpreis beträgt 59.500 € inklusive Mehrwertsteuer. Gehe dabei auf folgende Aspekte ein: 1) Voraussetzungen für den Vorsteuerabzug, 2) Höhe des möglichen Vorsteuerabzugs bei Anschaffung, 3) notwendige umsatzsteuerliche Behandlung der Privatnutzung, 4) erforderliche Nachweise und Dokumentation, 5) Auswirkungen auf die Umsatzsteuervoranmeldung. Berücksichtige die aktuelle Rechtslage gemäß UStG und entsprechender BMF-Schreiben und stelle die Berechnung mit konkreten Zahlen für diesen Fall dar."
    },
    {
      id: 3,
      titel: "Steuerliche Behandlung von Kryptowährungen",
      beschreibung: "Ein Mandant hat 2021 Bitcoin im Wert von 10.000 € gekauft und diese 2024 für 30.000 € verkauft. Wie sind die Gewinne zu versteuern?",
      musterPrompt: "Als Steuerexperte mit Schwerpunkt Kapitalerträge erläutere bitte die steuerliche Behandlung von Gewinnen aus dem Handel mit Kryptowährungen in Deutschland für einen Privatanleger, der 2021 Bitcoin im Wert von 10.000 € erworben und diese 2024 für 30.000 € verkauft hat. Berücksichtige dabei: 1) Einordnung als Wirtschaftsgut und steuerliche Qualifikation des Gewinns, 2) Anwendung der Haltefrist und deren Auswirkungen, 3) korrekte Berechnung der Steuerbelastung mit konkreten Zahlen, 4) Dokumentationspflichten für den Steuerpflichtigen, 5) Unterschiede zu anderen Kapitalanlagen. Gehe auf die aktuellen rechtlichen Grundlagen und relevante BFH-Urteile ein und strukturiere deine Antwort nach den steuerlichen Aspekten."
    }
  ];

  const bewertungskriterien = [
    { 
      id: 1, 
      kriterium: "Gibt die Rolle des KI-Assistenten an (z.B. als Steuerexperte)",
      erklaerung: "Eine klare Rollenangabe hilft der KI, den richtigen Kontext zu verstehen und verbessert die Qualität der Antworten."
    },
    { 
      id: 2, 
      kriterium: "Enthält eine präzise Aufgabenstellung",
      erklaerung: "Die Aufgabe sollte konkret und eindeutig formuliert sein, damit die KI genau versteht, welche Information gewünscht ist."
    },
    { 
      id: 3, 
      kriterium: "Beinhaltet relevante Zahlen und Fakten",
      erklaerung: "Konkrete Zahlenwerte und Fakten sind wichtig für eine präzise Antwort, besonders bei steuerlichen Berechnungen."
    },
    { 
      id: 4, 
      kriterium: "Fordert eine strukturierte Antwort",
      erklaerung: "Die Anweisung zur Strukturierung führt zu übersichtlicheren und leichter verständlichen Antworten."
    },
    { 
      id: 5, 
      kriterium: "Fragt nach aktueller Rechtslage/Rechtsprechung",
      erklaerung: "Im Steuerrecht ist die Aktualität entscheidend, daher sollte die KI explizit auf aktuelle Gesetze und Urteile hingewiesen werden."
    }
  ];

  const bewertungstext = {
    schlecht: "Dein Prompt könnte verbessert werden. Prüfe die Kriterien und versuche es erneut.",
    mittel: "Guter Ansatz! Dein Prompt erfüllt einige wichtige Kriterien, könnte aber noch optimiert werden.",
    gut: "Sehr gut! Dein Prompt erfüllt die meisten relevanten Kriterien für eine qualitativ hochwertige KI-Antwort."
  };

  const bewertePrompt = () => {
    if (!userPrompt.trim()) {
      setFeedback({
        text: "Bitte gib zuerst einen Prompt ein.",
        level: "schlecht",
        erfuellteKriterien: []
      });
      return;
    }

    const erfuellteKriterien = [];
    
    // Prüfung auf Rolle
    if (/steuerexperte|steuerberater|steuerfachmann|als\s(\w+\s)?experte/i.test(userPrompt)) {
      erfuellteKriterien.push(1);
    }
    
    // Prüfung auf präzise Aufgabenstellung
    if (/erstelle|berechne|erläutere|erkläre|analysiere|wie\s(wird|ist)|welche\s(steuer|regelung)/i.test(userPrompt)) {
      erfuellteKriterien.push(2);
    }
    
    // Prüfung auf Zahlen und Fakten
    if ((new RegExp(steuerFaelle[selectedCase].beschreibung.match(/\d[\d.,]*\s*€|\d+\s*%|\d{4}/g)?.join('|') || '', 'i')).test(userPrompt)) {
      erfuellteKriterien.push(3);
    }
    
    // Prüfung auf strukturierte Antwort
    if (/strukturiere|gliedere|liste auf|folgende punkte|teile auf/i.test(userPrompt)) {
      erfuellteKriterien.push(4);
    }
    
    // Prüfung auf aktuelle Rechtslage
    if (/aktuelle\s(rechtslage|gesetzgebung|gesetze)|gültige\svorschriften|bfh-urteil|bmf-schreiben|ustg|estg|ao/i.test(userPrompt)) {
      erfuellteKriterien.push(5);
    }
    
    let level;
    if (erfuellteKriterien.length <= 1) {
      level = "schlecht";
    } else if (erfuellteKriterien.length <= 3) {
      level = "mittel";
    } else {
      level = "gut";
    }
    
    setFeedback({
      text: bewertungstext[level as keyof typeof bewertungstext],
      level,
      erfuellteKriterien
    });
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">KI-Prompt-Übung für Steuerfachangestellte</h1>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Wähle einen Steuerfall:</label>
        <select 
          className="w-full p-3 border border-gray-300 rounded-md bg-white text-lg" 
          value={selectedCase} 
          onChange={(e) => {
            setSelectedCase(parseInt(e.target.value));
            setUserPrompt('');
            setFeedback(null);
            setShowSolution(false);
          }}
        >
          {steuerFaelle.map((fall, index) => (
            <option key={fall.id} value={index}>{fall.titel}</option>
          ))}
        </select>
      </div>
      
      <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
        <h2 className="font-bold text-xl mb-4">📋 Fallbeschreibung:</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{steuerFaelle[selectedCase].beschreibung}</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2 text-lg">
          Schreibe deinen KI-Prompt für diesen Fall:
        </label>
        <textarea 
          className="w-full p-4 border border-gray-300 rounded-md h-48 text-lg"
          placeholder="Formuliere hier deinen Prompt..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-4 mb-6">
        <button 
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
          onClick={bewertePrompt}
        >
          Prompt bewerten
        </button>
        
        <button 
          className="bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition text-lg"
          onClick={() => setShowSolution(!showSolution)}
        >
          {showSolution ? "Musterlösung ausblenden" : "Musterlösung anzeigen"}
        </button>
      </div>
      
      {feedback && (
        <div className={`p-6 rounded-md mb-6 border-2 ${
          feedback.level === "schlecht" ? "bg-red-50 border-red-200" :
          feedback.level === "mittel" ? "bg-yellow-50 border-yellow-200" :
          "bg-green-50 border-green-200"
        }`}>
          <h3 className="font-bold mb-3 text-xl">Feedback zu deinem Prompt:</h3>
          <p className="mb-4 text-lg">{feedback.text}</p>
          
          <h4 className="font-medium mb-3 text-lg">Bewertungskriterien:</h4>
          <ul className="space-y-3">
            {bewertungskriterien.map(k => (
              <li key={k.id} className="flex items-start gap-3">
                {feedback.erfuellteKriterien.includes(k.id) ? 
                  <Check className="text-green-600 mt-1 flex-shrink-0" size={20} /> : 
                  <X className="text-red-600 mt-1 flex-shrink-0" size={20} />
                }
                <div>
                  <span className="font-medium text-lg">{k.kriterium}</span>
                  <p className="text-sm text-gray-600 mt-1">{k.erklaerung}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {showSolution && (
        <div className="bg-green-50 p-6 border-2 border-green-200 rounded-md">
          <h3 className="font-bold mb-4 text-xl text-green-800">💡 Musterlösung:</h3>
          <div className="bg-white p-4 rounded border font-mono text-sm leading-relaxed">
            {steuerFaelle[selectedCase].musterPrompt}
          </div>
        </div>
      )}
    </div>
  );
}
