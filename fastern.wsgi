#!/bin/env/python
import site
import sys

activate_this = '/var/www/fastern/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))
sys.path.insert(0, '/var/www/fastern')

from app import app as application
