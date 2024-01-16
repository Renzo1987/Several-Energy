FROM python:3.10

RUN apt-get update && \
    apt-get install -y \
    gcc \
    libpq-dev \
    chromium \
    chromium-driver
COPY ./Python /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
ENV CHROME_DRIVER_PATH /usr/lib/chromium-browser/chromedriver
EXPOSE 5000

CMD ["python","back-data.py"]
