FROM qanary/qanary-component-ner-automl:latest
USER root

ARG TRAININGDATA
ARG TESTDATA
ARG MODEL
ARG MODELTYPE
ARG LANGUAGE
ARG PORT

COPY ./apps/qanary-component-ner-automl/trainingdata /code/app/spacy_model/corpus/trainingdata/

# remove pre generated model to trigger new training
RUN rm -rf /code/app/spacy_model/output/model-best/*

# validate any csv files
RUN python /code/app/format_input.py ${TRAININGDATA} ${TESTDATA}

# check if new model must be trained
RUN python /code/app/train_a_model.py ${MODELTYPE} ${LANGUAGE}

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "40506"]
