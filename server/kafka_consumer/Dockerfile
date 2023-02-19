FROM python:3.10.8-alpine

WORKDIR /var/www

RUN pip3 install --no-cache --upgrade \
    pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD python -u app.py