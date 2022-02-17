FROM python:3.9.7

WORKDIR /dex_reader

COPY . .

RUN pip3 install pymongo==4.0.1 
RUN pip3 install gql==3.0.0 
RUN pip3 install requests==2.27.1 
RUN pip3 install requests_toolbelt==0.9.1 
RUN pip3 install python-dotenv==0.19.2 
RUN pip3 install python-decouple==3.6

CMD [ "python3", "index.py" ]