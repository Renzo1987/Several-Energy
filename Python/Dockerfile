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
<<<<<<< HEAD
RUN pip install --no-cache-dir -r requirements.txt
RUN chmod +x chromedriver.exe
=======
RUN pip install --upgrade webdriver_manager
RUN pip install --upgrade selenium
RUN pip install --no-cache-dir -r requirements.txt
>>>>>>> dev
EXPOSE 5000

CMD ["python","back-data.py"]
