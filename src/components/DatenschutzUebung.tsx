import { useState } from 'react';
import { AlertTriangle, X, Check, Eye } from 'lucide-react';

export default function DatenschutzUebung() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const fallDaten = [
    {
      id: 1,
      text: "Dr. Klaus Schneider",
      kategorie: "sehr_kritisch",
      begruendung: "Vollständiger Klarname - direkter Personenbezug, Verletzung der Verschwiegenheitspflicht gem. § 203 StGB"
    },
    {
      id: 2,
      text: "geb. 15.03.1978",
      kategorie: "sehr_kritisch", 
      begruendung: "Geburtsdatum - personenbezogenes Datum nach DSGVO Art. 4, ermöglicht Identifikation"
    },
    {
      id: 3,
      text: "Starnberg",
      kategorie: "grenzwertig",
      begruendung: "Wohnort - kann bei seltenen Namen zur Identifikation führen, besser: 'Bayern' oder 'Süddeutschland'"
    },
    {
      id: 4,
      text: "Zahnarztpraxis",
      kategorie: "unbedenklich",
      begruendung: "Berufsbezeichnung ohne Personenbezug - für steuerliche Beratung relevant und notwendig"
    },
    {
      id: 5,
      text: "Hauptstraße 42",
      kategorie: "sehr_kritisch",
      begruendung: "Vollständige Praxisadresse - ermöglicht eindeutige Identifikation, Geschäftsgeheimnis"
    },
    {
      id: 6,
      text: "95.000 € Behandlungsstuhl",
      kategorie: "grenzwertig",
      begruendung: "Exakte Investitionssumme kann in Kombination mit anderen Daten zur Identifikation führen, obwohl für steuerliche Beratung relevant - besser: 'hoher 5-stelliger Betrag für Behandlungsstuhl'"
    },
    {
      id: 7,
      text: "180.000 € Baukosten",
      kategorie: "grenzwertig",
      begruendung: "Exakte Baukosten in Kombination mit Ort und anderen Details ermöglichen Identifikation, obwohl für steuerliche Bewertung wichtig - besser: 'mittlerer 6-stelliger Betrag für Praxiserweiterung'"
    },
    {
      id: 8,
      text: "Maria Schneider",
      kategorie: "sehr_kritisch",
      begruendung: "Vollständiger Name der Ehefrau - Personenbezug, Verschwiegenheitspflicht"
    },
    {
      id: 9,
      text: "Praxismanagerin",
      kategorie: "unbedenklich",
      begruendung: "Berufsbezeichnung ohne Personenbezug, für steuerliche Einordnung relevant"
    },
    {
      id: 10,
      text: "4.200 € brutto",
      kategorie: "grenzwertig",
      begruendung: "Lohnhöhe - in Kombination mit anderen Daten identifizierbar, besser: 'Geschäftsführergehalt ca. 4.000€'"
    },
    {
      id: 11,
      text: "2 Kinder (8 und 12 Jahre)",
      kategorie: "grenzwertig",
      begruendung: "Familiendetails - nicht steuerlich relevant für die Fragestellung, besser weglassen"
    },
    {
      id: 12,
      text: "Tim",
      kategorie: "sehr_kritisch",
      begruendung: "Name des Kindes - besonders schützenswerte Daten Minderjähriger"
    },
    {
      id: 13,
      text: "Zahnmedizin München 6. Semester",
      kategorie: "grenzwertig",
      begruendung: "Spezifische Studiendetails können zur Identifikation führen, besser: 'Zahnmedizinstudent'"
    },
    {
      id: 14,
      text: "weitere Praxis in Tutzing",
      kategorie: "grenzwertig",
      begruendung: "Konkreter Ort für Expansion - besser: 'weitere Praxis in der Region'"
    },
    {
      id: 15,
      text: "50.000 € Bitcoin",
      kategorie: "grenzwertig",
      begruendung: "Exakte Kryptowährungs-Investition kann bei Kombination mit anderen Daten identifizierend wirken, obwohl für steuerliche Einordnung relevant - besser: 'mittlerer 5-stelliger Betrag in Kryptowährungen'"
    },
    {
      id: 16,
      text: "850.000 € Umsatz",
      kategorie: "grenzwertig",
      begruendung: "Exakte Umsatzzahl kann in Kombination mit Ort und Branche zur Identifikation führen, obwohl für steuerliche Beratung wichtig - besser: 'hoher 6-stelliger Jahresumsatz'"
    },
    {
      id: 17,
      text: "280.000 € Gewinn",
      kategorie: "grenzwertig",
      begruendung: "Exakte Gewinnzahl ist Geschäftsgeheimnis und kann identifizierend wirken, obwohl für steuerliche Analyse notwendig - besser: 'mittlerer 6-stelliger Jahresgewinn'"
    }
  ];

  const kategorien = {
    sehr_kritisch: {
      farbe: "bg-red-100 border-red-300 text-red-800",
      icon: <X className="text-red-600" size={20} />,
      titel: "Sehr kritisch - Niemals in KI eingeben!"
    },
    grenzwertig: {
      farbe: "bg-yellow-100 border-yellow-300 text-yellow-800", 
      icon: <AlertTriangle className="text-yellow-600" size={20} />,
      titel: "Grenzwertig - Besser anonymisieren"
    },
    unbedenklich: {
      farbe: "bg-green-100 border-green-300 text-green-800",
      icon: <Check className="text-green-600" size={20} />,
      titel: "Unbedenklich - Für KI geeignet"
    }
  };

  const handleItemClick = (itemId: number) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const analyzeResults = () => {
    setShowResults(true);
    setFeedbackGiven(true);
  };

  const resetExercise = () => {
    setSelectedItems([]);
    setShowResults(false);
    setFeedbackGiven(false);
  };

  const getSelectedScore = () => {
    const kritischSelected = fallDaten.filter(item => 
      selectedItems.includes(item.id) && item.kategorie === 'sehr_kritisch'
    ).length;
    
    const grenzwertigSelected = fallDaten.filter(item => 
      selectedItems.includes(item.id) && item.kategorie === 'grenzwertig'  
    ).length;

    const kritischTotal = fallDaten.filter(item => item.kategorie === 'sehr_kritisch').length;
    const grenzwertigTotal = fallDaten.filter(item => item.kategorie === 'grenzwertig').length;

    const score = (kritischSelected / kritischTotal) * 60 + (grenzwertigSelected / grenzwertigTotal) * 40;
    return Math.round(score);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 rounded-lg shadow-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">🔒 Datenschutz-Challenge: Was gehört nicht in die KI?</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Klicken Sie auf alle Datenelemente, die problematisch für KI-Systeme sind
      </p>
      
      {!showResults && (
        <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
          <h2 className="font-bold text-xl mb-4">📋 Mandantenfall:</h2>
          <div className="text-gray-800 leading-relaxed space-y-3 text-lg">
            <p>
              Unser Mandant{" "}
              <span 
                onClick={() => handleItemClick(1)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(1) ? 'bg-red-200 border border-red-300' : 'hover:bg-gray-200'
                }`}
              >
                Dr. Klaus Schneider
              </span>{" "}
              (
              <span 
                onClick={() => handleItemClick(2)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(2) ? 'bg-red-200 border border-red-300' : 'hover:bg-gray-200'
                }`}
              >
                geb. 15.03.1978
              </span>
              ) aus{" "}
              <span 
                onClick={() => handleItemClick(3)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(3) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                Starnberg
              </span>{" "}
              betreibt eine{" "}
              <span 
                onClick={() => handleItemClick(4)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(4) ? 'bg-green-200 border border-green-300' : 'hover:bg-gray-200'
                }`}
              >
                Zahnarztpraxis
              </span>{" "}
              in der{" "}
              <span 
                onClick={() => handleItemClick(5)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(5) ? 'bg-red-200 border border-red-300' : 'hover:bg-gray-200'
                }`}
              >
                Hauptstraße 42
              </span>
              .
            </p>
            
            <p>
              Er hat 2023 für{" "}
              <span 
                onClick={() => handleItemClick(6)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(6) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                95.000 € einen neuen Behandlungsstuhl
              </span>{" "}
              gekauft und gleichzeitig seine Praxis um 45 qm erweitert (
              <span 
                onClick={() => handleItemClick(7)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(7) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                Baukosten: 180.000 €
              </span>
              ).
            </p>

            <p>
              Seine Ehefrau{" "}
              <span 
                onClick={() => handleItemClick(8)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(8) ? 'bg-red-200 border border-red-300' : 'hover:bg-gray-200'
                }`}
              >
                Maria Schneider
              </span>{" "}
              ist seit April 2024 als{" "}
              <span 
                onClick={() => handleItemClick(9)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(9) ? 'bg-green-200 border border-green-300' : 'hover:bg-gray-200'
                }`}
              >
                Praxismanagerin
              </span>{" "}
              angestellt (Gehalt:{" "}
              <span 
                onClick={() => handleItemClick(10)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(10) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                4.200 € brutto
              </span>
              ). Die beiden haben{" "}
              <span 
                onClick={() => handleItemClick(11)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(11) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                2 Kinder (8 und 12 Jahre alt)
              </span>
              .
            </p>

            <p>
              Dr. Schneider überlegt eine Praxisübergabe an seinen Sohn{" "}
              <span 
                onClick={() => handleItemClick(12)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(12) ? 'bg-red-200 border border-red-300' : 'hover:bg-gray-200'
                }`}
              >
                Tim
              </span>{" "}
              (Tim studiert gerade{" "}
              <span 
                onClick={() => handleItemClick(13)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(13) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                Zahnmedizin in München, 6. Semester
              </span>
              ). Er plant 2026 eine{" "}
              <span 
                onClick={() => handleItemClick(14)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(14) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                weitere Praxis in Tutzing
              </span>{" "}
              zu eröffnen.
            </p>

            <p>
              Dr. Schneider hat 2024{" "}
              <span 
                onClick={() => handleItemClick(15)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(15) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                Bitcoin im Wert von 50.000 €
              </span>{" "}
              gekauft. Die Praxis macht ca.{" "}
              <span 
                onClick={() => handleItemClick(16)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(16) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                850.000 € Umsatz
              </span>{" "}
              pro Jahr, Gewinn liegt bei etwa{" "}
              <span 
                onClick={() => handleItemClick(17)}
                className={`cursor-pointer px-2 py-1 rounded transition-all ${
                  selectedItems.includes(17) ? 'bg-yellow-200 border border-yellow-300' : 'hover:bg-gray-200'
                }`}
              >
                280.000 €
              </span>
              .
            </p>
          </div>
        </div>
      )}

      {feedbackGiven && (
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            Ihr Datenschutz-Score: {getSelectedScore()}%
          </div>
          <div className="text-gray-600">
            {getSelectedScore() >= 80 ? "Ausgezeichnet! Sie haben ein sehr gutes Gespür für Datenschutz." :
             getSelectedScore() >= 60 ? "Gut! Mit etwas mehr Übung werden Sie zum Datenschutz-Profi." :
             "Hier gibt es noch Verbesserungspotential. Schauen Sie sich die Begründungen genau an."}
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center mb-8">
        {!showResults && (
          <button 
            onClick={analyzeResults}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🔍 Auswertung anzeigen
          </button>
        )}
        
        {showResults && (
          <button 
            onClick={resetExercise}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            🔄 Übung wiederholen
          </button>
        )}
      </div>

      {showResults && (
        <div className="space-y-6">
          {Object.entries(kategorien).map(([kat, config]) => {
            const items = fallDaten.filter(item => item.kategorie === kat);
            
            return (
              <div key={kat} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${config.farbe} p-4 flex items-center gap-3`}>
                  {config.icon}
                  <h3 className="text-xl font-bold">{config.titel}</h3>
                </div>
                
                <div className="p-4 space-y-3">
                  {items.map(item => {
                    const wasSelected = selectedItems.includes(item.id);
                    const shouldBeSelected = item.kategorie !== 'unbedenklich';
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`p-3 rounded border-2 flex items-start gap-3 ${
                          wasSelected && shouldBeSelected ? 'bg-green-50 border-green-300' :
                          !wasSelected && shouldBeSelected ? 'bg-red-50 border-red-300' :
                          wasSelected && !shouldBeSelected ? 'bg-yellow-50 border-yellow-300' :
                          'bg-gray-50 border-gray-300'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {wasSelected && shouldBeSelected ? <Check className="text-green-600" size={20} /> :
                           !wasSelected && shouldBeSelected ? <X className="text-red-600" size={20} /> :
                           wasSelected && !shouldBeSelected ? <AlertTriangle className="text-yellow-600" size={20} /> :
                           <Eye className="text-gray-400" size={20} />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 mb-1">
                            "{item.text}"
                            {wasSelected && shouldBeSelected && <span className="ml-2 text-green-600 font-bold">✓ Richtig erkannt!</span>}
                            {!wasSelected && shouldBeSelected && <span className="ml-2 text-red-600 font-bold">✗ Übersehen!</span>}
                            {wasSelected && !shouldBeSelected && <span className="ml-2 text-yellow-600 font-bold">⚠ Unnötig markiert</span>}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Begründung:</strong> {item.begruendung}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">💡 Korrekt anonymisierter Prompt für KI-Nutzung:</h3>
            <div className="bg-white p-4 rounded border text-sm font-mono leading-relaxed">
              Als Steuerberater für Heilberufe analysiere folgenden Fall: Ein Zahnarzt in Süddeutschland (Einzelpraxis, hoher 6-stelliger Jahresumsatz, mittlerer 6-stelliger Jahresgewinn) hat 2023 Investitionen getätigt (hoher 5-stelliger Betrag für Behandlungsstuhl, mittlerer 6-stelliger Betrag für Praxiserweiterung). Seine Ehefrau ist als Praxismanagerin angestellt. Fragestellungen: 1) GmbH-Umwandlung bei dieser Gewinnlage sinnvoll? 2) Praxisübergabe an Sohn (Zahnmedizinstudent) - steueroptimale Gestaltung? 3) Zweigpraxis geplant - Rechtsformvergleich? 4) Mittlerer 5-stelliger Betrag in Kryptowährungen im Praxisvermögen - steuerliche Behandlung?
            </div>
            <p className="text-sm text-blue-700 mt-3 italic font-semibold">
              <strong>Wichtig:</strong> Die KI erhält alle steuerlich relevanten Informationen, aber ohne Identifikationsrisiko!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
