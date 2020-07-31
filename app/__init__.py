import os
from flask import Flask
from flask_pymongo import PyMongo
from .config import DevelopmentConfig
from .flask_compress import Compress

mongo = None

compress = Compress()


def create_app(config_class='Dev'):
    global mongo
    app = Flask(__name__,
                static_folder='./public',
                template_folder='./static')
    app.config["MONGO_URI"] = "mongodb://localhost:27017/fastern"
    mongo = PyMongo(app)
    if config_class == 'Dev':
        app.config.from_object(DevelopmentConfig)


    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    compress.init_app(app)

    return app
