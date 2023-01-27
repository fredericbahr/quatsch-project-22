FROM rasa/rasa:3.4.0

WORKDIR /app

USER root

COPY . .

RUN rasa train --domain domain.yml --data data --out models --force

ENTRYPOINT [ "rasa" ]

CMD [ "run", "--enalble-api", "--cors", '"*"' ]
