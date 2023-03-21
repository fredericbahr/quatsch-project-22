FROM python:latest

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python", "evaluate-qanary-system.py",  "--directory=qanary-component-pm-station"]