FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /django
WORKDIR /django

COPY django /django/

RUN pip install -r requirements.txt

EXPOSE 8080