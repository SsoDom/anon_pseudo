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
    mittel: "Guter Ansatz! Dein Prompt erfüllt einige wichtige Kriterien, könnte aber noch optim
