FROM qanary/qanary-component-ner-automl-pretrained-name-spacy-de:0.1.1

WORKDIR /code

USER root

ARG TRAININGDATA
ARG TESTDATA
ARG MODEL
ARG MODELTYPE
ARG LANGUAGE
ARG PORT

# copy generated training data into docker environment
COPY ./apps/qanary-component-ner-automl/trainingdata ./app/spacy_model/corpus/trainingdata/

# remove pre generated model to trigger new training
RUN rm -rf ./app/spacy_model/output/model-best/*

# validate any csv files
RUN python ./app/format_input.py ${TRAININGDATA} ${TESTDATA}

# check if new model must be trained
RUN python ./app/train_a_model.py ${MODELTYPE} ${LANGUAGE}
