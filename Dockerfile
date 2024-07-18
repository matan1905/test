FROM node:14 as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM python:3.9
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .
COPY --from=frontend /app/frontend/build /app/static

CMD ["python", "app.py"]