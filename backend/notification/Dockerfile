FROM python:3.12-slim

RUN mkdir hospital_service
WORKDIR /hospital_service

COPY /pyproject.toml /hospital_service

RUN pip3 install poetry

RUN poetry config virtualenvs.create false \
    && poetry install --only main --no-interaction --no-ansi

COPY . .

CMD ["sh", "-c", "poetry run python src/main.py"]



