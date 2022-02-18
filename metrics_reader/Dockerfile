FROM python:3.9.7

WORKDIR /metrics_reader

COPY . .

COPY dependencies.txt ./

RUN pip3 install -r dependencies.txt

CMD [ "python3", "index.py" ]