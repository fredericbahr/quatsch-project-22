<details>
<summary>Two Stage Fallback - Two denies</summary>

```plantuml
@startuml
skinparam Style strictuml
autonumber
skinparam BoxPadding 15

title Architecture Two Stage Fallback

actor "user"

"user" -> rasa: Hi
"user" <-- rasa: Hi

|||

group "First Fallback"
"user" -> rasa: !#@?!
rasa -> rasa: intent classification (confidence < threshold)
rasa -> rasa: two_stage_fallback_action

|||

rasa -> webhook: action_default_ask_affirmation
rasa <-- webhook: text + button(affirm/deny)
"user" <-- rasa: text + button(affirm/deny)

|||

"user" -> rasa: deny
rasa -> rasa: utter_ask_rephrase
"user" <-- rasa: Rephrase please
end

|||
|||

group "Second Fallback"
"user" -> rasa: !#@?!
rasa -> rasa: intent classification (confidence < threshold)
rasa -> rasa: two_stage_fallback_action


|||

rasa -> webhook: action_default_ask_affirmation
rasa <-- webhook: text + button(affirm/deny)
"user" <-- rasa: text + button(affirm/deny)

|||

"user" -> rasa: deny
rasa -> rasa: default_fallback
"user" <-- rasa: Could not understand you (restart)
end

@enduml
```

</details>

<details>
<summary>Two Stage Fallback - Affirm</summary>

```plantuml
@startuml
skinparam Style strictuml
autonumber
skinparam BoxPadding 15

title Architecture Two Stage Fallback

actor "user"

"user" -> rasa: Hi
"user" <-- rasa: Hi

|||

group "First Fallback"
"user" -> rasa: !#@?!
rasa -> rasa: intent classification (confidence < threshold)
rasa -> rasa: two_stage_fallback_action

|||

rasa -> webhook: action_default_ask_affirmation
rasa <-- webhook: text + button(affirm/deny)
"user" <-- rasa: text + button(affirm/deny)

|||

"user" -> rasa: deny
rasa -> rasa: utter_ask_rephrase
"user" <-- rasa: Rephrase please
end

|||
|||

group "Second Fallback"
"user" -> rasa: Wie schwer ist eine Schildkröte
rasa -> rasa: intent classification (confidence < threshold)
rasa -> rasa: two_stage_fallback_action


|||

rasa -> webhook: action_default_ask_affirmation
rasa <-- webhook: text + button(affirm/deny)
"user" <-- rasa: text + button(affirm/deny)

|||

"user" -> rasa: affirm
rasa -> webhook: action_default_qanary
database "database"
webhook -> "database": read
webhook <-- "database": data

rasa <-- webhook: data
"user" <-- rasa: response
end

@enduml
```
</details>