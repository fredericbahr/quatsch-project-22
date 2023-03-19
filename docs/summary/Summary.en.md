---
title:      'Executive Summary'
subtitle:   'Projektgruppe 6: Umweltinformationen'
subject:    'Fortgeschrittene Themen der Informatik (C204): Question Answering & Chatbots'
---

The Landesanstalt für Umwelt Baden-Württemberg collects environmental data in a network of measuring stations. From this data
observations can be derived to make statements about the state of the ecosystems. The public
access allows researchers as well as private persons to explore the observed biotopes. The amount
of data collected requires facilitated access for user groups and the information to be
become comprehensible.

The goal of this project was to make the environmental data accessible via a question-and-answering system and to ensure correct
input with the help of chatbot functions. An essential part of this was the creation of a context in which a question could be
asked, so that it meets the requirements of the data sources. Furthermore, a specification of the question, the processing of
the data sets and its presentation was relevant to ensure accessibility for the respective
user group.

In order to fulfill the project goals, a web-based application was developed, which can serve the respective requirements.
Thus, to handle the chatbot functionality, the Rasa technology stack [^rasa] was used, which can
get the input from a web-based interface, create the assignment of natural language requests to
computer commands as well as executing the commands. The question-answering system was developed using the
Qanary technology stack[^qanary]. This technology makes it possible to extract individual fragments of knowledge from the question posed to the
system and to establish the context of the question so that the data sources can be queried.
The specification of the question, the processing and presentation of the data sets could also be integrated via this
mechanism.

Further reading on this project can be found at https://gitlab.imn.htwk-leipzig.de/fbahr/quatsch-project-22.

[^rasa]: The Rasa technology stack, consisting of Rasa Chat, Rasa Open Source, and Rasa Action Server: https://rasa.com/  
[^qanary]: A reference implementation for building question answering systems using the
Qanary methodology: https://github.com/WDAqua/Qanary
