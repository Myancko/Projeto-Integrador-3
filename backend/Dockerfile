FROM python:latest

LABEL authors="Project Empress"

WORKDIR /app

COPY . /app

RUN ls -l /app

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--port", "8000", "--host", "0.0.0.0"]
