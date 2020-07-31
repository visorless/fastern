import os
basedir = os.path.abspath(os.path.dirname(__file__))


class DevelopmentConfig(object):

    DEVELOPMENT = True
    DEBUG = True
    # DEBUG = False
    # TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'breakfast_burrito_wednesdays'

    # EMAIL SETUP
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = ['']



class SRTConfig(object):
    """ This class outlines various connection methods
    """
    POSTGRES = {
        'user': '',
        'pw': '',
        'db': '',
        'host': 'localhost',
        'port': '5432'
    }

    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'breakfast_burrito_wednesdays'
    SQLALCHEMY_DATABASE_URI = ("postgresql://%(user)s:%(pw)s@%(host)s"
                               ":%(port)s/%(db)s" % POSTGRES)

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # EMAIL SETUP
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
	ADMINS = ['']


class ProductionConfig(object):
    POSTGRES = {
        'user': '',
        'pw': '',
        'db': '',
        'host': 'localhost',
        'port': '5432'
    }

    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'breakfast_burrito_wednesdays'
    SQLALCHEMY_DATABASE_URI = ("postgresql://%(user)s:%(pw)s@%(host)s"
                               ":%(port)s/%(db)s" % POSTGRES)

    SQLALCHEMY_TRACK_MODIFICATIONS = False


