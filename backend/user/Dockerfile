FROM python:latest

LABEL authors="Jonathan"

WORKDIR /app

COPY . /app

RUN ls -l /app

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

EXPOSE 8001

CMD ["uvicorn", "user.main:app", "--port", "8001", "--host", "0.0.0.0"]
