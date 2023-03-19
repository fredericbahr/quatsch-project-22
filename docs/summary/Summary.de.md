---
title:      'Kurzbeschreibung'
subtitle:   'Projektgruppe 6: Umweltinformationen'
subject:    'Fortgeschrittene Themen der Informatik (C204): Question Answering & Chatbots'
---

Die Landesanstalt für Umwelt Baden-Württemberg erfasst in einem Netz aus Messstationen Umweltdaten. Aus diesen Daten
können Beobachtungen abgeleitet werden, um Aussagen über den Zustand der Ökosysteme zu treffen. Der öffentliche
Zugang ermöglicht sowohl Forscher:innen als auch Privatpersonen eine Exploration der beobachteten Biotope. Die Menge und Komplexität
der erfassten Daten erfordert neben einem vereinfachten Zugang für die diversen Benutzergruppen auch eine nachvollziehbare Aufbereitung der Informationen.

Das Ziel dieses Projekts war es, die Umweltdaten über ein Frage-Antwort-System zugänglich zu machen und die korrekte
Eingabe mithilfe von Chatbot-Funktionen zu stützen. Wesentlich hierbei war die Erzeugung eines Kontexts, in welchem eine
Frage gestellt werden kann, sodass sie den Anforderungen der Datenquellen entspricht. Des Weiteren war eine Präzisierung
der Frage, die Verarbeitung der Datensätze und dessen Darstellung relevant, um die Zugänglichkeit für den jeweiligen
Benutzer zu gewährleisten.

Um die Projektziele zu erfüllen, wurde eine webbasierte Anwendung entwickelt, welche die jeweiligen Anforderungen
bedienen kann. Zur Bearbeitung der Chatbot-Funktionalität wurde der Rasa-Technologie-Stack[^rasa] benutzt, welcher
sowohl die Eingabe in einer webbasierten Oberflächen, die Zuweisung von natürlichsprachigen Anfragen zu
Computer-Befehlen als auch die Ausführung der Befehle möglich macht. Das Frage-Antwort-System wurde mithilfe des
Qanary-Technologie-Stack[^qanary] umgesetzt. Diese Technologie ermöglicht es, einzelne Wissensfragmente aus der an das
System gestellten Frage zu extrahieren und den Kontext der Frage herzustellen, sodass die Datenquellen abgefragt werden
können. Die Präzisierung der Frage, die Verarbeitung und Darstellung der Datensätze konnte ebenfalls über diesen
Mechanismus integriert werden.

Weiterführende Ausfühurungen zu diesem Projekt können unter https://gitlab.imn.htwk-leipzig.de/fbahr/quatsch-project-22 gefunden werden.

[^rasa]: Der Rasa-Technologiestapel, bestehend aus Rasa-Chat, Rasa Open Source und Rasa Action Server: https://rasa.com/
[^qanary]: Eine Referenzimplementierung zur Erstellung von Fragebeantwortungssystemen nach der
Qanary-Methodik: https://github.com/WDAqua/Qanary